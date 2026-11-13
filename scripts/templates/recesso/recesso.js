(() => {
  'use strict';

  // Meia-noite em Curitiba (UTC−03:00) nas duas datas.
  const start = Date.parse('2026-12-07T00:00:00-03:00');
  const end = Date.parse('2027-01-06T00:00:00-03:00');
  const sessionKey = 'aflarte:recesso:2026-12-07';
  const productionMessage = 'Os pedidos feitos durante o recesso serão produzidos a partir de 6 de janeiro de 2027.';
  let notice;
  let timer;

  function showNotice() {
    const banner = document.createElement('p');
    banner.className = 'recesso-faixa';
    banner.innerHTML = '<strong>Férias coletivas</strong><span>Compras abertas. A produção retorna em 6 de janeiro.</span>';
    document.querySelector('header.topbar')?.before(banner);

    const cartNote = document.createElement('p');
    cartNote.className = 'recesso-carrinho';
    cartNote.innerHTML = `<strong>Prazo durante o recesso</strong><span>${productionMessage} O prazo informado no frete conta a partir da postagem.</span>`;
    const cartFooter = document.querySelector('#cartModal .cart-footer');
    cartFooter?.before(cartNote);
    // Os scripts do checkout inserem o resumo e o frete ao terminar de carregar.
    if (document.readyState === 'interactive') {
      document.addEventListener('DOMContentLoaded', () => {
        if (cartNote.isConnected) cartFooter?.before(cartNote);
      }, { once: true });
    }

    const dialog = document.createElement('dialog');
    dialog.className = 'recesso-aviso';
    dialog.setAttribute('aria-labelledby', 'recesso-titulo');
    dialog.setAttribute('aria-describedby', 'recesso-periodo recesso-pedidos');
    dialog.innerHTML = `
      <form method="dialog" class="recesso-conteudo">
        <button type="submit" class="recesso-fechar" aria-label="Fechar aviso de férias">×</button>
        <img class="recesso-logo" src="/assets/logo.webp" width="88" height="76" alt="AFLarte">
        <h2 id="recesso-titulo">Férias coletivas</h2>
        <p id="recesso-periodo">De <time datetime="2026-12-07">7 de dezembro de 2026</time> a <time datetime="2027-01-05">5 de janeiro de 2027</time>.</p>
        <p id="recesso-pedidos"><strong>Você pode comprar normalmente pelo site.</strong> ${productionMessage}</p>
        <button type="submit" class="recesso-continuar" autofocus>Continuar navegando</button>
      </form>`;
    document.body.append(dialog);
    notice = { banner, cartNote, dialog };

    if (typeof dialog.showModal !== 'function' || document.querySelector('#cartModal.open, #modal.open')) return;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // Mesmo sem armazenamento disponível, exibe o aviso desta página.
    }
    dialog.showModal();
  }

  function updateNotice() {
    clearTimeout(timer);
    const now = Date.now();

    if (now >= start && now < end && !notice) showNotice();
    if ((now < start || now >= end) && notice) {
      if (notice.dialog.open) notice.dialog.close();
      Object.values(notice).forEach(element => element.remove());
      notice = undefined;
    }

    const nextChange = now < start ? start : end;
    if (now < end) timer = setTimeout(updateNotice, Math.min(nextChange - now, 2_147_483_647));
  }

  window.addEventListener('pageshow', updateNotice);
  document.addEventListener('visibilitychange', updateNotice);
  updateNotice();
})();
