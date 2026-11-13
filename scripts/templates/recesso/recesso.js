(() => {
  'use strict';

  // Datas de mudança à meia-noite no horário de Curitiba.
  const cutoff = Date.parse('2026-12-06T00:00:00-03:00');
  const holidayStart = Date.parse('2026-12-07T00:00:00-03:00');
  const holidayEnd = Date.parse('2027-01-06T00:00:00-03:00');
  const januaryShipping = 'Pedidos feitos a partir de 06/12 serão enviados após as férias, a partir de 06/01/2027.';
  const announcements = [
    {
      until: cutoff,
      sessionKey: 'aflarte:natal:2026-12-05',
      title: '<span class="recesso-chamada">Embarque no</span> último envio do ano!',
      festive: true,
      period: 'Peça até <time datetime="2026-12-05">05/12/2026</time>',
      detail: 'Seu pedido será enviado ainda em 2026.',
      message: januaryShipping,
      bannerTitle: 'Últimos envios de 2026',
      bannerText: 'Peça até 05/12 para envio ainda este ano.',
      cartTitle: 'Envios de fim de ano',
      cartText: `Pedidos até 05/12 serão enviados ainda em 2026. ${januaryShipping}`,
    },
    {
      until: holidayStart,
      sessionKey: 'aflarte:natal:2026-12-06',
      title: 'Seu pedido segue para janeiro!',
      festive: true,
      period: 'Envios a partir de <time datetime="2027-01-06">06/01/2027</time>',
      detail: 'As compras continuam abertas.',
      message: 'Os novos pedidos serão enviados após o recesso, conforme o prazo de produção.',
      bannerTitle: 'Compras abertas',
      bannerText: 'Os envios dos novos pedidos começam a partir de 6 de janeiro.',
      cartTitle: 'Envio após as férias',
      cartText: januaryShipping,
    },
    {
      until: holidayEnd,
      sessionKey: 'aflarte:recesso:2026-12-07',
      title: 'Férias coletivas',
      period: 'De <time datetime="2026-12-07">7 de dezembro de 2026</time> a <time datetime="2027-01-05">5 de janeiro de 2027</time>.',
      detail: 'Você pode comprar normalmente pelo site.',
      message: 'Os pedidos feitos desde 6 de dezembro entram em produção a partir de 6 de janeiro de 2027. O envio segue o prazo de produção de cada peça.',
      bannerTitle: 'Férias coletivas',
      bannerText: 'Compras abertas. A produção retorna em 6 de janeiro.',
      cartTitle: 'Prazo durante o recesso',
      cartText: `${januaryShipping} O prazo informado no frete conta a partir da postagem.`,
    },
  ];
  let notice;
  let timer;

  function showNotice(announcement) {
    const banner = document.createElement('p');
    banner.className = 'recesso-faixa';
    if (announcement.festive) banner.classList.add('recesso-faixa-natal');
    banner.innerHTML = `<strong>${announcement.bannerTitle}</strong><span>${announcement.bannerText}</span>`;
    document.querySelector('header.topbar')?.before(banner);

    const cartNote = document.createElement('p');
    cartNote.className = 'recesso-carrinho';
    cartNote.innerHTML = `<strong>${announcement.cartTitle}</strong><span>${announcement.cartText}</span>`;
    document.querySelector('#cartModal .cart-footer')?.prepend(cartNote);

    const dialog = document.createElement('dialog');
    notice = { announcement, elements: [banner, cartNote], dialog };
    if (typeof dialog.showModal !== 'function' || document.querySelector('#cartModal.open, #modal.open')) return;
    try {
      if (sessionStorage.getItem(announcement.sessionKey)) return;
      sessionStorage.setItem(announcement.sessionKey, '1');
    } catch {
      // Mesmo sem armazenamento disponível, exibe o aviso desta página.
    }

    dialog.className = 'recesso-aviso';
    if (announcement.festive) dialog.classList.add('recesso-aviso-natal');
    dialog.setAttribute('aria-labelledby', 'recesso-titulo');
    dialog.setAttribute('aria-describedby', 'recesso-periodo recesso-pedidos');
    const artwork = announcement.festive
      ? '<img class="recesso-trem" src="/assets/recesso/trem-natal.webp" width="1200" height="400" alt="">'
      : '<img class="recesso-logo" src="/assets/logo.webp" width="88" height="76" alt="AFLarte">';
    dialog.innerHTML = `
      <form method="dialog" class="recesso-conteudo">
        <button type="submit" class="recesso-fechar" aria-label="Fechar aviso">×</button>
        ${artwork}
        <div class="recesso-texto">
          <h2 id="recesso-titulo">${announcement.title}</h2>
          <p id="recesso-periodo">${announcement.period}</p>
          <p id="recesso-pedidos"><strong>${announcement.detail}</strong> ${announcement.message}</p>
          <button type="submit" class="recesso-continuar" autofocus>${announcement.festive ? 'Continuar comprando' : 'Continuar navegando'}</button>
        </div>
      </form>`;
    document.body.append(dialog);
    notice.elements.push(dialog);
    dialog.showModal();
  }

  function updateNotice() {
    clearTimeout(timer);
    const now = Date.now();
    const announcement = announcements.find(item => now < item.until);

    if (notice && notice.announcement !== announcement) {
      if (notice.dialog.open) notice.dialog.close();
      notice.elements.forEach(element => element.remove());
      notice = undefined;
    }

    if (announcement && !notice) showNotice(announcement);
    if (announcement) timer = setTimeout(updateNotice, Math.min(announcement.until - now, 2_147_483_647));
  }

  window.addEventListener('pageshow', updateNotice);
  document.addEventListener('visibilitychange', updateNotice);
  updateNotice();
})();
