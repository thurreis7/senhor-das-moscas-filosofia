import type { CenarioId, Hora } from '../pixel/cenario';
import type { AtorId } from '../pixel/elenco';
import type { AtorNaCena, EfeitoId, ObjetoId, Pose } from '../pixel/palco';

/**
 * Como cada situação aparece na tela.
 * - `quem` entra andando e diz a `fala` (use {nome} para o nome do jogador e {o|a} para palavras com gênero).
 * - `quem: 'cabeca'` = a cabeça de porco "fala"; `quem: 'jogador'` = pensamento do próprio jogador.
 * - `atores` são os personagens que já estão em cena (o jogador entra sozinho, em x = 100).
 */
export interface Encenacao {
  cenario: CenarioId;
  hora: Hora;
  quem: AtorId | 'cabeca';
  fala: string;
  quemPintado?: boolean;
  quemSemOculos?: boolean;
  atores?: AtorNaCena[];
  objetos?: ObjetoId[];
  efeitos?: EfeitoId[];
  poseJogador?: Pose;
}

export const ENCENACOES: Record<string, Encenacao> = {
  // ---------- Cenas do filme ----------
  f01: {
    cenario: 'mar',
    hora: 'noite',
    quem: 'ralph',
    fala: '{nome}! Aguenta aí! O capitão tá sangrando muito… e a ilha tá longe!',
    poseJogador: 'nadando',
    atores: [{ id: 'capitao', x: 64, pose: 'nadando', olhando: 'direita' }],
    objetos: ['destrocos'],
  },
  f02: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'piggy',
    fala: 'Olha só essa concha, {nome}! Se soprar direito, todo mundo escuta. Ralph vai chamar a primeira reunião!',
    atores: [
      { id: 'ralph', x: 60, olhando: 'direita' },
      { id: 'sam', x: 196, y: -6, olhando: 'esquerda' },
      { id: 'pequeno', x: 214, y: -4, olhando: 'esquerda' },
    ],
    objetos: ['concha'],
  },
  f03: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'jack',
    fala: 'Eu sou o mais velho aqui, {nome}. Tenho patente. Sei comandar. Você vai votar em quem?',
    atores: [
      { id: 'ralph', x: 60, olhando: 'direita' },
      { id: 'piggy', x: 36, y: -4, olhando: 'direita' },
      { id: 'roger', x: 200, y: -6, olhando: 'esquerda' },
    ],
    objetos: ['concha'],
  },
  f04: {
    cenario: 'acampamento',
    hora: 'tarde',
    quem: 'jack',
    fala: 'Regras? Concha? Na academia a gente obedecia ordens, {nome}. Você acha mesmo que isso funciona?',
    atores: [
      { id: 'ralph', x: 64, y: -4, olhando: 'direita' },
      { id: 'piggy', x: 40, y: -6, olhando: 'direita' },
    ],
    objetos: ['concha'],
  },
  f05: {
    cenario: 'morro',
    hora: 'dia',
    quem: 'piggy',
    quemSemOculos: true,
    fala: 'Meus óculos! Devolve! Eu não enxergo nada sem eles! {nome}, fala alguma coisa!',
    atores: [
      { id: 'jack', x: 176, y: -4, olhando: 'esquerda' },
      { id: 'ralph', x: 60, y: -4, olhando: 'direita' },
    ],
    objetos: ['fogueira'],
  },
  f06: {
    cenario: 'praia',
    hora: 'tarde',
    quem: 'simon',
    fala: 'Ele tá ardendo em febre, {nome}. E a comida tá acabando… O que a gente faz com ele?',
    atores: [{ id: 'capitao', x: 58, pose: 'deitado' }],
  },
  f07: {
    cenario: 'morro',
    hora: 'tarde',
    quem: 'jack',
    fala: 'Pegamos um porco! Um porco inteiro, {nome}! Você viu? Por que essa cara?',
    atores: [{ id: 'ralph', x: 64, y: -4, olhando: 'direita' }],
    objetos: ['fogueira-apagada'],
    efeitos: ['aeronave'],
  },
  f08: {
    cenario: 'acampamento',
    hora: 'noite',
    quem: 'pequeno',
    fala: '{nome}… tem uma fera na caverna do morro. Eu vi. Ela se mexe no escuro…',
    atores: [
      { id: 'sam', x: 200, y: -6, olhando: 'esquerda' },
      { id: 'eric', x: 214, y: -4, olhando: 'esquerda' },
    ],
    objetos: ['fogueira'],
  },
  f09: {
    cenario: 'acampamento',
    hora: 'dia',
    quem: 'jack',
    quemPintado: true,
    fala: 'Quem quiser caçar e se divertir, vem comigo! Lá tem carne. E você, {nome}? Vai ficar com eles?',
    atores: [
      { id: 'ralph', x: 64, y: -4, olhando: 'direita' },
      { id: 'piggy', x: 42, y: -6, olhando: 'direita' },
      { id: 'roger', x: 204, y: -6, olhando: 'esquerda', pintado: true },
    ],
    objetos: ['concha'],
  },
  f10: {
    cenario: 'clareira',
    hora: 'tarde',
    quem: 'cabeca',
    fala: 'Achou que podia fugir de mim, {nome}? Eu não estou na mata. Eu estou em vocês…',
    objetos: ['cabeca'],
  },
  f11: {
    cenario: 'praia',
    hora: 'tempestade',
    quem: 'roger',
    quemPintado: true,
    fala: 'Mata a fera! Entra na roda, {nome}! Entra!',
    atores: [
      { id: 'jack', x: 40, y: -6, pose: 'dancando', pintado: true },
      { id: 'cacador', x: 64, y: -2, pose: 'dancando' },
      { id: 'sam', x: 190, y: -6, pose: 'dancando', pintado: true },
      { id: 'eric', x: 214, y: -4, pose: 'dancando', pintado: true },
    ],
    objetos: ['fogueira'],
  },
  f12: {
    cenario: 'rocha',
    hora: 'dia',
    quem: 'piggy',
    quemSemOculos: true,
    fala: 'Eles roubaram meus óculos, {nome}. Eu vou até lá pegar de volta. Você vem comigo?',
    atores: [{ id: 'ralph', x: 64, olhando: 'direita' }],
  },

  // ---------- Eventos ----------
  e01: {
    cenario: 'mata',
    hora: 'dia',
    quem: 'eric',
    fala: 'Sai daqui, {nome}! Colhi sozinho a manhã inteira. Vai buscar a sua!',
    objetos: ['arvore-frutas'],
  },
  e02: {
    cenario: 'acampamento',
    hora: 'noite',
    quem: 'sam',
    fala: '{nome}, pegamos o ladrão do estoque… é um dos pequenos. Tá chorando de fome.',
    atores: [{ id: 'pequeno', x: 176, y: -2, olhando: 'esquerda' }],
    objetos: ['fogueira'],
  },
  e03: {
    cenario: 'acampamento',
    hora: 'dia',
    quem: 'eric',
    fala: 'O pequeno tá queimando de febre, {nome}. Alguém tem que ficar com ele…',
    atores: [{ id: 'pequena', x: 60, pose: 'deitado' }],
  },
  e04: {
    cenario: 'acampamento',
    hora: 'tempestade',
    quem: 'ralph',
    fala: 'Caiu tudo, {nome}! Os pequenos tão encharcados e os caçadores não querem ajudar!',
    atores: [
      { id: 'pequeno', x: 40, y: -4, olhando: 'direita' },
      { id: 'pequena', x: 58, y: -2, olhando: 'direita' },
    ],
    objetos: ['abrigos-caidos'],
  },
  e05: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'roger',
    fala: 'Opa… o que é isso aí, {nome}? Uma caixa do avião? Tem uma faca aí dentro?',
    objetos: ['caixa'],
  },
  e06: {
    cenario: 'praia',
    hora: 'tarde',
    quem: 'piggy',
    fala: 'Aqueles três só nadam o dia inteiro, {nome}! E são os primeiros da fila da comida!',
    atores: [
      { id: 'cadete', x: 206, y: -10, pose: 'nadando' },
      { id: 'sam', x: 226, y: -12, pose: 'nadando' },
    ],
  },
  e07: {
    cenario: 'acampamento',
    hora: 'noite',
    quem: 'cadete',
    fala: 'Eu vi a fera, {nome}! De pertinho! Ela… ela fala! Eu enfrentei ela sozinho!',
    atores: [
      { id: 'pequeno', x: 40, y: -4, olhando: 'direita' },
      { id: 'pequena', x: 200, y: -6, olhando: 'esquerda' },
    ],
    objetos: ['fogueira'],
  },
  e08: {
    cenario: 'morro',
    hora: 'dia',
    quem: 'ralph',
    fala: 'Ele largou o fogo pra ir nadar, {nome}. Ninguém nunca foi punido aqui. O que a gente faz?',
    atores: [{ id: 'cadete', x: 196, y: -6, olhando: 'esquerda' }],
    objetos: ['fogueira'],
  },
  e09: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'piggy',
    fala: '{nome}, os pequenos tão esquecendo tudo… um nem lembra mais o endereço de casa.',
    atores: [
      { id: 'pequeno', x: 56, olhando: 'direita' },
      { id: 'pequena', x: 36, y: -3, olhando: 'direita' },
    ],
  },
  e10: {
    cenario: 'mata',
    hora: 'dia',
    quem: 'jogador',
    fala: 'Água doce! Escondida entre as pedras… e ninguém mais sabe dela.',
    objetos: ['fonte'],
  },
  e11: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'cadete',
    fala: 'Vou fazer uma jangada e sair daqui, {nome}. Só preciso da madeira dos abrigos.',
    objetos: ['jangada'],
  },
  e12: {
    cenario: 'acampamento',
    hora: 'dia',
    quem: 'ralph',
    fala: '{nome}, me ajuda a organizar? Fogo, pesca, abrigos, água, caça, os pequenos… quem faz o quê?',
    atores: [
      { id: 'sam', x: 190, y: -6, olhando: 'esquerda' },
      { id: 'eric', x: 206, y: -4, olhando: 'esquerda' },
    ],
  },
  e13: {
    cenario: 'acampamento',
    hora: 'tarde',
    quem: 'roger',
    fala: 'Hahaha! Olha ele tentando falar de novo! Ri também, {nome}!',
    atores: [{ id: 'piggy', x: 60, olhando: 'direita' }],
    objetos: ['concha'],
  },
  e14: {
    cenario: 'mata',
    hora: 'tarde',
    quem: 'cacador',
    fala: 'Com a pintura, os porcos não veem a gente. E ninguém sabe quem é quem… Quer pintar também, {nome}?',
  },
  e15: {
    cenario: 'acampamento',
    hora: 'noite',
    quem: 'cacador',
    fala: 'Psiu, {nome}… carne fresca. É toda sua. Só deixa o fogo "descuidado" hoje à noite.',
    objetos: ['fogueira'],
  },
  e16: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'piggy',
    fala: 'E se a gente escrevesse as regras nessa pedra, {nome}? Aí ninguém pode dizer que não sabia.',
    objetos: ['pedra-leis'],
  },
  e17: {
    cenario: 'acampamento',
    hora: 'tarde',
    quem: 'ralph',
    fala: 'Tô pensando em decidir tudo sozinho até o resgate, {nome}. Sem assembleias. O que você acha?',
    objetos: ['concha'],
  },
  e18: {
    cenario: 'mata',
    hora: 'noite',
    quem: 'cadete',
    fala: 'Me ajuda, {nome}… eu fugi da tribo. Se me acharem, eles me caçam.',
  },
  e19: {
    cenario: 'mata',
    hora: 'dia',
    quem: 'roger',
    quemPintado: true,
    fala: 'Essas árvores agora são da tribo, {nome}. Pegou fruta daqui, apanha.',
    objetos: ['arvore-frutas'],
  },
  e20: {
    cenario: 'acampamento',
    hora: 'tarde',
    quem: 'cacador',
    fala: 'Sem mim ninguém comia carne nessa ilha, {nome}. Eu mereço uma porção maior. Ou não?',
    objetos: ['fogueira'],
  },
  e21: {
    cenario: 'praia',
    hora: 'dia',
    quem: 'cadete',
    fala: 'Sentido! Vamos voltar às patentes da academia, {nome}. Com coronel, continência e tudo!',
    atores: [
      { id: 'sam', x: 196, y: -6, olhando: 'esquerda' },
      { id: 'eric', x: 212, y: -4, olhando: 'esquerda' },
    ],
  },
  e22: {
    cenario: 'mata',
    hora: 'tarde',
    quem: 'pequeno',
    fala: '{nome}, se a gente der comida pra fera, ela não vem pegar a gente… né?',
    objetos: ['oferenda'],
  },
  e23: {
    cenario: 'acampamento',
    hora: 'tarde',
    quem: 'ralph',
    fala: 'A maioria votou, {nome}. Vamos largar o fogo do morro e mudar tudo pra perto da mata.',
    atores: [
      { id: 'cadete', x: 190, y: -6, olhando: 'esquerda' },
      { id: 'sam', x: 208, y: -4, olhando: 'esquerda' },
    ],
    objetos: ['concha'],
  },
};

export const ENCENACAO_INICIAL: Encenacao = {
  cenario: 'praia',
  hora: 'tarde',
  quem: 'jogador',
  fala: 'Sem adultos por perto… alguém vai ter que decidir como a vida vai funcionar nesta ilha.',
  atores: [
    { id: 'ralph', x: 170, y: -6, olhando: 'esquerda' },
    { id: 'jack', x: 196, y: -4, olhando: 'esquerda' },
    { id: 'piggy', x: 218, y: -6, olhando: 'esquerda' },
  ],
  objetos: ['concha'],
};

export const ENCENACAO_FINAL: Encenacao = {
  cenario: 'incendio',
  hora: 'tarde',
  quem: 'oficial',
  fala: 'O que está acontecendo aqui? Vocês são cadetes… deviam saber se comportar melhor que isso.',
  atores: [
    { id: 'ralph', x: 70, y: -4, olhando: 'direita' },
    { id: 'jack', x: 204, y: -6, olhando: 'esquerda', pintado: true },
    { id: 'roger', x: 222, y: -4, olhando: 'esquerda', pintado: true },
  ],
};
