export type GrupoId =
  | 'contratualistas'
  | 'esquerda'
  | 'direita'
  | 'centro'
  | 'pragmatismo'
  | 'tecnocracia'
  | 'moral';

export type PensadorId =
  | 'hobbes' | 'locke' | 'rousseau'
  | 'marx' | 'gramsci' | 'freire'
  | 'burke' | 'smith' | 'hayek'
  | 'aristoteles' | 'montesquieu' | 'rawls'
  | 'maquiavel' | 'mill' | 'dewey'
  | 'platao' | 'comte' | 'weber'
  | 'kant' | 'nietzsche' | 'durkheim';

export interface Grupo {
  id: GrupoId;
  nome: string;
  cor: string;
}

export interface Pensador {
  id: PensadorId;
  nome: string;
  grupo: GrupoId;
  anos: string;
  /** Ideia central, em uma ou duas frases. */
  ideia: string;
  /** Como o pensamento dele aparece no filme. */
  noFilme: string;
}

export type Pesos = Partial<Record<PensadorId, number>>;

export interface Opcao {
  texto: string;
  /** O que acontece depois da escolha. */
  consequencia: string;
  pesos: Pesos;
  /** +1 empurra a ilha para a civilização, -1 para a barbárie. */
  civ: -1 | 0 | 1;
}

export interface Situacao {
  id: string;
  tipo: 'filme' | 'evento';
  titulo: string;
  texto: string;
  opcoes: [Opcao, Opcao, Opcao, Opcao, Opcao];
  /** Eventos: só aparecem depois desta cena do filme (índice 1..12). */
  depoisDe?: number;
}
