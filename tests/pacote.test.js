const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../assets/js/pacote.js');

test('formatar usa R$, ponto de milhar e sinal de menos', () => {
  assert.equal(P.formatar(2120), 'R$ 2.120');
  assert.equal(P.formatar(900), 'R$ 900');
  assert.equal(P.formatar(3660), 'R$ 3.660');
  assert.equal(P.formatar(-2440), '− R$ 2.440');
});

test('cupom SISTER: de 3.660 por 1.220', () => {
  assert.equal(P.ENTREGAVEIS_CHEIO, 3660);
  assert.equal(P.ENTREGAVEIS, 1220);
  assert.equal(P.DESCONTO, 2440);
  assert.equal(P.CUPOM, 'SISTER');
});

test('sem opcional: só entregáveis com desconto', () => {
  const r = P.calcular([]);
  assert.equal(r.total, 1220);
  assert.equal(r.totalCheio, 3660);
});

test('com o opcional de 9 publicações', () => {
  const r = P.calcular(['posts9']);
  assert.equal(r.total, 2120);
  assert.equal(r.totalCheio, 4560);
  assert.equal(r.marcados.length, 1);
});

test('ids repetidos e desconhecidos são ignorados', () => {
  const r = P.calcular(['posts9', 'posts9', 'xyz']);
  assert.equal(r.total, 2120);
  assert.equal(r.marcados.length, 1);
});

test('mensagem sem opcional', () => {
  const m = P.mensagem([]);
  assert.match(m, /^Olá, Lucas! Vi a proposta de branding e identidade visual para a marca pessoal de cardiologia\./);
  assert.match(m, /• Entregáveis \(de R\$ 3\.660 por R\$ 1\.220 com o cupom SISTER\)/);
  assert.match(m, /Total: R\$ 1\.220$/);
});

test('mensagem com opcional', () => {
  const m = P.mensagem(['posts9']).split('\n');
  assert.equal(m[3].startsWith('• Criação de 9 publicações para feed do Instagram'), true);
  assert.equal(m[4], 'Total: R$ 2.120');
});

test('link do WhatsApp preserva acentos, bullets e quebras de linha', () => {
  const texto = P.mensagem(['posts9']);
  const link = P.linkWhatsApp(texto);
  assert.ok(link.startsWith('https://wa.me/5541999837301?text='));
  assert.equal(decodeURIComponent(link.split('?text=')[1]), texto);
});
