(()=>{
  const dock=document.getElementById('mobileCartDock');
  const dockCount=document.getElementById('mobileCartCount');
  const headerCount=document.getElementById('cartCount');
  const openCart=document.getElementById('openCart');
  const modal=document.getElementById('modal');
  const cartModal=document.getElementById('cartModal');
  if(!dock||!dockCount||!headerCount||!openCart)return;

  const sync=()=>{dockCount.textContent=headerCount.textContent||'0';};
  sync();
  new MutationObserver(sync).observe(headerCount,{childList:true,characterData:true,subtree:true});

  dock.addEventListener('click',()=>openCart.click());

  const syncVisibility=()=>{
    const anyOpen=modal?.classList.contains('open')||cartModal?.classList.contains('open');
    dock.style.visibility=anyOpen?'hidden':'visible';
    dock.style.opacity=anyOpen?'0':'1';
  };
  [modal,cartModal].filter(Boolean).forEach(el=>new MutationObserver(syncVisibility).observe(el,{attributes:true,attributeFilter:['class']}));
  syncVisibility();
})();

(async()=>{try{const r=await fetch('https://ldzvozipodwkyeuekaqw.supabase.co/functions/v1/catalog-public',{cache:'no-store'});if(!r.ok)return;const data=await r.json();if(!Array.isArray(data.products))return;const mapped=data.products.map(p=>({id:p.id,name:p.name,price:p.price_label,cat:p.category,label:p.category_label,img:p.main_image||'assets/logo.webp',gallery:Array.isArray(p.gallery)?p.gallery:[],short:p.short_description||'',desc:p.description||'',extra:p.extra||'',variants:Array.isArray(p.variants)&&p.variants.length?p.variants:undefined,featured:!!p.featured,shipping_weight_kg:p.shipping_weight_kg,shipping_length_cm:p.shipping_length_cm,shipping_width_cm:p.shipping_width_cm,shipping_height_cm:p.shipping_height_cm}));products.splice(0,products.length,...mapped);render();}catch(e){console.warn('Catálogo online indisponível; usando versão local.',e);}})();
