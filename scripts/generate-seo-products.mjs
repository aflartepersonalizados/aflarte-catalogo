import fs from 'node:fs/promises';
import path from 'node:path';

const ENDPOINT='https://ldzvozipodwkyeuekaqw.supabase.co/functions/v1/catalog-public';
const OUT='docs/produtos';
const SITE='https://aflarte.com.br';

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const image=u=>{u=String(u||'').trim();const m=u.match(/drive\.google\.com\/file\/d\/([^/]+)/);return m?`https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`:(u.startsWith('assets/')?`${SITE}/${u}`:u)};
const price=s=>{const m=String(s||'').match(/^R\$\s*([\d.]+,\d{2})$/);return m?m[1].replace(/\./g,'').replace(',','.'):null};
const safeId=id=>String(id||'produto').replace(/[^a-zA-Z0-9_-]/g,'-');

const res=await fetch(ENDPOINT,{headers:{accept:'application/json'}});
if(!res.ok) throw new Error(`catalog-public respondeu ${res.status}`);
const data=await res.json();
const products=(Array.isArray(data.products)?data.products:[]).filter(p=>p?.id&&p?.sku!=='AFL-000103');

await fs.rm(OUT,{recursive:true,force:true});
await fs.mkdir(OUT,{recursive:true});

const urls=[];
for(const p of products){
  const id=safeId(p.id), url=`${SITE}/produtos/${id}/`, im=image(p.main_image);
  const short=String(p.short_description||p.description||'Produto AFLarte produzido em impressão 3D.').replace(/\s+/g,' ').trim().slice(0,220);
  const pr=price(p.price_label);
  const schema={'@context':'https://schema.org','@type':'Product',name:p.name,image:im?[im]:undefined,description:short,sku:p.sku||undefined,brand:{'@type':'Brand',name:'AFLarte'},...(pr?{offers:{'@type':'Offer',url,priceCurrency:'BRL',price:pr}}:{})};
  const html=`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.name)} | AFLarte</title><meta name="description" content="${esc(short)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${url}"><meta property="og:type" content="product"><meta property="og:site_name" content="AFLarte"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="${esc(p.name)} | AFLarte"><meta property="og:description" content="${esc(short)}"><meta property="og:url" content="${url}">${im?`<meta property="og:image" content="${esc(im)}">`:''}<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script><style>body{margin:0;font-family:Arial,sans-serif;background:#fff9f7;color:#342d3c}main{max-width:1000px;margin:auto;padding:32px 20px}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}.brand img{width:90px}.crumb{margin:26px 0;color:#756864}.product{display:grid;grid-template-columns:minmax(280px,1fr) 1fr;gap:34px;background:#fff;border:1px solid #eadfda;border-radius:24px;padding:24px}.photo{display:grid;place-items:center;min-height:360px}.photo img{max-width:100%;max-height:520px;object-fit:contain}.pill{font-size:13px;font-weight:700;color:#6d4aa2}h1{font-size:34px;line-height:1.1}.price{font-size:28px;font-weight:800;margin:18px 0}.copy{line-height:1.65;white-space:pre-line}.btn{display:inline-block;margin-top:22px;padding:14px 20px;border-radius:999px;background:#342d3c;color:#fff;text-decoration:none;font-weight:700}@media(max-width:720px){.product{grid-template-columns:1fr}.photo{min-height:240px}h1{font-size:28px}}</style></head><body><main><a class="brand" href="/"><img src="/assets/logo.webp" alt="AFLarte"><strong>AFLarte Personalizados 3D</strong></a><div class="crumb"><a href="/">Início</a> › ${esc(p.category_label||'Produtos')}</div><article class="product"><div class="photo">${im?`<img src="${esc(im)}" alt="${esc(p.name)}">`:''}</div><div><span class="pill">${esc(p.category_label||'Produto AFLarte')}</span><h1>${esc(p.name)}</h1><div class="price">${esc(p.price_label||'Consulte')}</div><p class="copy">${esc(p.description||p.short_description||'')}</p>${p.extra?`<p class="copy">${esc(p.extra)}</p>`:''}<a class="btn" href="/#produtos">Ver no catálogo AFLarte</a></div></article></main></body></html>`;
  const dir=path.join(OUT,id); await fs.mkdir(dir,{recursive:true}); await fs.writeFile(path.join(dir,'index.html'),html,'utf8'); urls.push(url);
}
const today=new Date().toISOString().slice(0,10);
const entries=[SITE+'/',...urls].map((u,i)=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>${i?'weekly':'daily'}</changefreq><priority>${i?'0.8':'1.0'}</priority></url>`).join('\n');
await fs.writeFile('docs/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,'utf8');
console.log(`SEO AFLarte: ${products.length} páginas geradas.`);
