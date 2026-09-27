// Checa o equilíbrio da pontuação: npm run balance
import { PENSADORES } from '../src/data/pensadores';
import { TODAS_AS_SITUACOES, SITUACAO_POR_ID } from '../src/data/situacoes';
import { calcularResultado, montarPartida, type Escolha } from '../src/jogo';

const linhas = PENSADORES.map((p) => {
  let aparece = 0;
  let maximo = 0;
  for (const s of TODAS_AS_SITUACOES) {
    const m = Math.max(0, ...s.opcoes.map((o) => o.pesos[p.id] ?? 0));
    if (m > 0) aparece++;
    maximo += m;
  }
  return { id: p.id, aparece, maximo, top1: 0, top4: 0, fiel: 0 };
});

// Jogadores aleatórios
const N = 20000;
const finais: Record<string, number> = {};
for (let i = 0; i < N; i++) {
  const escolhas: Escolha[] = montarPartida().map((id) => ({ situacaoId: id, opcao: Math.floor(Math.random() * 5) }));
  const r = calcularResultado('hobbes', escolhas);
  finais[r.final.titulo] = (finais[r.final.titulo] ?? 0) + 1;
  r.ranking.slice(0, 4).forEach((a, pos) => {
    const l = linhas.find((x) => x.id === a.id)!;
    l.top4++;
    if (pos === 0) l.top1++;
  });
}

// Jogador "fiel": sempre escolhe a opção que mais pontua para um pensador. Ele deveria sair em 1º.
for (const l of linhas) {
  let acertos = 0;
  for (let i = 0; i < 200; i++) {
    const escolhas = montarPartida().map((id) => {
      const s = SITUACAO_POR_ID[id];
      const pesos = s.opcoes.map((o) => o.pesos[l.id] ?? 0);
      return { situacaoId: id, opcao: pesos.indexOf(Math.max(...pesos)) };
    });
    if (calcularResultado('hobbes', escolhas).ranking[0].id === l.id) acertos++;
  }
  l.fiel = acertos / 2;
}

console.log('pensador      aparece  máx   top1%  top4%  fiel%');
for (const l of linhas) {
  console.log(
    l.id.padEnd(13),
    String(l.aparece).padStart(6),
    String(l.maximo).padStart(5),
    ((100 * l.top1) / N).toFixed(1).padStart(6),
    ((100 * l.top4) / N).toFixed(1).padStart(6),
    l.fiel.toFixed(0).padStart(6),
  );
}
console.log('\nFinais (jogadores aleatórios):', finais);
