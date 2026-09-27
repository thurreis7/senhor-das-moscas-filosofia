// Personagens em pixel art, desenhados a partir de "moldes" de texto.
// Cada caractere é um pixel: '.' = transparente; as outras letras viram cores da paleta.

export const LARGURA_SPRITE = 16;

const BASE = [
  '................',
  '................',
  '.....KKKKKK.....',
  '....KSSSSSSK....',
  '...KSSSSSSSSK...',
  '...KSSSSSSSSK...',
  '...KSSESSSESK...',
  '...KSSESSSESK...',
  '...KsSSSSSSsK...',
  '...KSSSSMMSSK...',
  '....KSSSSSSK....',
  '.....KKKKKK.....',
  '....KWWWTWWK....',
  '...KWWWWTWWWK...',
  '..KWKWWWTWWKWK..',
  '..KWKWWWWWWKWK..',
  '..KSKLLLLLLKSK..',
  '..KKKPPPPPPKKK..',
  '....KPPPPPPK....',
  '....KPPKKPPK....',
  '....KPPKKPPK....',
  '....KPPKKPPK....',
  '...KBBBKKBBBK...',
  '...KKKKKKKKKK...',
];

// Pernas no passo (linhas 18 a 23)
const PASSO = [
  '....KPPPPPPK....',
  '....KPPKKPPK....',
  '...KPPK..KPPK...',
  '...KPPK..KPPK...',
  '..KBBBK..KBBBK..',
  '..KKKKK..KKKKK..',
];

export type TipoCabelo = 'curto' | 'comprido' | 'cacheado' | 'crespo' | 'blackpower' | 'raspado' | 'trancas';

export const CABELOS: Record<TipoCabelo, { nome: string; molde: string[] }> = {
  curto: {
    nome: 'Curto',
    molde: [
      '................',
      '.....KKKKKK.....',
      '....KHHHHHHK....',
      '...KHHHHHHHHK...',
      '...KHHHHHHHHK...',
      '...KHhHHhHHHK...',
      '...KH......HK...',
      '...KH.......K...',
    ],
  },
  comprido: {
    nome: 'Liso comprido',
    molde: [
      '................',
      '.....KKKKKK.....',
      '....KHHHHHHK....',
      '...KHHHHHHHHK...',
      '..KHHHHHHHHHHK..',
      '..KHHhHHHHHHHK..',
      '..KHH......HHK..',
      '..KHH......HHK..',
      '..KHH......HHK..',
      '..KHh......hHK..',
      '..KHh.......hK..',
      '..KHH.......HK..',
      '..KK........KK..',
    ],
  },
  cacheado: {
    nome: 'Cacheado',
    molde: [
      '.....K.KK.K.....',
      '...KKHKHHKHKK...',
      '..KHHHHhHHHhHK..',
      '.KHhHHHHHHHHHHK.',
      '.KHHHhHHHhHHHHK.',
      '.KHhH.hH.hH.hHK.',
      '.KHHK......KHHK.',
      '.KHK........KHK.',
      '..K..........K..',
    ],
  },
  crespo: {
    nome: 'Crespo curto',
    molde: [
      '................',
      '......KKKK......',
      '....KKHhHhKK....',
      '...KHhHhHhHhK...',
      '...KhHhHhHhHK...',
      '...KHhHhHhHhK...',
      '...Kh.......K...',
    ],
  },
  blackpower: {
    nome: 'Black power',
    molde: [
      '...KKKKKKKKKK...',
      '..KHHHHhHHHHHK..',
      '.KHHhHHHHHHhHHK.',
      'KHHHHHHhHHHHHHHK',
      'KHhHHHHHHHHHhHHK',
      'KHHHHhHHHHhHHHHK',
      'KHHK.......KHHHK',
      'KHHK........KHHK',
      '.KHK........KHK.',
      '..KK........KK..',
    ],
  },
  raspado: {
    nome: 'Raspado',
    molde: [
      '................',
      '................',
      '.....KKKKKK.....',
      '....KhhhhhhK....',
      '...KhhHhhhHhK...',
    ],
  },
  trancas: {
    nome: 'Tranças',
    molde: [
      '................',
      '.....KKKKKK.....',
      '....KHHHHHHK....',
      '...KHHHHHHHHK...',
      '...KHHhHHHHHK...',
      '...KHHHHHhHHK...',
      '..KHK.......K...',
      '..KHK...........',
      '..KhK...........',
      '..KHK...........',
      '..KhK...........',
      '..KHK...........',
      '.KHHHK..........',
      '..KKK...........',
    ],
  },
};

const OCULOS = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '....KGEGKGEGK...',
  '....KGEGKGEGK...',
];

const PINTURA = [
  '................',
  '................',
  '................',
  '................',
  '................',
  '....XXXXXXXX....',
  '................',
  '................',
  '....RR....RR....',
  '....XX......X...',
];

const QUEPE = [
  '................',
  '.....KKKKKK.....',
  '....KCCCCCCK....',
  '...KCCCKCCCCK...',
  '..KKKKKKKKKKKKK.',
];

const ATADURA = [
  '................',
  '................',
  '................',
  '................',
  '...KCCCCCCCCK...',
  '...KCCCCRCCCK...',
];

export const TONS_DE_PELE = ['#f6d5b8', '#e8b98f', '#c98e62', '#a8683f', '#7a4a2a', '#4f2f1c'];
export const CORES_DE_CABELO = ['#1f1a17', '#3d2616', '#6b4226', '#a8431f', '#d8b25a', '#eadcae'];

export interface Aparencia {
  pele: string;
  cabelo: TipoCabelo;
  corCabelo: string;
  camisa?: string;
  calca?: string;
  oculos?: boolean;
  pintura?: boolean;
  quepe?: boolean;
  atadura?: boolean;
  /** 'pequeno' = criança menor; 'adulto' = mais alto. */
  porte?: 'normal' | 'pequeno' | 'adulto';
}

function escurecer(hex: string, fator: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (d: number) => Math.max(0, Math.min(255, Math.round(((n >> d) & 255) * fator)));
  return `rgb(${c(16)},${c(8)},${c(0)})`;
}

function paleta(a: Aparencia): Record<string, string> {
  const camisa = a.camisa ?? '#b59b6a';
  return {
    K: '#1d1410',
    S: a.pele,
    s: escurecer(a.pele, 0.88),
    E: '#1d1410',
    M: '#7a3b2e',
    H: a.corCabelo,
    h: escurecer(a.corCabelo, a.corCabelo === '#1f1a17' ? 1.6 : 0.78),
    W: camisa,
    w: escurecer(camisa, 0.8),
    T: '#3b3226',
    L: '#3b2a1c',
    P: a.calca ?? '#4a5236',
    B: '#2a1f18',
    G: '#d8ecf2',
    R: '#c0392b',
    X: '#f2efe6',
    C: '#f4f1ea',
  };
}

function sobrepor(linhas: string[], molde: string[]): string[] {
  return linhas.map((linha, y) => {
    const m = molde[y];
    if (!m) return linha;
    let r = '';
    for (let x = 0; x < linha.length; x++) r += m[x] && m[x] !== '.' ? m[x] : linha[x];
    return r;
  });
}

function montarLinhas(a: Aparencia, passo: boolean): string[] {
  let linhas = passo ? [...BASE.slice(0, 18), ...PASSO] : [...BASE];
  if (a.oculos) linhas = sobrepor(linhas, OCULOS);
  if (a.pintura) linhas = sobrepor(linhas, PINTURA);
  if (a.atadura) linhas = sobrepor(linhas, ATADURA);
  linhas = sobrepor(linhas, a.quepe ? QUEPE : CABELOS[a.cabelo].molde);
  if (a.porte === 'pequeno') {
    // cabeça do mesmo tamanho, corpo mais curto
    linhas = [...linhas.slice(0, 14), linhas[16], linhas[17], linhas[20], linhas[22], linhas[23]];
  } else if (a.porte === 'adulto') {
    linhas = [
      ...linhas.slice(0, 14),
      linhas[13],
      linhas[14],
      linhas[15],
      linhas[15],
      ...linhas.slice(16, 21),
      linhas[20],
      linhas[21],
      ...linhas.slice(21),
    ];
  }
  return linhas;
}

const cache = new Map<string, HTMLCanvasElement>();

/** Desenha o sprite num canvas pequeno (1 pixel = 1 pixel) e guarda em cache. */
export function sprite(a: Aparencia, passo = false): HTMLCanvasElement {
  const chave = JSON.stringify(a) + passo;
  const pronto = cache.get(chave);
  if (pronto) return pronto;
  const linhas = montarLinhas(a, passo);
  const cores = paleta(a);
  const canvas = document.createElement('canvas');
  canvas.width = LARGURA_SPRITE;
  canvas.height = linhas.length;
  const ctx = canvas.getContext('2d')!;
  linhas.forEach((linha, y) => {
    for (let x = 0; x < linha.length; x++) {
      const cor = cores[linha[x]];
      if (!cor) continue;
      ctx.fillStyle = cor;
      ctx.fillRect(x, y, 1, 1);
    }
  });
  cache.set(chave, canvas);
  return canvas;
}

// Cabeça de porco na estaca (O Senhor das Moscas)
const CABECA_PORCO = [
  '.....KK....KK...',
  '....KpK....KpK..',
  '....KppKKKKppK..',
  '...KpppppppppK..',
  '...KpEppppppEK..',
  '...KppppppppppK.',
  '..KppppKKKKpppK.',
  '..KpppKnnnnKppK.',
  '..KppKnKnnKnKpK.',
  '...KppKnnnnKpK..',
  '....KppKKKKpK...',
  '.....KKddKKK....',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '.......KdK......',
  '......KdddK.....',
];

export function spriteCabecaPorco(): HTMLCanvasElement {
  const chave = 'cabeca-porco';
  const pronto = cache.get(chave);
  if (pronto) return pronto;
  const cores: Record<string, string> = {
    K: '#1d1410',
    p: '#c98a86',
    E: '#1d1410',
    n: '#8e4f4b',
    d: '#6b4a2b',
  };
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = CABECA_PORCO.length;
  const ctx = canvas.getContext('2d')!;
  CABECA_PORCO.forEach((linha, y) => {
    for (let x = 0; x < linha.length; x++) {
      const cor = cores[linha[x]];
      if (!cor) continue;
      ctx.fillStyle = cor;
      ctx.fillRect(x, y, 1, 1);
    }
  });
  cache.set(chave, canvas);
  return canvas;
}
