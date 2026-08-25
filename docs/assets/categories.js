document.querySelectorAll('[data-home-cat]').forEach(btn=>{btn.addEventListener('click',()=>{const cat=btn.dataset.homeCat;const target=document.querySelector(`[data-cat="${cat}"]`);if(target){target.click();setTimeout(()=>document.getElementById('produtos')?.scrollIntoView({behavior:'smooth',block:'start'}),50);}});});

(function addAboutSection(){
  if(document.getElementById('sobre')) return;
  const how=document.getElementById('como-comprar');
  if(!how) return;
  const section=document.createElement('section');
  section.id='sobre';
  section.className='about-aflarte';
  section.innerHTML=`<div class="wrap about-grid">
    <div class="about-copy">
      <span class="eyebrow">SOBRE A AFLARTE</span>
      <h2>Criação, cuidado e personalidade em cada peça.</h2>
      <p>A AFLarte nasceu para transformar ideias em produtos criativos, decorativos e personalizados. Trabalhamos com impressão 3D para produzir peças que unem utilidade, carinho e identidade.</p>
      <p>Além dos produtos do catálogo, também desenvolvemos itens personalizados sob consulta, respeitando as características de cada projeto e combinando cores, nomes, temas e detalhes especiais.</p>
      <a class="btn primary" href="#contato">Quero falar sobre uma ideia</a>
    </div>
    <div class="about-points">
      <article><span>🖨️</span><div><b>Produção própria</b><p>Controle de produção e acabamento em peças impressas em 3D.</p></div></article>
      <article><span>🎨</span><div><b>Personalização</b><p>Projetos podem receber nomes, cores, temas e detalhes especiais.</p></div></article>
      <article><span>💬</span><div><b>Atendimento direto</b><p>Você conversa com a AFLarte pelo WhatsApp para tirar dúvidas e fechar o pedido.</p></div></article>
      <article><span>📦</span><div><b>Pedido revisado</b><p>Monte o carrinho, revise tudo e envie os itens juntos em uma única mensagem.</p></div></article>
    </div>
  </div>`;
  how.parentNode.insertBefore(section,how);

  const nav=document.querySelector('.nav nav');
  if(nav && !nav.querySelector('a[href="#sobre"]')){
    const link=document.createElement('a');
    link.href='#sobre';
    link.textContent='Sobre';
    const howLink=nav.querySelector('a[href="#como-comprar"]');
    nav.insertBefore(link,howLink||null);
  }
})();
