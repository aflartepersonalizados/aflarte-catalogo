(()=>{
const url=id=>window.afProductRoutes[id]||'/produto.html?id='+encodeURIComponent(id);
function links(){
 document.querySelectorAll('[data-view],[data-feature-view]').forEach(el=>{const id=el.dataset.view||el.dataset.featureView;el.onclick=()=>location.href=url(id)});
 document.querySelectorAll('[data-home-cat],[data-home-dynamic],#filters [data-cat]').forEach(el=>{const cat=el.dataset.homeCat||el.dataset.homeDynamic||el.dataset.cat;el.onclick=()=>location.href=cat==='todos'?'/catalogo/':'/categorias/'+encodeURIComponent(cat)+'/'});
 document.querySelectorAll('.home-category-card').forEach(el=>{const cat=el.dataset.homeDynamic||el.dataset.homeCat;if(!cat||el.tagName==='A')return;const a=document.createElement('a');a.className=el.className;a.innerHTML=el.innerHTML;a.href=cat==='todos'?'/catalogo/':'/categorias/'+encodeURIComponent(cat)+'/';el.replaceWith(a)});
}
function detail(){if(!window.afProductPage)return;const p=products.find(p=>p.id===window.afProductPage);const box=document.querySelector('.product-container');if(!p){box.innerHTML='<h1>Produto indisponível</h1><p>Este produto não está disponível no catálogo atual.</p><a href="/catalogo/">Ver produtos</a>';document.getElementById('modal').hidden=true;return;}
 openModal(p.id);const modal=document.getElementById('modal');modal.classList.remove('open');modal.classList.add('product-detail');modal.setAttribute('aria-hidden','false');document.body.style.overflow='';const dialog=modal.querySelector('.dialog');dialog.removeAttribute('role');dialog.removeAttribute('aria-modal');box.querySelector('h1').textContent=p.name;box.querySelectorAll(':scope > p').forEach(el=>el.remove());box.appendChild(modal);modal.querySelector('.backdrop')?.remove();modal.querySelector('.x')?.remove();
 const add=document.getElementById('modalAdd');add.onclick=()=>{if(p.variants?.length&&!selectedVariantId)return;addToCart(p.id,selectedVariantId);openCart();};
 document.getElementById('modalExtra').textContent=(p.extra||'').replace(/\[\[AFL_SHIP:.*?\]\]/g,'');
 if(!window.afTrackedProduct){window.afTrackedProduct=true;window.afPendingProduct=p;window.afSendProduct?.();}
}
const query=new URLSearchParams(location.search).get('q');if(query&&document.getElementById('search')){document.getElementById('search').value=query;render();}
const header=document.getElementById('headerSearch');if(header){header.addEventListener('keydown',e=>{if(e.key==='Enter'&&header.value.trim()){e.preventDefault();location.href='/catalogo/?q='+encodeURIComponent(header.value.trim())}});}
window.addEventListener('afCatalogReady',()=>{links();detail();renderCart();updateCartCount()});links();detail();
})();
