/* Regras de preço da proposta. Fonte única dos valores.
   No navegador fica em window.Pacote; no Node, em module.exports (testes). */
(function (root) {
  'use strict';

  var ENTREGAVEIS_CHEIO = 3660;
  var CUPOM = 'SISTER';
  var ENTREGAVEIS = 1220; // valor com o desconto do cupom
  var DESCONTO = ENTREGAVEIS_CHEIO - ENTREGAVEIS;
  var WA_NUMERO = '5541999837301';
  var ASSUNTO = 'Olá, Lucas! Vi a proposta de branding e identidade visual para a marca pessoal de cardiologia';
  var MSG_GERAL = ASSUNTO + ' e gostaria de conversar.';

  var OPCIONAIS = [
    { id: 'posts9', curto: '9 publicações (feed)', nome: 'Criação de 9 publicações para feed do Instagram (5 estáticas e 4 carrosseis, copywriting e design)', valor: 900 }
  ];

  function formatar(valor) {
    var sinal = valor < 0 ? '− ' : '';
    return sinal + 'R$ ' + String(Math.round(Math.abs(valor))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function calcular(ids) {
    var marcados = OPCIONAIS.filter(function (o) { return ids.indexOf(o.id) !== -1; });
    var extras = marcados.reduce(function (soma, o) { return soma + o.valor; }, 0);
    return { marcados: marcados, total: ENTREGAVEIS + extras, totalCheio: ENTREGAVEIS_CHEIO + extras };
  }

  function mensagem(ids) {
    var r = calcular(ids);
    var linhas = [
      ASSUNTO + '.',
      'Quero contratar:',
      '• Entregáveis (de ' + formatar(ENTREGAVEIS_CHEIO) + ' por ' + formatar(ENTREGAVEIS) + ' com o cupom ' + CUPOM + ')'
    ];
    r.marcados.forEach(function (o) { linhas.push('• ' + o.nome + ' (' + formatar(o.valor) + ')'); });
    linhas.push('Total: ' + formatar(r.total));
    return linhas.join('\n');
  }

  function linkWhatsApp(texto) {
    return 'https://wa.me/' + WA_NUMERO + '?text=' + encodeURIComponent(texto);
  }

  var api = {
    ENTREGAVEIS: ENTREGAVEIS,
    ENTREGAVEIS_CHEIO: ENTREGAVEIS_CHEIO,
    DESCONTO: DESCONTO,
    CUPOM: CUPOM,
    WA_NUMERO: WA_NUMERO,
    MSG_GERAL: MSG_GERAL,
    OPCIONAIS: OPCIONAIS,
    formatar: formatar,
    calcular: calcular,
    mensagem: mensagem,
    linkWhatsApp: linkWhatsApp
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Pacote = api;
})(this);
