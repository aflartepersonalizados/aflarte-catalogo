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

(function enhanceCheckout(){
  const dialog=document.querySelector('.cart-dialog');
  const footer=document.querySelector('.cart-footer');
  const send=document.getElementById('sendCart');
  if(!dialog||!footer||!send||document.getElementById('checkoutDetails')) return;

  const saved=JSON.parse(localStorage.getItem('aflarteCustomer')||'{}');
  const box=document.createElement('section');
  box.id='checkoutDetails';
  box.className='checkout-details';
  box.innerHTML=`<div class="checkout-title"><span class="eyebrow">DADOS PARA O ATENDIMENTO</span><h3>Antes de enviar pelo WhatsApp</h3><p>Preencha seu nome e, se quiser, acrescente sua cidade e uma observação. Assim o atendimento já recebe o pedido mais organizado.</p></div>
  <div class="checkout-fields">
    <label class="checkout-field"><span>Nome <b>*</b></span><input id="customerName" type="text" autocomplete="name" maxlength="80" placeholder="Seu nome" value="${(saved.name||'').replace(/"/g,'&quot;')}"></label>
    <label class="checkout-field"><span>Cidade / Bairro</span><input id="customerCity" type="text" autocomplete="address-level2" maxlength="100" placeholder="Ex.: Curitiba — Boa Vista" value="${(saved.city||'').replace(/"/g,'&quot;')}"></label>
    <label class="checkout-field full"><span>Observação</span><textarea id="customerNote" rows="3" maxlength="300" placeholder="Ex.: preferência de cor, nome para personalização ou outra informação importante">${saved.note||''}</textarea></label>
  </div>
  <div id="checkoutError" class="checkout-error" hidden>Informe seu nome antes de enviar o pedido.</div>`;
  footer.parentNode.insertBefore(box,footer);

  const name=document.getElementById('customerName');
  const city=document.getElementById('customerCity');
  const note=document.getElementById('customerNote');
  const error=document.getElementById('checkoutError');

  function saveCustomer(){localStorage.setItem('aflarteCustomer',JSON.stringify({name:name.value.trim(),city:city.value.trim(),note:note.value.trim()}));}
  [name,city,note].forEach(el=>el.addEventListener('input',()=>{saveCustomer();if(name.value.trim()) error.hidden=true;}));

  function buildMessage(){
    const lines=['Olá AFLarte! Vim pelo catálogo e gostaria de solicitar este pedido:',''];
    cart.forEach((item,index)=>{
      const p=products.find(x=>x.id===item.id);
      if(!p) return;
      const v=p.variants?.find(x=>x.id===item.variantId);
      const option=v?` — Opção: ${v.label}`:'';
      const price=v?.price||p.price;
      lines.push(`${index+1}. ${p.name}${option}`);
      lines.push(`Quantidade: ${item.qty} • Valor: ${price}`);
      lines.push('');
    });
    lines.push(`Cliente: ${name.value.trim()}`);
    if(city.value.trim()) lines.push(`Cidade/Bairro: ${city.value.trim()}`);
    if(note.value.trim()) lines.push(`Observação: ${note.value.trim()}`);
    lines.push('');
    lines.push('Aguardo a conferência de valores, prazo e disponibilidade.');
    return lines.join('\n');
  }

  send.addEventListener('click',e=>{
    e.preventDefault();
    if(!cart.length) return;
    if(!name.value.trim()){
      error.hidden=false;
      name.focus();
      name.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    saveCustomer();
    const url=`https://wa.me/${WA}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url,'_blank','noopener');
  },true);

  const style=document.createElement('style');
  style.textContent=`.checkout-details{margin-top:22px;padding-top:22px;border-top:1px solid var(--line)}.checkout-title h3{font-family:"Playfair Display",serif;font-size:25px;margin:6px 0 6px}.checkout-title p{margin:0 0 16px;color:var(--muted);line-height:1.5;font-size:13px}.checkout-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}.checkout-field{display:flex;flex-direction:column;gap:6px}.checkout-field.full{grid-column:1/-1}.checkout-field>span{font-size:13px;font-weight:800}.checkout-field>span b{color:#b04f43}.checkout-field input,.checkout-field textarea{width:100%;border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px 13px;font:inherit;color:var(--ink);outline:none}.checkout-field textarea{resize:vertical;min-height:82px}.checkout-field input:focus,.checkout-field textarea:focus{border-color:#c78c7e;box-shadow:0 0 0 3px #f4e4df}.checkout-error{margin-top:10px;padding:10px 12px;border-radius:10px;background:#fff0ed;color:#9b4037;font-size:13px;font-weight:700}.cart-footer{margin-top:16px}@media(max-width:620px){.checkout-fields{grid-template-columns:1fr}.checkout-field.full{grid-column:auto}.checkout-title h3{font-size:22px}.checkout-details{margin-top:18px;padding-top:18px}}`;
  document.head.appendChild(style);
})();

(function improveSeoAndSharing(){
  const base='https://aflartepersonalizados.github.io/aflarte-catalogo/';
  const title='AFLarte | Produtos em Impressão 3D, Sensoriais e Personalizados';
  const desc='Conheça o catálogo da AFLarte: brinquedos sensoriais, decoração, presentes e produtos personalizados em impressão 3D. Monte seu pedido e envie pelo WhatsApp.';
  const image=base+'assets/kit-rosa.webp';
  document.title=title;
  const metaDesc=document.querySelector('meta[name="description"]')||document.head.appendChild(document.createElement('meta'));
  metaDesc.setAttribute('name','description'); metaDesc.setAttribute('content',desc);
  const setMeta=(attr,key,value)=>{let el=document.head.querySelector(`meta[${attr}="${key}"]`);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.appendChild(el);}el.setAttribute('content',value);};
  setMeta('property','og:type','website');
  setMeta('property','og:locale','pt_BR');
  setMeta('property','og:site_name','AFLarte');
  setMeta('property','og:title',title);
  setMeta('property','og:description',desc);
  setMeta('property','og:url',base);
  setMeta('property','og:image',image);
  setMeta('name','twitter:card','summary_large_image');
  setMeta('name','twitter:title',title);
  setMeta('name','twitter:description',desc);
  setMeta('name','twitter:image',image);
  let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=base;
  let icon=document.head.querySelector('link[rel="icon"]');if(!icon){icon=document.createElement('link');icon.rel='icon';document.head.appendChild(icon);}icon.href='favicon.svg';icon.type='image/svg+xml';
  let manifest=document.head.querySelector('link[rel="manifest"]');if(!manifest){manifest=document.createElement('link');manifest.rel='manifest';document.head.appendChild(manifest);}manifest.href='site.webmanifest';
  if(!document.getElementById('aflarteStructuredData')){
    const ld=document.createElement('script');ld.type='application/ld+json';ld.id='aflarteStructuredData';ld.textContent=JSON.stringify({
      '@context':'https://schema.org','@type':'Store',name:'AFLarte',url:base,image:image,description:desc,
      sameAs:['https://instagram.com/aflarte'],telephone:'+55 41 98805-1258',areaServed:'BR'
    });document.head.appendChild(ld);
  }
})();
