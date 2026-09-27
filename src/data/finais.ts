import type { PensadorId } from './tipos';

export type ContratualistaId = Extract<PensadorId, 'hobbes' | 'locke' | 'rousseau'>;

export interface OpcaoInicial {
  id: ContratualistaId;
  codigo: 'h' | 'l' | 'r';
  titulo: string;
  lema: string;
  descricao: string;
  /** Texto que abre a partida depois da escolha. */
  introducao: string;
}

export const OPCOES_INICIAIS: OpcaoInicial[] = [
  {
    id: 'hobbes',
    codigo: 'h',
    titulo: 'Um líder forte',
    lema: 'Como Hobbes',
    descricao:
      'Sem ninguém no comando, vira cada um por si. A ilha precisa de alguém com autoridade para manter a ordem e a segurança.',
    introducao:
      'Você chega à ilha decidid{o|a}: sem um chefe forte, isto aqui vira guerra de todos contra todos. Vamos ver se, na hora do aperto, você continua pensando assim.',
  },
  {
    id: 'locke',
    codigo: 'l',
    titulo: 'Regras e direitos',
    lema: 'Como Locke',
    descricao:
      'Cada um tem direito à vida, à liberdade e ao que conquista com o próprio trabalho. O chefe é escolhido por todos e existe para proteger esses direitos.',
    introducao:
      'Você chega à ilha decidid{o|a}: regras claras, respeito ao que é de cada um e um líder escolhido por todos. Vamos ver se, na hora do aperto, você continua pensando assim.',
  },
  {
    id: 'rousseau',
    codigo: 'r',
    titulo: 'Todos juntos, como iguais',
    lema: 'Como Rousseau',
    descricao:
      'Todos nascem bons; o que estraga é a disputa por poder e posse. A ilha deve decidir tudo em conjunto, pela vontade de todos.',
    introducao:
      'Você chega à ilha decidid{o|a}: aqui ninguém manda em ninguém, tudo se decide juntos e o que a ilha dá é de todos. Vamos ver se, na hora do aperto, você continua pensando assim.',
  },
];

export interface Final {
  titulo: string;
  texto: string[];
}

/** Escolhido pela média de `civ` das escolhas: alta, média ou baixa. */
export const FINAIS: Record<'civilizacao' | 'fio' | 'barbarie', Final> = {
  civilizacao: {
    titulo: 'Você não esqueceu quem era',
    texto: [
      'Sem Piggy e sem Simon, Ralph fica sozinho. A tribo de Jack sai para caçá-lo e põe fogo na mata para fazê-lo sair do esconderijo. A ilha inteira queima.',
      'Ralph corre até a praia e cai na areia. Quando levanta os olhos, vê um oficial fardado. A fumaça do incêndio foi o sinal que ninguém conseguiu manter aceso.',
      'Os caçadores param, pintados e com lanças na mão. De repente, voltam a ser só crianças. Durante toda a sua estadia, você tentou manter as regras, cuidar dos mais fracos e dizer a verdade. Nem sempre venceu, mas não esqueceu quem era.',
    ],
  },
  fio: {
    titulo: 'Por um fio',
    texto: [
      'Sem Piggy e sem Simon, Ralph fica sozinho. A tribo de Jack sai para caçá-lo e põe fogo na mata. A ilha inteira queima.',
      'Na praia, um oficial fardado olha para os garotos pintados, sujos e armados. A fumaça do incêndio trouxe o resgate.',
      'Você oscilou: às vezes defendeu a civilização, às vezes fez o que era mais fácil ou mais seguro. Como quase todos na ilha, você esteve por um fio entre as duas coisas.',
    ],
  },
  barbarie: {
    titulo: 'A fera éramos nós',
    texto: [
      'Sem Piggy e sem Simon, Ralph fica sozinho. A tribo de Jack — e você com ela — sai para caçá-lo, pondo fogo na mata. A ilha inteira queima.',
      'Na praia, um oficial fardado olha para vocês: pintados, com lanças afiadas nas duas pontas. A fumaça do incêndio trouxe o resgate.',
      'Ao ver o adulto, você larga a lança e percebe o que fez. A fera que tanto temiam nunca esteve na caverna. Simon tinha razão: ela estava dentro de cada um.',
    ],
  },
};
