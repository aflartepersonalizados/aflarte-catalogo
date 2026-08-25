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

(function addFaqSection(){
  if(document.getElementById('faq')) return;
  const how=document.getElementById('como-comprar');
  if(!how) return;

  const faq=document.createElement('section');
  faq.id='faq';
  faq.className='faq-section';
  faq.innerHTML=`<div class="wrap faq-wrap">
    <div class="faq-head">
      <span class="eyebrow">TIRE SUAS DÚVIDAS</span>
      <h2>Perguntas frequentes</h2>
      <p>Respostas rápidas sobre pedido, personalização, produção e segurança.</p>
    </div>
    <div class="faq-list">
      <details><summary>Como faço um pedido?</summary><p>Escolha os produtos, selecione tamanho ou opção quando houver, adicione ao carrinho, revise as quantidades e envie o pedido completo pelo WhatsApp.</p></details>
      <details><summary>Os produtos personalizados têm preço fixo?</summary><p>Nem sempre. O valor pode variar conforme tamanho, quantidade, cores, nome, tema e complexidade. Nesses casos o catálogo mostra “Consulte” ou “A partir de”, e o valor final é confirmado pelo WhatsApp.</p></details>
      <details><summary>Qual é o prazo de produção?</summary><p>O prazo depende do produto, da quantidade e da personalização. A previsão é informada no atendimento antes da confirmação do pedido.</p></details>
      <details><summary>De que material são feitas as peças?</summary><p>A maior parte das peças é produzida em impressão 3D com PLA. Pequenas marcas do processo por camadas podem ocorrer e fazem parte da característica da impressão 3D.</p></details>
      <details><summary>Os brinquedos sensoriais podem ser levados à boca?</summary><p>Não. São recomendados para maiores de 3 anos, não devem ser levados à boca e devem ser usados por crianças com supervisão de um adulto.</p></details>
      <details><summary>Posso escolher cores e personalizar um produto?</summary><p>Em muitos produtos, sim. As possibilidades dependem do modelo e da disponibilidade de cores. Envie sua ideia pelo WhatsApp para verificar as opções.</p></details>
      <details><summary>Como funciona o pagamento?</summary><p>As formas de pagamento disponíveis são informadas no atendimento antes da confirmação do pedido, junto com o orçamento final quando necessário.</p></details>
      <details><summary>O carrinho já confirma a compra?</summary><p>Não. O carrinho organiza os itens e envia tudo em uma única mensagem. A compra é confirmada somente após a conferência de valores, personalizações, prazo e demais detalhes pelo WhatsApp.</p></details>
    </div>
    <div class="faq-cta"><div><b>Ficou alguma dúvida?</b><span>Fale diretamente com a AFLarte.</span></div><a class="btn green" target="_blank" rel="noopener" href="https://wa.me/5541988051258?text=Ol%C3%A1%20AFLarte!%20Estou%20no%20cat%C3%A1logo%20e%20tenho%20uma%20d%C3%BAvida.">Perguntar pelo WhatsApp</a></div>
  </div>`;

  how.insertAdjacentElement('afterend',faq);

  const nav=document.querySelector('.nav nav');
  if(nav && !nav.querySelector('a[href="#faq"]')){
    const link=document.createElement('a');
    link.href='#faq';
    link.textContent='Dúvidas';
    const contato=nav.querySelector('a[href="#contato"]');
    nav.insertBefore(link,contato||null);
  }

  const style=document.createElement('style');
  style.textContent=`.faq-section{padding:72px 0;background:#fff;border-top:1px solid var(--line)}.faq-head{max-width:720px;margin-bottom:26px}.faq-head h2{font-family:"Playfair Display",serif;font-size:42px;margin:8px 0}.faq-head p{margin:0;color:var(--muted);line-height:1.6}.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:12px}.faq-list details{background:#fffaf7;border:1px solid var(--line);border-radius:16px;padding:0 18px;overflow:hidden}.faq-list summary{list-style:none;cursor:pointer;font-weight:800;padding:18px 34px 18px 0;position:relative}.faq-list summary::-webkit-details-marker{display:none}.faq-list summary:after{content:'+';position:absolute;right:0;top:14px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#f3dfd8;color:#7d554d;font-size:20px}.faq-list details[open] summary:after{content:'–'}.faq-list details p{margin:0;padding:0 0 18px;color:var(--muted);line-height:1.62;font-size:14px}.faq-cta{margin-top:20px;background:#302724;color:#fff;border-radius:20px;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px}.faq-cta>div{display:flex;flex-direction:column;gap:3px}.faq-cta span{color:#d9cbc6;font-size:14px}.faq-cta .btn{white-space:nowrap}@media(max-width:800px){.faq-list{grid-template-columns:1fr}.faq-head h2{font-size:34px}.faq-cta{align-items:flex-start;flex-direction:column}.faq-cta .btn{width:100%}}@media(max-width:620px){.faq-section{padding:52px 0}.faq-list details{padding:0 15px}.faq-list summary{padding-top:16px;padding-bottom:16px;font-size:15px}}`;
  document.head.appendChild(style);
})();
