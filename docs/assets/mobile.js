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