// Cenários em pixel art (256x144). A parte fixa vai para um canvas em cache;
// a parte animada (ondas, fogo, chuva, estrelas) é desenhada a cada quadro.

export const W = 256;
export const H = 144;
export const PES = 134;

export type CenarioId =
  | 'mar'
  | 'praia'
  | 'acampamento'
  | 'mata'
  | 'clareira'
  | 'morro'
  | 'caverna'
  | 'rocha'
  | 'incendio';

export type Hora = 'dia' | 'tarde' | 'noite' | 'tempestade';

type Ctx = CanvasRenderingContext2D;

function ret(ctx: Ctx, x: number, y: number, w: number, h: number, cor: string) {
  ctx.fillStyle = cor;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function aleatorioComSemente(semente: number) {
  let s = semente;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const CEUS: Record<Hora, string[]> = {
  dia: ['#6cb8dc', '#86c7e3', '#a2d6ea', '#bfe4ef'],
  tarde: ['#e0725a', '#f09a5f', '#f7bd73', '#fbd996'],
  noite: ['#0b1626', '#101f33', '#162a42', '#1d3550'],
  tempestade: ['#262a31', '#2f343c', '#383e47', '#434a54'],
};

function ceu(ctx: Ctx, hora: Hora, ate: number) {
  const cores = CEUS[hora];
  const faixa = ate / cores.length;
  cores.forEach((cor, i) => {
    ret(ctx, 0, i * faixa, W, faixa + 1, cor);
    // pontilhado entre faixas
    if (i > 0) {
      ctx.fillStyle = cores[i - 1];
      for (let x = (i % 2) * 2; x < W; x += 4) ctx.fillRect(x, Math.floor(i * faixa), 2, 1);
    }
  });
  if (hora === 'dia') {
    ret(ctx, 196, 14, 14, 14, '#fff3b0');
    ret(ctx, 194, 16, 18, 10, '#fff3b0');
    ret(ctx, 198, 12, 10, 18, '#fff3b0');
  }
  if (hora === 'tarde') {
    ret(ctx, 180, ate - 22, 22, 12, '#ffe08a');
    ret(ctx, 178, ate - 18, 26, 8, '#ffe08a');
  }
  if (hora === 'noite') {
    ret(ctx, 200, 14, 12, 12, '#f2ecd0');
    ret(ctx, 198, 16, 16, 8, '#f2ecd0');
    ret(ctx, 204, 14, 8, 8, CEUS.noite[0]);
  }
}

function nuvens(ctx: Ctx, hora: Hora) {
  const cor = hora === 'tempestade' ? '#1f2329' : hora === 'tarde' ? '#fbe2c0' : hora === 'noite' ? '#223a55' : '#eef7fb';
  const lista = [
    [24, 18, 30],
    [90, 30, 22],
    [150, 12, 26],
  ];
  for (const [x, y, w] of lista) {
    ret(ctx, x, y, w, 4, cor);
    ret(ctx, x + 4, y - 3, w - 10, 3, cor);
    ret(ctx, x + 8, y - 5, w / 3, 2, cor);
  }
}

function mar(ctx: Ctx, de: number, ate: number) {
  const cores = ['#2d7fa6', '#2a74a0', '#256794', '#205b86'];
  const faixa = (ate - de) / cores.length;
  cores.forEach((cor, i) => ret(ctx, 0, de + i * faixa, W, faixa + 1, cor));
}

function areia(ctx: Ctx, de: number, semente = 3) {
  ret(ctx, 0, de - 4, W, 4, '#c9b27a');
  ret(ctx, 0, de, W, H - de, '#e3cb8d');
  ret(ctx, 0, de + 12, W, H - de - 12, '#dcc283');
  const r = aleatorioComSemente(semente);
  for (let i = 0; i < 140; i++) ret(ctx, r() * W, de + r() * (H - de), 1, 1, r() > 0.5 ? '#c7ad6f' : '#efdca8');
}

function palmeira(ctx: Ctx, x: number, base: number, altura: number, lado: 1 | -1) {
  for (let i = 0; i < altura; i++) {
    const dx = Math.round(Math.sin((i / altura) * 1.4) * 6 * lado);
    ret(ctx, x + dx, base - i, 4, 1, i % 4 === 0 ? '#5b3f25' : '#7a5634');
  }
  const tx = x + Math.round(Math.sin(1.4) * 6 * lado) + 2;
  const ty = base - altura;
  const folha = (ang: number, comp: number) => {
    for (let i = 0; i < comp; i++) {
      const fx = tx + Math.cos(ang) * i;
      const fy = ty + Math.sin(ang) * i + (i * i) / (comp * 1.2);
      ret(ctx, fx, fy, 2, 2, i % 3 === 0 ? '#2f6b2f' : '#3f8a3a');
    }
  };
  [-2.9, -2.3, -1.6, -0.9, -0.3, 0.3].forEach((a, i) => folha(a, 14 + (i % 2) * 4));
  ret(ctx, tx - 2, ty - 1, 5, 4, '#5a3a1e');
}

function arvoreMata(ctx: Ctx, x: number, base: number, altura: number, largura: number, tom: number) {
  const verdes = [
    ['#1e3d22', '#27502b'],
    ['#2a5a2e', '#347038'],
    ['#3a7a3c', '#4a9147'],
  ][tom];
  ret(ctx, x + largura / 2 - 3, base - altura / 2, 6, altura / 2, tom === 0 ? '#2e2216' : '#4a3522');
  for (let i = 0; i < 5; i++) {
    const w = largura - i * (largura / 6);
    ret(ctx, x + (largura - w) / 2, base - altura + i * (altura / 9), w, altura / 7, i % 2 ? verdes[0] : verdes[1]);
  }
}

function mataDeFundo(ctx: Ctx, chao: number, fechada = true) {
  const r = aleatorioComSemente(7);
  if (fechada) {
    ret(ctx, 0, 30, W, chao - 30, '#15301b');
    for (let x = 0; x < W; x += 12) ret(ctx, x, 22 + ((x * 7) % 11), 14, 12, '#15301b');
  }
  for (let x = -20; x < W; x += 26) arvoreMata(ctx, x + r() * 10, chao, 70 + r() * 30, 44, 0);
  for (let x = -10; x < W; x += 34) arvoreMata(ctx, x + r() * 12, chao + 4, 56 + r() * 20, 36, 1);
  for (let x = 0; x < W; x += 9) {
    ret(ctx, x, chao - 6 - r() * 6, 10, 12, r() > 0.5 ? '#2f6b33' : '#3b7f3c');
  }
}

function chaoDeTerra(ctx: Ctx, de: number, clara = false) {
  ret(ctx, 0, de, W, H - de, clara ? '#8a7447' : '#5e4a2c');
  ret(ctx, 0, de, W, 3, clara ? '#6e8f3f' : '#3f6a31');
  const r = aleatorioComSemente(11);
  for (let i = 0; i < 90; i++) {
    const x = r() * W;
    const y = de + 4 + r() * (H - de - 4);
    ret(ctx, x, y, 2, 1, r() > 0.5 ? (clara ? '#9c8554' : '#4f3e24') : '#4d7a37');
  }
}

function chaoDePedra(ctx: Ctx, de: number) {
  ret(ctx, 0, de, W, H - de, '#857a6a');
  ret(ctx, 0, de, W, 2, '#9d9282');
  const r = aleatorioComSemente(5);
  for (let i = 0; i < 40; i++) {
    const x = r() * W;
    const y = de + 3 + r() * (H - de - 6);
    ret(ctx, x, y, 4 + r() * 6, 2, '#6f6557');
    ret(ctx, x, y - 1, 3, 1, '#a39888');
  }
}

export function abrigo(ctx: Ctx, x: number, base: number, caido = false) {
  if (caido) {
    for (let i = 0; i < 6; i++) ret(ctx, x + i * 5, base - 3 - (i % 2) * 2, 18, 2, i % 2 ? '#8a6a3a' : '#6e5230');
    ret(ctx, x + 4, base - 6, 22, 3, '#4f7f3a');
    return;
  }
  for (let i = 0; i < 22; i++) {
    ret(ctx, x + i, base - 22 + i, 30 - i, 1, i % 3 === 0 ? '#6e8f3f' : '#5a7a34');
  }
  ret(ctx, x, base - 24, 3, 24, '#6e5230');
  ret(ctx, x + 26, base - 24, 3, 24, '#6e5230');
  ret(ctx, x, base - 24, 30, 3, '#7a5a34');
}

function morroAoFundo(ctx: Ctx, horizonte: number) {
  ctx.fillStyle = '#3b6b4a';
  for (let x = 0; x < W; x++) {
    const h = 26 * Math.exp(-(((x - 70) / 40) ** 2)) + 14 * Math.exp(-(((x - 150) / 30) ** 2));
    ctx.fillRect(x, horizonte - h, 1, h);
  }
}

function desenharFixo(ctx: Ctx, cenario: CenarioId, hora: Hora) {
  switch (cenario) {
    case 'mar': {
      ceu(ctx, hora, 64);
      nuvens(ctx, hora);
      ctx.fillStyle = '#23402e';
      for (let x = 150; x < 236; x++) {
        const h = 12 * Math.sin(((x - 150) / 86) * Math.PI) + 2 * Math.sin(x / 3);
        ctx.fillRect(x, 64 - h, 1, h);
      }
      mar(ctx, 64, H);
      break;
    }
    case 'praia':
    case 'acampamento':
    case 'incendio': {
      ceu(ctx, hora, 72);
      nuvens(ctx, hora);
      if (cenario === 'incendio') {
        ret(ctx, 0, 0, W, 72, 'rgba(120,40,10,0.45)');
        mataDeFundo(ctx, 106, false);
        areia(ctx, 106);
        break;
      }
      morroAoFundo(ctx, 72);
      mar(ctx, 72, 104);
      areia(ctx, 108);
      break;
    }
    case 'mata':
    case 'clareira': {
      ceu(ctx, hora, 60);
      mataDeFundo(ctx, 112);
      chaoDeTerra(ctx, 112, cenario === 'clareira');
      break;
    }
    case 'morro': {
      ceu(ctx, hora, 96);
      nuvens(ctx, hora);
      mar(ctx, 96, 112);
      chaoDePedra(ctx, 112);
      ret(ctx, 0, 104, 60, 10, '#857a6a');
      ret(ctx, 210, 106, 46, 8, '#857a6a');
      break;
    }
    case 'caverna': {
      ceu(ctx, hora, 50);
      ret(ctx, 0, 30, W, 90, '#5b544b');
      const r = aleatorioComSemente(9);
      for (let i = 0; i < 60; i++) ret(ctx, r() * W, 30 + r() * 80, 8 + r() * 14, 3, r() > 0.5 ? '#4d473f' : '#6a6258');
      ctx.fillStyle = '#0c0a09';
      for (let y = 56; y < 118; y++) {
        const meia = 34 * Math.sqrt(Math.max(0, 1 - ((y - 118) / 62) ** 2));
        ctx.fillRect(170 - meia, y, meia * 2, 1);
      }
      chaoDePedra(ctx, 116);
      break;
    }
    case 'rocha': {
      ceu(ctx, hora, 80);
      nuvens(ctx, hora);
      mar(ctx, 80, 112);
      ctx.fillStyle = '#857a6a';
      for (let x = 0; x < W; x++) {
        const topo = 106 + Math.round(2 * Math.sin(x / 9));
        ctx.fillRect(x, topo, 1, H - topo);
      }
      chaoDePedra(ctx, 112);
      // a rocha alta da tribo, com a pedra no topo
      ret(ctx, 202, 60, 54, 84, '#6f675b');
      ret(ctx, 198, 68, 6, 76, '#5d564b');
      ret(ctx, 202, 60, 54, 2, '#958b7c');
      for (let y = 70; y < H; y += 9) ret(ctx, 206 + ((y * 5) % 20), y, 18, 1, '#5d564b');
      ret(ctx, 216, 44, 24, 16, '#8d8474');
      ret(ctx, 212, 48, 32, 12, '#8d8474');
      ret(ctx, 220, 44, 10, 3, '#a39888');
      break;
    }
  }
}

const cacheFixo = new Map<string, HTMLCanvasElement>();

export function fundoFixo(cenario: CenarioId, hora: Hora): HTMLCanvasElement {
  const chave = cenario + hora;
  const pronto = cacheFixo.get(chave);
  if (pronto) return pronto;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  desenharFixo(canvas.getContext('2d')!, cenario, hora);
  cacheFixo.set(chave, canvas);
  return canvas;
}

const cachePalmeiras = new Map<string, HTMLCanvasElement | null>();

/** Elementos fixos que ficam na frente do mar (palmeiras). */
export function frenteFixa(cenario: CenarioId): HTMLCanvasElement | null {
  if (cachePalmeiras.has(cenario)) return cachePalmeiras.get(cenario)!;
  let canvas: HTMLCanvasElement | null = null;
  if (cenario === 'praia' || cenario === 'acampamento') {
    canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    palmeira(ctx, 14, 118, 58, 1);
    palmeira(ctx, 226, 116, 52, -1);
  }
  cachePalmeiras.set(cenario, canvas);
  return canvas;
}

/** Faixa de água que tem ondas animadas. */
export function faixaDoMar(cenario: CenarioId): [number, number] | null {
  if (cenario === 'mar') return [64, H];
  if (cenario === 'praia' || cenario === 'acampamento') return [72, 104];
  if (cenario === 'morro') return [96, 112];
  if (cenario === 'rocha') return [80, 104];
  return null;
}

export function ondas(ctx: Ctx, cenario: CenarioId, t: number) {
  const faixa = faixaDoMar(cenario);
  if (!faixa) return;
  const [de, ate] = faixa;
  ctx.fillStyle = 'rgba(220,240,250,0.55)';
  for (let y = de + 3; y < ate; y += 6) {
    const desloc = (t * (8 + (y % 5)) + y * 13) % 40;
    for (let x = -40 + desloc; x < W; x += 40) ctx.fillRect(Math.round(x), y, 6 + (y % 3) * 2, 1);
  }
  if (cenario === 'praia' || cenario === 'acampamento') {
    const vai = Math.sin(t * 0.8) * 2;
    ret(ctx, 0, 104 + vai, W, 2, 'rgba(240,248,250,0.8)');
  }
}

export function fogueira(ctx: Ctx, x: number, base: number, t: number, acesa = true) {
  ret(ctx, x - 10, base - 3, 20, 3, '#5a3a1e');
  ret(ctx, x - 7, base - 5, 14, 2, '#7a5634');
  ret(ctx, x - 12, base - 1, 4, 2, '#6f6557');
  ret(ctx, x + 8, base - 1, 4, 2, '#6f6557');
  if (!acesa) {
    ret(ctx, x - 5, base - 7, 10, 2, '#3a3a3a');
    const fumo = (t * 6) % 30;
    ret(ctx, x - 1 + Math.sin(t) * 2, base - 10 - fumo, 2, 2, `rgba(150,150,150,${0.6 - fumo / 50})`);
    return;
  }
  const cores = ['#f7d154', '#f39c34', '#e0562b'];
  for (let i = 0; i < 9; i++) {
    const fase = t * 9 + i * 1.7;
    const h = 6 + Math.abs(Math.sin(fase)) * 10 - Math.abs(i - 4) * 1.2;
    const fx = x - 7 + i * 1.6;
    ret(ctx, fx, base - 5 - h, 2, h, cores[2]);
    ret(ctx, fx, base - 5 - h * 0.7, 2, h * 0.7, cores[1]);
    ret(ctx, fx, base - 5 - h * 0.35, 2, h * 0.35, cores[0]);
  }
  const faisca = (t * 20) % 24;
  ret(ctx, x + Math.sin(t * 3) * 6, base - 18 - faisca, 1, 1, '#ffd98a');
}

export function brilhoDoFogo(ctx: Ctx, x: number, y: number, t: number, raio = 60, forca = 0.45) {
  const r = raio + Math.sin(t * 7) * 3;
  const g = ctx.createRadialGradient(x, y, 2, x, y, r);
  g.addColorStop(0, `rgba(255,170,70,${forca})`);
  g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();
}

export function tingir(ctx: Ctx, hora: Hora) {
  const tons: Record<Hora, string | null> = {
    dia: null,
    tarde: 'rgba(255,130,60,0.14)',
    noite: 'rgba(8,16,44,0.55)',
    tempestade: 'rgba(30,34,44,0.42)',
  };
  const tom = tons[hora];
  if (!tom) return;
  ctx.fillStyle = tom;
  ctx.fillRect(0, 0, W, H);
}

export function estrelas(ctx: Ctx, t: number, ate: number) {
  const r = aleatorioComSemente(21);
  for (let i = 0; i < 40; i++) {
    const x = r() * W;
    const y = r() * ate;
    const brilho = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.5 + r()) + i));
    ctx.fillStyle = `rgba(255,250,230,${brilho})`;
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  }
}

export function chuva(ctx: Ctx, t: number) {
  ctx.fillStyle = 'rgba(190,205,230,0.4)';
  for (let i = 0; i < 70; i++) {
    const x = Math.round(((i * 53 + t * 70) % (W + 40)) - 20);
    const y = Math.round(((i * 97 + t * 240) % (H + 20)) - 10);
    ctx.fillRect(x, y, 1, 2);
    ctx.fillRect(x - 1, y + 2, 1, 2);
    ctx.fillRect(x - 2, y + 4, 1, 2);
  }
  ctx.fillStyle = 'rgba(210,225,240,0.5)';
  for (let i = 0; i < 14; i++) {
    if (Math.sin(t * 9 + i * 2.3) < 0.6) continue;
    ctx.fillRect((i * 71 + Math.floor(t * 3) * 37) % W, 118 + ((i * 13) % 22), 3, 1);
  }
}

export function relampago(ctx: Ctx, t: number) {
  const ciclo = t % 11;
  if (ciclo > 0.12 && ciclo < 0.22) {
    ctx.fillStyle = 'rgba(230,235,255,0.35)';
    ctx.fillRect(0, 0, W, H);
  }
}

export function chamasNaMata(ctx: Ctx, t: number) {
  const cores = ['#b8401f', '#e0562b', '#f39c34', '#f7d154'];
  for (let x = 0; x < W; x += 3) {
    const ruido = ((x * 37) % 17) / 17;
    const h = 12 + Math.abs(Math.sin(t * 4 + x * 0.37)) * 16 + ruido * 18;
    cores.forEach((cor, i) => {
      const hh = h * (1 - i * 0.24);
      ret(ctx, x, 106 - hh, 3, hh, cor);
    });
  }
  for (let i = 0; i < 16; i++) {
    const y = (58 - ((t * 9 + i * 17) % 64)) | 0;
    ctx.fillStyle = `rgba(50,45,45,${0.22 + (i % 3) * 0.08})`;
    ctx.fillRect(((i * 41 + t * 4) % W) | 0, y, 16 + (i % 4) * 4, 7);
  }
}

export function moscas(ctx: Ctx, cx: number, cy: number, t: number) {
  ctx.fillStyle = '#111';
  for (let i = 0; i < 7; i++) {
    const a = t * (2 + i * 0.4) + i;
    ctx.fillRect(Math.round(cx + Math.cos(a) * (6 + i * 1.5)), Math.round(cy + Math.sin(a * 1.3) * (4 + i)), 1, 1);
  }
}

export function aeronave(ctx: Ctx, t: number, inicio: number) {
  const p = (t - inicio) / 9;
  if (p < 0 || p > 1) return;
  const x = W + 20 - p * (W + 60);
  const y = 26 + Math.sin(p * 6) * 2;
  ret(ctx, x, y, 12, 3, '#3a3f45');
  ret(ctx, x + 10, y - 2, 4, 2, '#3a3f45');
  ret(ctx, x - 4, y - 3, 20, 1, '#555b62');
}
