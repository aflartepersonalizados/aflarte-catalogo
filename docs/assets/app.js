const products=[
{id:'alfabeto',name:'Alfabeto Sensorial',price:'R$ 43,00',cat:'sensoriais',label:'Sensoriais',img:'assets/alfabeto.webp',gallery:['assets/gallery/alfabeto-1.webp','assets/gallery/alfabeto-2.webp'],short:'Letras texturizadas para aprender brincando.',desc:'Alfabeto sensorial em impressão 3D com letras coloridas e diferentes texturas para explorar o tato e tornar o aprendizado mais divertido.',extra:'Ideal para atividades educativas e exploração sensorial. Recomendado para maiores de 3 anos.'},
{id:'bolha',name:'Bolha Infinita',price:'Grande R$ 20,00 • Pequena R$ 10,00',variants:[{id:'grande',label:'Grande — 9 clicks',price:'R$ 20,00'},{id:'pequena',label:'Pequena — 4 clicks',price:'R$ 10,00'}],cat:'sensoriais',label:'Sensoriais',img:'assets/bolha.webp',gallery:['assets/gallery/bolha-1.webp','assets/gallery/bolha-2.webp'],short:'Aperte, explore e comece de novo.',desc:'Brinquedo tátil com botões que podem ser pressionados repetidamente. Uma opção compacta para coordenação motora fina, atenção e exploração tátil.',extra:'Disponível em dois tamanhos: grande com 9 clicks e pequeno com 4 clicks.'},
{id:'chaveiros',name:'Chaveiros Personalizados',price:'Consulte',cat:'personalizados',label:'Personalizados',img:'assets/chaveiros.webp',short:'Modelos exclusivos feitos sob encomenda.',desc:'Chaveiros em impressão 3D personalizados conforme tema, nome, frase ou ocasião. Cada projeto pode variar em tamanho, cores e complexidade.',extra:'Preço sob consulta. Envie sua ideia pelo WhatsApp para orçamento.'},
{id:'cobrinhas',name:'Cobrinhas Sensoriais',price:'A partir de R$ 14,00',cat:'sensoriais',label:'Sensoriais',img:'assets/cobrinhas.webp',gallery:['assets/gallery/cobrinhas-1.webp','assets/gallery/cobrinhas-2.webp'],short:'Kit com 3 cobrinhas articuladas P/M/G.',desc:'Cobrinhas articuladas que acompanham o movimento das mãos e proporcionam exploração tátil, coordenação motora e criatividade.',extra:'Vendidas em kit com 3 unidades nos tamanhos P, M e G. Valor a partir de R$ 14,00.'},
{id:'dado',name:'Dado Infinito',price:'R$ 20,00',cat:'sensoriais',label:'Sensoriais',img:'assets/dado.webp',gallery:['assets/gallery/dado-1.webp','assets/gallery/dado-2.webp'],short:'Movimento contínuo e envolvente.',desc:'Brinquedo sensorial articulado que muda de forma continuamente nas mãos. Compacto, divertido e ótimo para explorar movimentos.',extra:'Produzido em PLA por impressão 3D.'},
{id:'deus-fiel',name:'Letreiro “Deus é Fiel”',price:'R$ 40,00',cat:'crista',label:'Decoração Cristã',img:'assets/deus-fiel.webp',gallery:['assets/gallery/deus-fiel-1.webp'],short:'Uma mensagem de fé para decorar.',desc:'Letreiro decorativo cristão em impressão 3D com a mensagem “Deus é Fiel”. Uma peça delicada para salas, quartos, escritórios ou espaços de oração.',extra:'Produzido em PLA. Cores podem variar conforme disponibilidade.'},
{id:'professores',name:'Lembranças Dia dos Professores',price:'Consulte',cat:'personalizados',label:'Personalizados',img:'assets/professores.webp',short:'Presentes personalizados para homenagear.',desc:'Coleção de lembranças e presentes personalizados para o Dia dos Professores, com diferentes modelos de porta-lápis, placas, chaveiros e peças decorativas.',extra:'Preço sob consulta conforme modelo e personalização.'},
{id:'dragao',name:'Dragão Articulado 60 cm',price:'R$ 60,00',cat:'colecionaveis',label:'Colecionáveis',img:'assets/dragao.webp',gallery:['assets/gallery/dragao-1.webp','assets/gallery/dragao-2.webp'],short:'Dragão articulado de grande impacto visual.',desc:'Dragão articulado produzido em impressão 3D, com aproximadamente 60 cm de comprimento e acabamento multicolorido.',extra:'Ideal para colecionadores, fãs de fantasia, decoração e presentes.'},
{id:'ele-vive',name:'Letreiro “Ele Vive”',price:'R$ 58,00',cat:'crista',label:'Decoração Cristã',img:'assets/ele-vive.webp',gallery:['assets/gallery/ele-vive-1.webp','assets/gallery/ele-vive-2.webp','assets/gallery/ele-vive-3.webp'],short:'Peça marcante com mensagem cristã.',desc:'Letreiro decorativo “Ele Vive” em impressão 3D, com combinação de cores de forte presença e acabamento elegante.',extra:'Ideal para salas, quartos, escritórios, igrejas e espaços de oração.'},
{id:'gracas',name:'Letreiro “Em Tudo Dai Graças”',price:'R$ 30,00',cat:'crista',label:'Decoração Cristã',img:'assets/dai-gracas.webp',gallery:['assets/gallery/gracas-1.webp'],short:'Mensagem de gratidão para o lar.',desc:'Peça decorativa cristã com a mensagem “Em Tudo Dai Graças”, produzida em impressão 3D com design moderno e elegante.',extra:'Uma ótima opção para decoração e presente.'},
{id:'espiral',name:'Espiral Sensorial',price:'M R$ 35,00 • P R$ 28,00',variants:[{id:'m',label:'Tamanho M',price:'R$ 35,00'},{id:'p',label:'Tamanho P',price:'R$ 28,00'}],cat:'sensoriais',label:'Sensoriais',img:'assets/espiral.webp',gallery:['assets/gallery/espiral-1.webp','assets/gallery/espiral-2.webp'],short:'Movimento, formas e efeito visual.',desc:'Espiral sensorial com efeito de movimento e transformação. Seu formato geométrico cria diferentes desenhos conforme é manipulada.',extra:'Disponível nos tamanhos M e P.'},
{id:'estrela',name:'Estrela Sensorial',price:'R$ 55,00',cat:'sensoriais',label:'Sensoriais',img:'assets/estrela.webp',gallery:['assets/gallery/estrela-1.webp','assets/gallery/estrela-2.webp'],short:'Textura articulada em formato de estrela.',desc:'Estrela sensorial articulada formada por diversos pequenos segmentos móveis para uma experiência tátil diferente e divertida.',extra:'Recomendada para maiores de 3 anos.'},
{id:'letra',name:'Letra Personalizada Infantil',price:'A partir de R$ 45,00',cat:'infantil',label:'Infantil',img:'assets/letra-personalizada.webp',gallery:['assets/gallery/letra-1.webp'],short:'Inicial, nome, cores e tema personalizados.',desc:'Peça decorativa infantil personalizada com a inicial e o nome da criança. Pode receber diferentes cores, temas e elementos decorativos.',extra:'Valor a partir de R$ 45,00. O orçamento varia conforme a personalização.'},
{id:'jesus-ama',name:'Letreiro “Jesus te Ama”',price:'R$ 25,00',cat:'crista',label:'Decoração Cristã',img:'assets/jesus-ama.webp',gallery:['assets/gallery/jesus-ama-1.webp'],short:'Decore com fé e amor.',desc:'Letreiro decorativo em impressão 3D com a mensagem “Jesus te Ama”, ideal para levar uma mensagem de fé e carinho ao ambiente.',extra:'Produzido em PLA por impressão 3D.'},
{id:'kit-rosa',name:'Kit Sensorial Rosa',price:'R$ 110,00',cat:'sensoriais',label:'Sensoriais',img:'assets/kit-rosa.webp',gallery:['assets/gallery/kit-rosa-1.webp','assets/gallery/kit-rosa-2.webp'],short:'Experiência sensorial premium com 5 peças.',desc:'Conjunto sensorial em tons de rosa, com diferentes movimentos, texturas e formas para explorar, brincar e relaxar.',extra:'Contém: 1 bailarina, 1 bola mecânica, 1 estrela sensorial, 1 click infinito e 1 espiral sensorial.'},
{id:'kit-azul',name:'Kit Sensorial Azul',price:'R$ 110,00',cat:'sensoriais',label:'Sensoriais',img:'assets/kit-azul.webp',short:'Kit completo com 5 brinquedos sensoriais.',desc:'Conjunto com diferentes formas e movimentos para exploração tátil, atenção e diversão.',extra:'Contém: 1 espiral M, 1 estrela sensorial, 1 cubo infinito, 1 bolinha sensorial e 1 rolinho sensorial.'},
{id:'macarrao',name:'Kit Macarrão Sensorial',price:'R$ 160,00',cat:'sensoriais',label:'Sensoriais',img:'assets/kit-macarrao.webp',gallery:['assets/gallery/macarrao-1.webp'],short:'Brincadeira de faz de conta e exploração sensorial.',desc:'Kit infantil sensorial inspirado em uma refeição de macarrão, com peças manipuláveis em impressão 3D.',extra:'Contém: 1 caixa de macarrão, 12 macarrões, 2 garrafas, 1 pratinho e 1 garfo. Recomendado para maiores de 3 anos.'},
{id:'nome-lapis',name:'Nome Personalizado para Lápis',price:'R$ 5,00 / unidade',cat:'personalizados',label:'Personalizados',img:'assets/nome-lapis.webp',gallery:['assets/gallery/nome-lapis-1.webp','assets/gallery/nome-lapis-2.webp'],short:'Seu nome, seu material.',desc:'Identificador personalizado para lápis ou caneta. Uma forma prática, divertida e bonita de reconhecer materiais escolares.',extra:'Personalização com nome e combinação de cores.'},
{id:'ore-confie',name:'Letreiro “Ore e Confie”',price:'R$ 28,00',cat:'crista',label:'Decoração Cristã',img:'assets/ore-confie.webp',gallery:['assets/gallery/ore-confie-1.webp','assets/gallery/ore-confie-2.webp','assets/gallery/ore-confie-3.webp'],short:'Decoração cristã com propósito.',desc:'Letreiro decorativo com a mensagem “Ore e Confie”, ideal para salas, quartos, escritórios e cantinhos de oração.',extra:'Produzido em impressão 3D.'},
{id:'ovo',name:'Ovo Sensorial',price:'R$ 32,00',cat:'sensoriais',label:'Sensoriais',img:'assets/ovo.webp',gallery:['assets/gallery/ovo-1.webp','assets/gallery/ovo-2.webp','assets/gallery/ovo-3.webp'],short:'Articulado, envolvente e relaxante.',desc:'Brinquedo sensorial articulado com movimento e textura diferenciada. Seu formato permite abrir, movimentar e explorar suas articulações.',extra:'Leve e fácil de transportar.'},
{id:'quadrinho',name:'Quadrinho Personalizado',price:'Consulte',cat:'infantil',label:'Infantil',img:'assets/quadrinho.webp',gallery:['assets/gallery/quadrinho-1.webp','assets/gallery/quadrinho-2.webp'],short:'Dados do bebê em uma peça afetiva e exclusiva.',desc:'Quadrinho decorativo infantil personalizado com os dados do bebê, pensado para guardar momentos especiais e decorar o quartinho.',extra:'Pode incluir nome, data de nascimento, horário, peso, altura e tema. Preço sob consulta.'},
{id:'bolinhas',name:'Kit Sensorial 7 Bolinhas',price:'R$ 22,90',cat:'sensoriais',label:'Sensoriais',img:'assets/bolinhas.webp',gallery:['assets/gallery/bolinhas-1.webp','assets/gallery/bolinhas-2.webp','assets/gallery/bolinhas-3.webp','assets/gallery/bolinhas-4.webp','assets/gallery/bolinhas-5.webp','assets/gallery/bolinhas-6.webp','assets/gallery/bolinhas-7.webp'],short:'7 texturas diferentes para explorar.',desc:'Kit com sete bolinhas sensoriais de diferentes formatos e texturas para estimular tato, coordenação motora, concentração e exploração sensorial.',extra:'Kit com 7 unidades. Recomendado para maiores de 3 anos.'}
];
const WA='5541988051258';
const grid=document.getElementById('grid');
const search=document.getElementById('search');
const filters=[...document.querySelectorAll('[data-cat]')];
const empty=document.getElementById('empty');
let current='todos';
let selectedProduct=null;
let selectedVariantId=null;
let rawCart=JSON.parse(localStorage.getItem('aflarteCart')||'[]');
let cart=rawCart.map(i=>({id:i.id||i.productId,variantId:i.variantId||null,qty:i.qty||1}));

function card(p){
  return `<article class="card" data-name="${p.name.toLowerCase()}" data-cat="${p.cat}">
    <div class="card-photo"><img loading="lazy" src="${p.img}" alt="${p.name}">${(p.gallery&&p.gallery.length)?`<span class="photo-count">📷 ${p.gallery.length+1} fotos</span>`:''}</div>
    <div class="card-body"><span class="pill">${p.label}</span><h3>${p.name}</h3><div class="short">${p.short}</div><div class="price">${p.price}</div>
      <div class="actions"><button class="btn soft" type="button" data-view="${p.id}">Detalhes</button><button class="btn primary" type="button" data-add="${p.id}">${p.variants?'Escolher opção':'Adicionar'}</button></div>
    </div></article>`;
}
function render(){
  const q=search.value.trim().toLowerCase();
  const list=products.filter(p=>(current==='todos'||p.cat===current)&&(!q||(`${p.name} ${p.short} ${p.label}`).toLowerCase().includes(q)));
  grid.innerHTML=list.map(card).join('');
  empty.hidden=!!list.length;
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>openModal(b.dataset.view));
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const p=products.find(x=>x.id===b.dataset.add); if(p?.variants) openModal(p.id); else addToCart(p.id);});
}
filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');current=b.dataset.cat;render();});
search.addEventListener('input',render);

const modal=document.getElementById('modal');
function setModalImage(src,p){
  const img=document.getElementById('modalImg');
  img.src=src; img.alt=p.name;
  document.querySelectorAll('#thumbs .thumb').forEach(t=>t.classList.toggle('active',t.dataset.src===src));
}
function renderVariantPicker(p){
  const box=document.getElementById('modalVariants');
  const add=document.getElementById('modalAdd');
  selectedVariantId=null;
  if(!p.variants?.length){box.hidden=true;box.innerHTML='';add.disabled=false;add.textContent='Adicionar ao carrinho';return;}
  box.hidden=false;
  box.innerHTML=`<div class="variant-title">Escolha uma opção <span>*</span></div><div class="variant-options">${p.variants.map(v=>`<label class="variant-option"><input type="radio" name="productVariant" value="${v.id}"><span><b>${v.label}</b><small>${v.price}</small></span></label>`).join('')}</div><div class="variant-hint">Selecione a opção desejada antes de adicionar ao carrinho.</div>`;
  add.disabled=true; add.textContent='Escolha uma opção';
  box.querySelectorAll('input[name="productVariant"]').forEach(r=>r.addEventListener('change',()=>{
    selectedVariantId=r.value;
    box.querySelectorAll('.variant-option').forEach(l=>l.classList.toggle('selected',l.querySelector('input').checked));
    add.disabled=false; add.textContent='Adicionar ao carrinho';
    const v=p.variants.find(x=>x.id===selectedVariantId);
    if(v) document.getElementById('modalPrice').textContent=v.price;
  }));
}
function openModal(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  selectedProduct=p;
  const photos=[p.img,...(p.gallery||[])];
  document.getElementById('thumbs').innerHTML=photos.map((src,i)=>`<button class="thumb ${i===0?'active':''}" type="button" data-src="${src}" aria-label="Foto ${i+1} de ${p.name}"><img src="${src}" alt=""></button>`).join('');
  document.querySelectorAll('#thumbs .thumb').forEach(t=>t.onclick=()=>setModalImage(t.dataset.src,p));
  setModalImage(photos[0],p);
  document.getElementById('modalCat').textContent=p.label;
  document.getElementById('modalTitle').textContent=p.name;
  document.getElementById('modalPrice').textContent=p.price;
  document.getElementById('modalDesc').textContent=p.desc;
  document.getElementById('modalExtra').textContent=p.extra;
  renderVariantPicker(p);
  document.getElementById('modalAdd').onclick=()=>{ if(p.variants&&!selectedVariantId)return; addToCart(p.id,selectedVariantId); closeModal(); openCart(); };
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('[data-close]').forEach(x=>x.onclick=closeModal);

function itemKey(id,variantId){return `${id}::${variantId||''}`;}
function getVariant(p,variantId){return p?.variants?.find(v=>v.id===variantId)||null;}
function saveCart(){localStorage.setItem('aflarteCart',JSON.stringify(cart));updateCartCount();renderCart();}
function addToCart(id,variantId=null){
  const p=products.find(x=>x.id===id); if(!p)return;
  if(p.variants?.length&&!variantId){openModal(id);return;}
  const found=cart.find(i=>itemKey(i.id,i.variantId)===itemKey(id,variantId));
  if(found) found.qty+=1; else cart.push({id,variantId,qty:1});
  saveCart();
  const btn=document.querySelector(`[data-add="${id}"]`);
  if(btn&&!p.variants){const old=btn.textContent;btn.textContent='✓ Adicionado';setTimeout(()=>btn.textContent=old,900);}
}
function changeQty(key,delta){
  const item=cart.find(i=>itemKey(i.id,i.variantId)===key); if(!item)return;
  item.qty+=delta; if(item.qty<=0) cart=cart.filter(i=>itemKey(i.id,i.variantId)!==key); saveCart();
}
function removeFromCart(key){cart=cart.filter(i=>itemKey(i.id,i.variantId)!==key);saveCart();}
function updateCartCount(){document.getElementById('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0);}
function buildWhatsAppMessage(){
  if(!cart.length)return '';
  const lines=['Olá AFLarte! Vim pelo catálogo e gostaria de fazer este pedido:',''];
  cart.forEach((item,n)=>{
    const p=products.find(x=>x.id===item.id); if(!p)return;
    const v=getVariant(p,item.variantId);
    const option=v?` — Opção: ${v.label}`:'';
    const price=v?.price||p.price;
    lines.push(`${n+1}. ${p.name}${option} — Qtd: ${item.qty} — ${price}`);
  });
  lines.push('','Poderiam confirmar disponibilidade, prazo e valor final do pedido?');
  return `https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`;
}
function renderCart(){
  const box=document.getElementById('cartItems'), emptyBox=document.getElementById('cartEmpty'), send=document.getElementById('sendCart');
  if(!box)return;
  if(!cart.length){box.innerHTML='';emptyBox.hidden=false;send.classList.add('disabled');send.removeAttribute('href');return;}
  emptyBox.hidden=true;send.classList.remove('disabled');send.href=buildWhatsAppMessage();
  box.innerHTML=cart.map(item=>{
    const p=products.find(x=>x.id===item.id);if(!p)return '';
    const v=getVariant(p,item.variantId); const key=itemKey(item.id,item.variantId); const price=v?.price||p.price;
    return `<article class="cart-item"><img src="${p.img}" alt="${p.name}"><div class="cart-item-info"><b>${p.name}</b>${v?`<span class="cart-variant">Opção: ${v.label}</span>`:''}<span>${price}</span><div class="qty"><button type="button" data-minus="${key}" aria-label="Diminuir quantidade">−</button><strong>${item.qty}</strong><button type="button" data-plus="${key}" aria-label="Aumentar quantidade">+</button><button class="remove" type="button" data-remove="${key}">Remover</button></div></div></article>`;
  }).join('');
  document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));
  document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeFromCart(b.dataset.remove));
}
const cartModal=document.getElementById('cartModal');
function openCart(){renderCart();cartModal.classList.add('open');cartModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeCart(){cartModal.classList.remove('open');cartModal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.getElementById('openCart').onclick=openCart;
document.querySelectorAll('[data-cart-close]').forEach(x=>x.onclick=closeCart);
document.getElementById('clearCart').onclick=()=>{if(cart.length&&confirm('Limpar todos os itens do carrinho?')){cart=[];saveCart();}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeCart();}});
updateCartCount();renderCart();render();
