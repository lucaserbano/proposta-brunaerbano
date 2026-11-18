/* Marcas d'água com os elementos de suporte da Ars.
   Poucas e grandes: cada desenho ocupa (quase) toda a altura da seção, sem deformar.
   Cada item: [elemento, lado ('esquerda' | 'direita'), opacidade, altura em % da seção]. */
(function () {
  'use strict';

  var MAPA = {
    objetivos: [['asclepio', 'direita', 0.05, 94]],
    etapas: [['espiral', 'direita', 0.06, 100]],
    entregaveis: [['coluna', 'direita', 0.05, 96]],
    opcionais: [['atlas', 'direita', 0.06, 92]],
    prazos: [['apolo', 'direita', 0.03, 92]],
    investimento: [['asclepio', 'esquerda', 0.04, 94]],
    contato: [['apolo', 'esquerda', 0.035, 92]]
  };

  Object.keys(MAPA).forEach(function (id) {
    var secao = document.getElementById(id);
    if (!secao) return;
    secao.classList.add('tem-marca');
    var frag = document.createDocumentFragment();
    MAPA[id].forEach(function (m) {
      var el = document.createElement('div');
      el.className = 'marca-dagua marca-' + m[1] + ' wm-' + m[0];
      el.setAttribute('aria-hidden', 'true');
      el.style.setProperty('--op', m[2]);
      el.style.height = m[3] + '%';
      frag.appendChild(el);
    });
    secao.insertBefore(frag, secao.firstChild);
  });

  // surgem lentamente quando a seção entra na tela
  var secoes = document.querySelectorAll('.tem-marca');
  if (!('IntersectionObserver' in window)) {
    secoes.forEach(function (s) { s.classList.add('marca-on'); });
    return;
  }
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('marca-on'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  secoes.forEach(function (s) { io.observe(s); });
})();
