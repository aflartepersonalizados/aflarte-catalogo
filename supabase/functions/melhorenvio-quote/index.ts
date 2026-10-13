import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.3";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SECRET_KEY")!;
const CLIENT_ID = Deno.env.get("MELHORENVIO_CLIENT_ID") || "";
const CLIENT_SECRET = Deno.env.get("MELHORENVIO_CLIENT_SECRET") || "";
const ORIGIN_CEP = (Deno.env.get("AFLARTE_ORIGIN_CEP") || "").replace(/\D/g, "");
const BASE = (Deno.env.get("MELHORENVIO_BASE_URL") || "https://melhorenvio.com.br").replace(/\/$/, "");
const CALLBACK = SUPABASE_URL + "/functions/v1/melhorenvio-oauth";
const db = createClient(SUPABASE_URL, SERVICE_KEY);
const allowedOrigins = new Set(["https://aflarte.com.br", "https://www.aflarte.com.br"]);
function corsFor(req: Request) {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://aflarte.com.br",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "Cache-Control": "no-store"
  };
}
const json = (req: Request, body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsFor(req), "Content-Type": "application/json; charset=utf-8" } });

async function getToken() {
  const { data, error } = await db.from("melhorenvio_credentials").select("*").eq("id", "primary").maybeSingle();
  if (error || !data) throw new Error("Conta do Melhor Envio ainda não autorizada.");
  const valid = !data.expires_at || new Date(data.expires_at).getTime() > Date.now() + 60_000;
  if (valid) return data.access_token;
  if (!data.refresh_token || !CLIENT_ID || !CLIENT_SECRET) throw new Error("Autorização expirada. Conecte novamente o Melhor Envio.");
  const response = await fetch(BASE + "/oauth/token", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json", "User-Agent": "AFLarte (aflartepersonalizados@gmail.com)" }, body: JSON.stringify({ grant_type: "refresh_token", client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: data.refresh_token, redirect_uri: CALLBACK }) });
  const token = await response.json();
  if (!response.ok || !token.access_token) throw new Error("Não foi possível renovar a autorização.");
  const expiresAt = token.expires_in ? new Date(Date.now() + Number(token.expires_in) * 1000).toISOString() : null;
  await db.from("melhorenvio_credentials").upsert({ id: "primary", access_token: token.access_token, refresh_token: token.refresh_token || data.refresh_token, token_type: token.token_type || "Bearer", expires_at: expiresAt, scope: token.scope || data.scope, updated_at: new Date().toISOString() });
  return token.access_token;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsFor(req) });
  if (req.method !== "POST") return json(req, { error: "Método não permitido." }, 405);
  if (BASE.includes("sandbox") && req.headers.get("origin")) return json(req, { error: "A cotação automática está em fase de testes. A AFLarte confirmará o frete pelo WhatsApp." }, 503);
  try {
    if (!ORIGIN_CEP.match(/^\d{8}$/)) throw new Error("CEP de origem da AFLarte ainda não configurado.");
    const body = await req.json();
    const to = String(body?.to_postal_code || "").replace(/\D/g, "");
    if (!to.match(/^\d{8}$/)) return json(req, { error: "Informe um CEP de destino válido." }, 400);
    if (!Array.isArray(body?.products) || !body.products.length || body.products.length > 30) return json(req, { error: "Carrinho inválido para cotação." }, 400);
    const products = body.products.map((p: any, i: number) => ({
      id: String(p.id || `produto-${i + 1}`).slice(0, 80),
      width: Number(p.width), height: Number(p.height), length: Number(p.length),
      weight: Number(p.weight), insurance_value: Math.max(0.01, Number(p.insurance_value) || 0.01),
      quantity: Math.max(1, Math.min(99, Math.trunc(Number(p.quantity) || 1)))
    }));
    if (products.some((p: any) => ![p.width,p.height,p.length,p.weight].every((n: number) => Number.isFinite(n) && n > 0 && n <= 300))) return json(req, { error: "Um produto não possui peso e dimensões válidos." }, 422);
    const token = await getToken();
    // Explicit service selection avoids the default Correios-only calculation.
    // Discover IDs from Melhor Envio instead of hardcoding carrier names.
    let services = "1,2";
    try {
      const serviceResponse = await fetch(BASE + "/api/v2/me/shipment/services", {
        headers: { "Accept": "application/json", "User-Agent": "AFLarte (aflartepersonalizados@gmail.com)" },
        signal: AbortSignal.timeout(10000)
      });
      if (serviceResponse.ok) {
        const serviceData = await serviceResponse.json();
        if (Array.isArray(serviceData)) {
          const ids = serviceData.map((s: any) => Number(s.id)).filter((id: number) => Number.isInteger(id) && id > 0);
          if (ids.length) services = [...new Set(ids)].join(",");
        }
      }
    } catch { console.warn("Lista de serviços indisponível; mantendo PAC e SEDEX."); }
    const response = await fetch(BASE + "/api/v2/me/shipment/calculate", { method: "POST", headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "application/json", "User-Agent": "AFLarte (aflartepersonalizados@gmail.com)" }, body: JSON.stringify({ from: { postal_code: ORIGIN_CEP }, to: { postal_code: to }, products, services, options: { receipt: false, own_hand: false } }) });
    const data = await response.json();
    if (!response.ok) {
      console.error("Melhor Envio calculate failed", response.status, JSON.stringify(data));
      return json(req, { error: "Não foi possível calcular o frete para este CEP." }, response.status === 422 ? 422 : 502);
    }
    const quotes = (Array.isArray(data) ? data : []).filter((x: any) => !x.error && (x.custom_price || x.price)).map((x: any) => ({
      id: x.id, name: x.name, company: x.company?.name || "", company_picture: x.company?.picture || "",
      price: Number(x.custom_price || x.price), delivery_time: Number(x.custom_delivery_time || x.delivery_time),
      delivery_range: x.custom_delivery_range || x.delivery_range || null
    })).sort((a: any,b: any) => a.price-b.price);
    return json(req, { quotes });
  } catch (e) {
    console.error(e);
    return json(req, { error: e instanceof Error ? e.message : "Erro ao calcular o frete." }, 500);
  }
});