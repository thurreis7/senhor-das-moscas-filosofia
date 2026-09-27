import { FINAIS, OPCOES_INICIAIS, type ContratualistaId, type Final } from './data/finais';
import { GRUPOS, PENSADORES } from './data/pensadores';
import { CENAS_DO_FILME, EVENTOS, SITUACAO_POR_ID } from './data/situacoes';
import type { GrupoId, PensadorId, Situacao } from './data/tipos';

export const EVENTOS_POR_PARTIDA = 8;
const MAX_EVENTOS_POR_INTERVALO = 2;
/** Suavização: evita que um pensador com poucos pontos possíveis dispare no ranking. */
const SUAVIZACAO = 3;

export interface Escolha {
  situacaoId: string;
  /** Índice original da opção (0 a 4), independente da ordem mostrada na tela. */
  opcao: number;
}

function embaralhar<T>(lista: T[], aleatorio: () => number = Math.random): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** 12 cenas do filme em ordem, com 8 eventos sorteados intercalados. */
export function montarPartida(aleatorio: () => number = Math.random): string[] {
  const total = CENAS_DO_FILME.length;
  // intervalos[k] = eventos que entram depois da cena k (1..total-1)
  const intervalos: Situacao[][] = Array.from({ length: total }, () => []);
  let colocados = 0;
  for (const evento of embaralhar(EVENTOS, aleatorio)) {
    if (colocados === EVENTOS_POR_PARTIDA) break;
    const minimo = Math.max(evento.depoisDe ?? 1, 1);
    const livres: number[] = [];
    for (let k = minimo; k < total; k++) {
      if (intervalos[k].length < MAX_EVENTOS_POR_INTERVALO) livres.push(k);
    }
    if (livres.length === 0) continue;
    intervalos[livres[Math.floor(aleatorio() * livres.length)]].push(evento);
    colocados++;
  }
  const ordem: string[] = [];
  CENAS_DO_FILME.forEach((cena, i) => {
    ordem.push(cena.id);
    if (i + 1 < total) ordem.push(...intervalos[i + 1].map((e) => e.id));
  });
  return ordem;
}

/** Ordem aleatória das 5 opções na tela (para ninguém decorar "a C é sempre a boazinha"). */
export function ordemDasOpcoes(): number[] {
  return embaralhar([0, 1, 2, 3, 4]);
}

export interface Afinidade {
  id: PensadorId;
  pontos: number;
  maximo: number;
  /** 0 a 100. */
  porcentagem: number;
  momentos: { situacao: Situacao; opcao: number; peso: number }[];
}

export interface Resultado {
  contratualista: ContratualistaId;
  ranking: Afinidade[];
  grupos: { id: GrupoId; porcentagem: number }[];
  posicaoDoEscolhido: number;
  final: Final;
}

export function calcularResultado(contratualista: ContratualistaId, escolhas: Escolha[]): Resultado {
  const ranking: Afinidade[] = PENSADORES.map((p) => {
    let pontos = 0;
    let maximo = 0;
    const momentos: Afinidade['momentos'] = [];
    for (const escolha of escolhas) {
      const situacao = SITUACAO_POR_ID[escolha.situacaoId];
      if (!situacao) continue;
      maximo += Math.max(0, ...situacao.opcoes.map((o) => o.pesos[p.id] ?? 0));
      const peso = situacao.opcoes[escolha.opcao]?.pesos[p.id] ?? 0;
      pontos += peso;
      if (peso > 0) momentos.push({ situacao, opcao: escolha.opcao, peso });
    }
    momentos.sort((a, b) => b.peso - a.peso);
    const porcentagem = Math.round((100 * Math.max(0, pontos)) / (maximo + SUAVIZACAO));
    return { id: p.id, pontos, maximo, porcentagem, momentos: momentos.slice(0, 2) };
  });
  ranking.sort((a, b) => b.porcentagem - a.porcentagem || b.pontos - a.pontos);

  const grupos = GRUPOS.map((g) => {
    const doGrupo = ranking.filter((a) => PENSADORES.find((p) => p.id === a.id)?.grupo === g.id);
    const pontos = doGrupo.reduce((s, a) => s + Math.max(0, a.pontos), 0);
    const maximo = doGrupo.reduce((s, a) => s + a.maximo, 0);
    return { id: g.id, porcentagem: maximo ? Math.round((100 * pontos) / maximo) : 0 };
  }).sort((a, b) => b.porcentagem - a.porcentagem);

  const civ = escolhas.reduce((s, e) => s + (SITUACAO_POR_ID[e.situacaoId]?.opcoes[e.opcao]?.civ ?? 0), 0);
  const media = escolhas.length ? civ / escolhas.length : 0;
  const final = media >= 0.55 ? FINAIS.civilizacao : media >= 0.1 ? FINAIS.fio : FINAIS.barbarie;

  return {
    contratualista,
    ranking,
    grupos,
    posicaoDoEscolhido: ranking.findIndex((a) => a.id === contratualista) + 1,
    final,
  };
}

// Link de compartilhamento: #r=h.f01b-e05c-...
const LETRAS = 'abcde';

export function codificar(contratualista: ContratualistaId, escolhas: Escolha[]): string {
  const codigo = OPCOES_INICIAIS.find((o) => o.id === contratualista)!.codigo;
  return `${codigo}.${escolhas.map((e) => e.situacaoId + LETRAS[e.opcao]).join('-')}`;
}

export function decodificar(texto: string): { contratualista: ContratualistaId; escolhas: Escolha[] } | null {
  const [codigo, lista] = texto.split('.');
  const inicial = OPCOES_INICIAIS.find((o) => o.codigo === codigo);
  if (!inicial || !lista) return null;
  const escolhas: Escolha[] = [];
  for (const parte of lista.split('-')) {
    const situacaoId = parte.slice(0, -1);
    const opcao = LETRAS.indexOf(parte.slice(-1));
    if (!SITUACAO_POR_ID[situacaoId] || opcao < 0) return null;
    escolhas.push({ situacaoId, opcao });
  }
  return escolhas.length ? { contratualista: inicial.id, escolhas } : null;
}
