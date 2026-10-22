"""Regenerate public pages from the same public catalog used by the storefront."""
import argparse, html, json, pathlib, re, shutil, unicodedata, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = 'https://ldzvozipodwkyeuekaqw.supabase.co/functions/v1/catalog-public'
FIELDS = 'id name price_label category category_label main_image gallery short_description description extra variants featured shipping_weight_kg shipping_length_cm shipping_width_cm shipping_height_cm video_url'.split()
def slug(s):
    return re.sub('[^a-z0-9]+', '-', unicodedata.normalize('NFKD', str(s)).encode('ascii','ignore').decode().lower()).strip('-')
def esc(s): return html.escape(str(s or ''), quote=True)
def js(data): return json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('\u2028','\\u2028').replace('\u2029','\\u2029')
def fixed_price(p):
    if p.get('variants'): return None
    match=re.fullmatch(r'\s*R\$\s*([\d.]+,\d{2})\s*',str(p.get('price_label') or ''))
    if not match: return None
    value=float(match[1].replace('.','').replace(',','.'))
    return round(value,2) if value>0 else None
CATEGORY_COPY={
 'dia-a-dia':('Utilidades para o dia a dia em impressão 3D','Conheça peças práticas da AFLarte para organizar e facilitar a rotina. Confira fotos, características e cuidados de uso em cada produto.'),
 'sensoriais':('Produtos sensoriais em impressão 3D','Explore peças com diferentes texturas e movimentos, como fidgets, alfabetos e kits sensoriais. Veja as fotos, opções e recomendações de cada produto.'),
 'brinquedos-e-educativos':('Brinquedos e educativos em impressão 3D','Conheça brinquedos articulados, jogos e peças criativas produzidas pela AFLarte. Consulte as características e recomendações de uso na página de cada produto.'),
 'personalizados':('Presentes personalizados em impressão 3D','Encontre peças e lembranças personalizadas. Consulte as opções de cada produto ou fale com a AFLarte para combinar a sua personalização.'),
 'decoracao-crista':('Decoração cristã em impressão 3D','Explore peças com mensagens de fé para decorar e presentear. Conheça os modelos e as opções disponíveis na AFLarte.'),
 'chaveiros':('Chaveiros em impressão 3D','Conheça os chaveiros da AFLarte e consulte fotos, modelos e opções de personalização em cada página de produto.'),
 'natal':('Decoração e presentes de Natal em impressão 3D','Explore enfeites, peças decorativas e presentes natalinos produzidos pela AFLarte. Confira fotos, preços e opções de cada modelo.'),
 'dia-dos-professores':('Presentes para o Dia dos Professores','Conheça lembranças, chaveiros e peças para presentear professores. Consulte as opções disponíveis e combine a personalização com a AFLarte.')
}
def visible(p):
    def no(v): return v is False or str(v).lower().strip() in ('false','não','nao','inativo','0')
    return not no(p.get('active')) and not no(p.get('site_visible'))
def generate(data, docs):
    if not isinstance(data,dict) or not isinstance(data.get('products'),list): raise ValueError('Resposta inválida: site anterior preservado')
    raw=data['products']
    if not raw: raise ValueError('Fonte vazia: aguarde a sincronização da planilha; site anterior preservado')
    ps=[{k:p.get(k) for k in FIELDS} for p in raw if visible(p)]
    for p in ps:
        if not p['id'] or not p['name'] or not p['category']: raise ValueError('Produto sem ID, nome ou categoria')
        p['id']=str(p['id']);p['category']=slug(p['category'])
        if not p['category']: raise ValueError('Categoria inválida')
    ps.sort(key=lambda p:p['id'])
    if len({p['id'] for p in ps})!=len(ps): raise ValueError('IDs duplicados')
    routesfile=docs/'assets/product-routes.js'
    old=json.loads(routesfile.read_text().split('=',1)[1].strip().rstrip(';')) if routesfile.exists() else {}
    routes={p['id']:old.get(p['id']) or '/produtos/'+slug(p['name'])+'-'+slug(p['id'])+'/' for p in ps}
    if len(set(routes.values()))!=len(routes): raise ValueError('URLs duplicadas')
    for u in routes.values():
        if not re.fullmatch(r'/produtos/[a-z0-9-]+/',u): raise ValueError('URL inválida')
    cats=dict(sorted({p['category']:p['category_label'] or p['category'] for p in ps}.items()))
    templates={n:(ROOT/'scripts/templates'/f'{n}.html').read_text() for n in ['home','listing','product']}
    nav='<nav><a href="/">Início</a><a href="/catalogo/">Produtos</a>'+''.join(f'<a href="/categorias/{c}/">{esc(l)}</a>' for c,l in cats.items())+'</nav>'
    filters='<a class="btn soft" href="/catalogo/">Todos</a>'+''.join(f'<a class="btn soft" href="/categorias/{c}/">{esc(l)}</a>' for c,l in cats.items())
    def cards(items):
        return ''.join(f'<article class="card"><a class="card-photo" href="{routes[p["id"]]}"><img loading="lazy" src="{esc(p["main_image"])}" alt="{esc(p["name"])}"></a><div class="card-body"><span class="pill">{esc(p["category_label"])}</span><h3><a href="{routes[p["id"]]}">{esc(p["name"])}</a></h3><p>{esc(p["short_description"])}</p><strong>{esc(p["price_label"])}</strong><p><a class="btn soft" href="{routes[p["id"]]}">Ver produto</a></p></div></article>' for p in items)
    def page(template,title,desc,path,schema=None):
        b=templates[template]
        b=re.sub(r'<title>.*?</title>',lambda _:f'<title>{esc(title)}</title>',b,flags=re.S)
        b=re.sub(r'<meta name="description"[^>]*>',lambda _:f'<meta name="description" content="{esc(desc)}">',b)
        b=re.sub(r'<link rel="canonical"[^>]*>',lambda _:f'<link rel="canonical" href="https://aflarte.com.br{path}">',b)
        b=re.sub(r'<meta property="og:[^"]+"[^>]*>','',b)
        b=re.sub(r'<script type="application/ld\+json">.*?</script>','',b,flags=re.S)
        b=re.sub(r'<script>window.af(?:ProductPage|Category)=.*?</script>','',b,flags=re.S)
        b=re.sub(r'<nav>.*?</nav>',lambda _:nav,b,count=1,flags=re.S)
        b=re.sub(r'(<div[^>]*id="filters"[^>]*>).*?</div>',lambda m:m[1]+filters+'</div>',b,flags=re.S)
        extra=f'<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="https://aflarte.com.br{path}">'
        if schema:extra+='<script type="application/ld+json">'+js(schema)+'</script>'
        image=(schema or {}).get('image',[])
        extra+='<meta property="og:image" content="'+esc(image[0] if image else 'https://aflarte.com.br/assets/logo.webp')+'"><meta property="og:site_name" content="AFLarte"><meta property="og:locale" content="pt_BR">'
        if path=='/':
            org={'@context':'https://schema.org','@type':'Organization','@id':'https://aflarte.com.br/#organization','name':'AFLarte','url':'https://aflarte.com.br/','logo':'https://aflarte.com.br/assets/logo.webp','sameAs':['https://www.instagram.com/aflarte/','https://www.facebook.com/profile.php?id=61593775059751','https://www.tiktok.com/@aflarte']}
            site={'@context':'https://schema.org','@type':'WebSite','name':'AFLarte','alternateName':'AFLarte Personalizados 3D','url':'https://aflarte.com.br/'}
            extra+=''.join('<script type="application/ld+json">'+js(x)+'</script>' for x in [org,site])
        else:
            crumbs=[{'@type':'ListItem','position':1,'name':'Início','item':'https://aflarte.com.br/'}]
            if schema:
                product=next(p for p in ps if routes[p['id']]==path)
                crumbs.append({'@type':'ListItem','position':2,'name':cats[product['category']],'item':'https://aflarte.com.br/categorias/'+product['category']+'/'})
                name=product['name']
            else:name=cats.get(path.strip('/').split('/')[-1],'Catálogo de produtos')
            crumbs.append({'@type':'ListItem','position':len(crumbs)+1,'name':name,'item':'https://aflarte.com.br'+path})
            extra+='<script type="application/ld+json">'+js({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':crumbs})+'</script>'
        return b.replace('</head>',extra+'</head>')
    def grid(b,items):
        return re.sub(r'(<div id="grid" class="grid"[^>]*>).*?(</div><p id="empty")',lambda m:m[1]+cards(items)+m[2],b,count=1,flags=re.S)
    files={}
    files['index.html']=grid(page('home','AFLarte | Sensoriais, presentes e personalizados em impressão 3D','Produtos sensoriais e personalizados. Produção própria em Curitiba e envio para todo o Brasil.','/'),ps)
    home=files['index.html']
    home=re.sub(r'(<div class="home-category-grid">).*?(</div></section>)',lambda m:m[1]+''.join(f'<a class="home-category-card" href="/categorias/{c}/"><span class="category-icon">✨</span><span class="category-copy"><b>{esc(l)}</b><small>Explore os produtos desta categoria.</small></span><span class="category-arrow">→</span></a>' for c,l in cats.items())+'<a class="home-category-card all-products" href="/catalogo/">Ver tudo</a>'+m[2],home,count=1,flags=re.S)
    files['index.html']=home
    files['catalogo/index.html']=grid(page('listing','Catálogo de produtos | AFLarte','Explore os produtos AFLarte.','/catalogo/'),ps)
    for c,l in cats.items():
        heading,description=CATEGORY_COPY.get(c,(l+' AFLarte','Conheça '+l+' da AFLarte.'))
        b=page('listing',heading+' | AFLarte',description,'/categorias/'+c+'/')
        b=b.replace('Catálogo de produtos AFLarte',esc(heading)).replace('Explore nossas categorias e encontre sua próxima peça favorita.',esc(description)).replace('</head>','<script>window.afCategory='+js(c)+'</script></head>')
        files['categorias/'+c+'/index.html']=grid(b,[p for p in ps if p['category']==c])
    for p in ps:
        u=routes[p['id']]; c=p['category']
        schema={'@context':'https://schema.org','@type':'Product','name':p['name'],'description':p['description'] or p['short_description'],'image':[x for x in [p['main_image']]+(p['gallery'] or []) if x],'brand':{'@type':'Brand','name':'AFLarte'},'url':'https://aflarte.com.br'+u}
        schema['sku']=p['id']
        amount=fixed_price(p)
        if amount is not None:schema['offers']={'@type':'Offer','price':amount,'priceCurrency':'BRL','url':'https://aflarte.com.br'+u}
        b=page('product',p['name']+' | AFLarte',p['short_description'] or p['description'] or p['name'],u,schema)
        main='<main><div class="wrap product-container"><nav aria-label="Caminho de navegação"><a href="/">Início</a> / <a href="/categorias/'+c+'/">'+esc(cats[c])+'</a></nav><h1>'+esc(p['name'])+'</h1><noscript><img style="max-width:100%" src="'+esc(p['main_image'])+'" alt="'+esc(p['name'])+'"></noscript><p>'+esc(p['description'])+'</p><p>'+esc(p['price_label'])+'</p></div><section class="wrap related"><h2>Mais desta categoria</h2><div class="grid">'+cards([q for q in ps if q['category']==c and q['id']!=p['id']][:4])+'</div></section><div hidden><input id="search"><div id="grid"></div><div id="empty"></div><div id="filters">'+filters+'</div></div></main>'
        b=re.sub(r'<main>.*?</main>',lambda _:main,b,count=1,flags=re.S).replace('</head>','<script>window.afProductPage='+js(p['id'])+'</script></head>')
        files[u.strip('/')+'/index.html']=b
    mapped=[]
    for p in ps:
        q=dict(id=p['id'],name=p['name'],price=p['price_label'],cat=p['category'],label=p['category_label'],img=p['main_image'],gallery=p['gallery'] or [],short=p['short_description'] or '',desc=p['description'] or '',extra=p['extra'] or '',variants=p['variants'] or None,video=p['video_url'],featured=bool(p['featured']))
        q.update({k:p[k] for k in FIELDS if k.startswith('shipping_')});mapped.append(q)
    app=docs/'assets/app.js';s=app.read_text();files['assets/app.js']='const products='+js(mapped)+';\n'+s[s.index('const WA='):]
    files['assets/product-routes.js']='window.afProductRoutes='+js(routes)+';\n'
    files['assets/catalog-snapshot.json']=js({'products':ps})
    paths=['/','/catalogo/','/privacidade.html']+['/categorias/'+c+'/' for c in cats]+list(routes.values())
    files['sitemap.xml']='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://aflarte.com.br'+esc(u)+'</loc></url>' for u in paths)+'</urlset>'
    # Validate everything before deleting obsolete generated pages.
    for path in ['produtos','categorias']:
        shutil.rmtree(docs/path,ignore_errors=True)
    for path,body in files.items():
        target=docs/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(body)
    print(f'{len(ps)} produtos; {len(cats)} categorias; sitemap atualizado')
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--source-file');a.add_argument('--docs',default=str(ROOT/'docs'));args=a.parse_args()
    if args.source_file:data=json.loads(pathlib.Path(args.source_file).read_text())
    else:
        with urllib.request.urlopen(SOURCE,timeout=60) as response:data=json.load(response)
    generate(data,pathlib.Path(args.docs))
