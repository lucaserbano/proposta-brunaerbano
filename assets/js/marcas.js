/* Marcas d'água com os elementos de suporte da Ars.
   Cada item: [elemento, x%, y%, altura em px (no desktop), opacidade]. x/y são o centro do desenho na seção.
   "espiral-total" ocupa toda a altura da seção, sem deformar. */
(function () {
  'use strict';

  var MAPA = {
    inicio: [
      ['louros', 8, 82, 140, 0.06], ['flor', 40, 88, 90, 0.05], ['apolo', 4, 30, 260, 0.04]
    ],
    objetivos: [
      ['apolo', 93, 18, 340, 0.08], ['flor', 6, 12, 110, 0.06], ['asclepio', 4, 70, 380, 0.06],
      ['louros', 56, 46, 150, 0.05], ['coluna', 97, 78, 360, 0.07], ['flor', 48, 94, 80, 0.05],
      ['atlas', 30, 52, 220, 0.04]
    ],
    etapas: [
      ['espiral-total', 0, 0, 0, 0.07],
      ['apolo', 6, 16, 220, 0.06], ['flor', 92, 8, 100, 0.07], ['louros', 4, 92, 150, 0.06],
      ['asclepio', 64, 92, 260, 0.05]
    ],
    entregaveis: [
      ['coluna', 96, 8, 320, 0.08], ['apolo', 5, 20, 280, 0.07], ['flor', 52, 4, 90, 0.05],
      ['asclepio', 97, 38, 360, 0.06], ['louros', 50, 30, 140, 0.05], ['atlas', 4, 50, 260, 0.06],
      ['flor', 94, 58, 120, 0.07], ['apolo', 96, 74, 300, 0.05], ['coluna', 3, 82, 300, 0.06],
      ['louros', 48, 63, 120, 0.04], ['asclepio', 30, 96, 240, 0.05]
    ],
    opcionais: [
      ['apolo', 84, 50, 380, 0.09], ['flor', 64, 18, 110, 0.06], ['louros', 96, 90, 150, 0.06],
      ['coluna', 3, 60, 280, 0.05], ['atlas', 62, 86, 200, 0.05]
    ],
    prazos: [
      ['apolo', 90, 30, 360, 0.08], ['asclepio', 4, 22, 300, 0.05], ['louros', 72, 8, 140, 0.06],
      ['flor', 40, 94, 90, 0.05], ['coluna', 97, 86, 260, 0.05], ['atlas', 54, 30, 200, 0.04]
    ],
    investimento: [
      ['asclepio', 95, 12, 340, 0.07], ['apolo', 4, 24, 300, 0.06], ['flor', 70, 6, 100, 0.06],
      ['coluna', 3, 78, 320, 0.06], ['louros', 60, 92, 150, 0.05], ['atlas', 96, 80, 260, 0.06]
    ],
    contato: [
      ['apolo', 9, 58, 400, 0.1], ['asclepio', 92, 58, 380, 0.08], ['flor', 30, 12, 90, 0.06],
      ['louros', 72, 14, 130, 0.06], ['coluna', 50, 96, 160, 0.04]
    ]
  };

  // largura / altura de cada desenho, para mantê-lo inteiro dentro da seção
  var PROP = { apolo: 700 / 937, asclepio: 440 / 1000, coluna: 360 / 1124, atlas: 520 / 925, flor: 300 / 319, louros: 420 / 338 };

  Object.keys(MAPA).forEach(function (id) {
    var secao = document.getElementById(id);
    if (!secao) return;
    secao.classList.add('tem-marca');
    var frag = document.createDocumentFragment();
    MAPA[id].forEach(function (m) {
      var el = document.createElement('div');
      el.className = 'marca-dagua wm-' + m[0];
      el.setAttribute('aria-hidden', 'true');
      el.style.opacity = m[4];
      if (m[0] !== 'espiral-total') {
        var meiaL = Math.ceil(m[3] * PROP[m[0]] / 2) + 8, meiaA = Math.ceil(m[3] / 2) + 8;
        el.style.left = 'clamp(' + meiaL + 'px, ' + m[1] + '%, calc(100% - ' + meiaL + 'px))';
        el.style.top = 'clamp(' + meiaA + 'px, ' + m[2] + '%, calc(100% - ' + meiaA + 'px))';
        el.style.height = 'clamp(' + Math.round(m[3] * 0.55) + 'px, ' + (m[3] / 14.4).toFixed(2) + 'vw, ' + m[3] + 'px)';
      }
      frag.appendChild(el);
    });
    secao.insertBefore(frag, secao.firstChild);
  });
})();
