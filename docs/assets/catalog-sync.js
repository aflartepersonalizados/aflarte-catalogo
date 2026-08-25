(async()=>{try{const r=await fetch('https://ldzvozipodwkyeuekaqw.supabase.co/functions/v1/catalog-public',{cache:'no-store'});if(!r.ok)return;const data=await r.json();if(!Array.isArray(data.products))return;const mapped=data.products.map(p=>({id:p.id,name:p.name,price:p.price_label,cat:p.category,label:p.category_label,img:p.main_image||'assets/logo.webp',gallery:Array.isArray(p.gallery)?p.gallery:[],short:p.short_description||'',desc:p.description||'',extra:p.extra||'',variants:Array.isArray(p.variants)&&p.variants.length?p.variants:undefined,featured:!!p.featured}));products.splice(0,products.length,...mapped);

function rebuildCategoryFilters(){
  const box=document.getElementById('filters');
  if(!box)return;
  const preferred=['sensoriais','personalizados','crista','infantil','colecionaveis'];
  const labels=new Map();
  products.forEach(p=>{if(p.cat)labels.set(p.cat,p.label||p.cat);});
  const ordered=[...preferred.filter(c=>labels.has(c)),...[...labels.keys()].filter(c=>!preferred.includes(c)).sort((a,b)=>(labels.get(a)||a).localeCompare(labels.get(b)||b,'pt-BR'))];
  const previous=typeof current!=='undefined'?current:'todos';
  box.innerHTML=`<button data-cat="todos">Todos</button>`+ordered.map(c=>`<button data-cat="${String(c).replace(/"/g,'&quot;')}">${String(labels.get(c)||c).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</button>`).join('');
  const available=new Set(['todos',...ordered]);
  if(typeof current!=='undefined'&&!available.has(current))current='todos';
  box.querySelectorAll('[data-cat]').forEach(btn=>{
    if(btn.dataset.cat===(available.has(previous)?previous:'todos'))btn.classList.add('active');
    btn.onclick=()=>{
      box.querySelectorAll('[data-cat]').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      if(typeof current!=='undefined')current=btn.dataset.cat;
      render();
    };
  });
}

rebuildCategoryFilters();
render();}catch(e){console.warn('Catálogo online indisponível; usando versão local.',e);}})();