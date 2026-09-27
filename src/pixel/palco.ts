import {
  abrigo,
  aeronave,
  brilhoDoFogo,
  chamasNaMata,
  chuva,
  estrelas,
  fogueira,
  fundoFixo,
  H,
  moscas,
  ondas,
  PES,
  relampago,
  tingir,
  W,
  type CenarioId,
  type Hora,
} from './cenario';
import { ELENCO, type AtorId } from './elenco';
import { sprite, spriteCabecaPorco, type Aparencia } from './sprites';

export type ObjetoId =
  | 'fogueira'
  | 'fogueira-apagada'
  | 'concha'
  | 'cabeca'
  | 'caixa'
  | 'pedra-leis'
  | 'jangada'
  | 'fonte'
  | 'arvore-frutas'
  | 'destrocos'
  | 'oferenda'
  | 'abrigos-caidos'
  | 'oculos';

export type EfeitoId = 'chuva' | 'aeronave' | 'olhos' | 'marca-jogador';

export type Pose = 'normal' | 'deitado' | 'nadando' | 'dancando';

export type Emote = '!' | '?' | 'coracao' | 'raiva' | '...' | 'gota';

export interface AtorNaCena {
  id: AtorId;
  x: number;
  /** Profundidade: 0 = frente; negativo = mais ao fundo. */
  y?: number;
  olhando?: 'direita' | 'esquerda';
  pose?: Pose;
  pintado?: boolean;
  semOculos?: boolean;
}

export interface ConfigCena {
  cenario: CenarioId;
  hora: Hora;
  atores?: AtorNaCena[];
  objetos?: ObjetoId[];
  efeitos?: EfeitoId[];
}

interface Ator extends Required<Omit<AtorNaCena, 'semOculos'>> {
  aparencia: Aparencia;
  alvoX: number;
  aoChegar?: () => void;
  emote?: Emote;
  emoteAte: number;
  pulo: number;
}

const VELOCIDADE = 58;

export class Palco {
  private ctx: CanvasRenderingContext2D;
  private cena: ConfigCena = { cenario: 'praia', hora: 'dia' };
  private atores: Ator[] = [];
  private aparenciaJogador: Aparencia;
  private t = 0;
  private ultimo = 0;
  private quadro = 0;
  private reserva = 0;
  private fade = 0;
  private alvoFade = 0;
  private aoFade?: () => void;
  private inicioAeronave = 0;

  constructor(canvas: HTMLCanvasElement, aparenciaJogador: Aparencia) {
    canvas.width = W;
    canvas.height = H;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
    this.aparenciaJogador = aparenciaJogador;
    this.ultimo = performance.now();
    const passo = (agora: number) => {
      const dt = Math.min(0.1, (agora - this.ultimo) / 1000);
      this.ultimo = agora;
      this.atualizar(dt);
      this.desenhar();
    };
    const loop = (agora: number) => {
      passo(agora);
      this.quadro = requestAnimationFrame(loop);
    };
    this.quadro = requestAnimationFrame(loop);
    // se a aba estiver em segundo plano (sem requestAnimationFrame), a cena continua andando
    this.reserva = window.setInterval(() => {
      const agora = performance.now();
      if (agora - this.ultimo > 150) passo(agora);
    }, 100);
  }

  destruir() {
    cancelAnimationFrame(this.quadro);
    clearInterval(this.reserva);
  }

  definirJogador(aparencia: Aparencia) {
    this.aparenciaJogador = aparencia;
    const j = this.atores.find((a) => a.id === 'jogador');
    if (j) j.aparencia = { ...aparencia, pintura: aparencia.pintura || j.pintado };
  }

  montar(cena: ConfigCena) {
    this.cena = cena;
    this.inicioAeronave = this.t + 2.5;
    this.atores = (cena.atores ?? []).map((a) => this.criarAtor(a));
  }

  private criarAtor(a: AtorNaCena): Ator {
    const base = a.id === 'jogador' ? this.aparenciaJogador : ELENCO[a.id].aparencia;
    const aparencia: Aparencia = {
      ...base,
      pintura: base.pintura || a.pintado,
      oculos: base.oculos && !a.semOculos,
    };
    return {
      id: a.id,
      x: a.x,
      y: a.y ?? 0,
      olhando: a.olhando ?? (a.x < W / 2 ? 'direita' : 'esquerda'),
      pose: a.pose ?? 'normal',
      pintado: !!a.pintado,
      aparencia,
      alvoX: a.x,
      emoteAte: 0,
      pulo: 0,
    };
  }

  tem(id: AtorId) {
    return this.atores.some((a) => a.id === id);
  }

  /** Faz o ator entrar pela direita (ou esquerda) e andar até `ateX`. */
  entrar(dados: AtorNaCena, de: 'direita' | 'esquerda' = 'direita'): Promise<void> {
    const ator = this.criarAtor({ ...dados, x: de === 'direita' ? W + 14 : -14 });
    this.atores.push(ator);
    return this.andar(ator.id, dados.x, dados.olhando);
  }

  andar(id: AtorId, ateX: number, olharNoFim?: 'direita' | 'esquerda'): Promise<void> {
    const ator = this.atores.find((a) => a.id === id);
    if (!ator) return Promise.resolve();
    return new Promise((resolver) => {
      ator.alvoX = ateX;
      ator.olhando = ateX > ator.x ? 'direita' : 'esquerda';
      ator.aoChegar = () => {
        if (olharNoFim) ator.olhando = olharNoFim;
        resolver();
      };
      if (Math.abs(ator.x - ateX) < 0.5) ator.aoChegar();
    });
  }

  sair(id: AtorId, para: 'direita' | 'esquerda' = 'direita'): Promise<void> {
    return this.andar(id, para === 'direita' ? W + 16 : -16).then(() => {
      this.atores = this.atores.filter((a) => a.id !== id);
    });
  }

  emote(id: AtorId, emote: Emote, segundos = 1.8) {
    const ator = this.atores.find((a) => a.id === id);
    if (!ator) return;
    ator.emote = emote;
    ator.emoteAte = this.t + segundos;
    ator.pulo = 1;
  }

  escurecer(): Promise<void> {
    return this.animarFade(1);
  }

  clarear(): Promise<void> {
    return this.animarFade(0);
  }

  fadeImediato(valor: number) {
    this.fade = valor;
    this.alvoFade = valor;
  }

  private animarFade(alvo: number): Promise<void> {
    return new Promise((resolver) => {
      this.alvoFade = alvo;
      this.aoFade = resolver;
    });
  }

  private atualizar(dt: number) {
    this.t += dt;
    if (this.fade !== this.alvoFade) {
      const passo = dt * 2.6;
      this.fade = this.fade < this.alvoFade ? Math.min(this.alvoFade, this.fade + passo) : Math.max(this.alvoFade, this.fade - passo);
      if (this.fade === this.alvoFade && this.aoFade) {
        const f = this.aoFade;
        this.aoFade = undefined;
        f();
      }
    }
    for (const a of this.atores) {
      if (a.pulo > 0) a.pulo = Math.max(0, a.pulo - dt * 3);
      const d = a.alvoX - a.x;
      if (Math.abs(d) > 0.5) {
        a.x += Math.sign(d) * Math.min(Math.abs(d), VELOCIDADE * dt);
      } else if (a.aoChegar) {
        a.x = a.alvoX;
        const f = a.aoChegar;
        a.aoChegar = undefined;
        f();
      }
    }
  }

  private desenhar() {
    const ctx = this.ctx;
    const { cenario, hora } = this.cena;
    const objetos = this.cena.objetos ?? [];
    const efeitos = this.cena.efeitos ?? [];
    const t = this.t;

    ctx.drawImage(fundoFixo(cenario, hora), 0, 0);
    if (hora === 'noite') estrelas(ctx, t, cenario === 'morro' ? 90 : 60);
    if (efeitos.includes('aeronave')) aeronave(ctx, t, this.inicioAeronave);
    if (cenario === 'incendio') chamasNaMata(ctx, t);
    ondas(ctx, cenario, t);

    if (cenario === 'acampamento') {
      const caidos = objetos.includes('abrigos-caidos');
      abrigo(ctx, 24, 122, caidos);
      abrigo(ctx, 198, 120, caidos);
    }
    this.desenharObjetos(ctx, objetos, t, 'fundo');

    const ordenados = [...this.atores].sort((a, b) => a.y - b.y);
    for (const a of ordenados) this.desenharAtor(ctx, a);

    this.desenharObjetos(ctx, objetos, t, 'frente');

    tingir(ctx, hora);
    const fogoX = cenario === 'morro' ? 150 : cenario === 'praia' || cenario === 'acampamento' ? 62 : 128;
    if (objetos.includes('fogueira') && hora !== 'dia') brilhoDoFogo(ctx, fogoX, PES - 6, t);
    if (objetos.includes('fogueira')) fogueira(ctx, fogoX, PES + 2, t, true);
    if (objetos.includes('fogueira-apagada')) fogueira(ctx, fogoX, PES + 2, t, false);
    if (cenario === 'incendio') brilhoDoFogo(ctx, W / 2, 90, t, 150, 0.18);
    if (efeitos.includes('olhos') && Math.sin(t * 1.3) > -0.6) {
      ctx.fillStyle = '#e8402a';
      ctx.fillRect(160, 92, 2, 1);
      ctx.fillRect(170, 92, 2, 1);
    }
    if (hora === 'tempestade' || efeitos.includes('chuva')) {
      chuva(ctx, t);
      relampago(ctx, t);
    }

    for (const a of ordenados) this.desenharEmote(ctx, a);
    if (efeitos.includes('marca-jogador')) {
      const j = this.atores.find((a) => a.id === 'jogador');
      if (j && !(j.emote && this.t < j.emoteAte)) {
        const y = PES + j.y - 34 + Math.round(Math.sin(t * 5));
        ctx.fillStyle = '#f7d154';
        ctx.fillRect(Math.round(j.x) - 3, y, 7, 1);
        ctx.fillRect(Math.round(j.x) - 2, y + 1, 5, 1);
        ctx.fillRect(Math.round(j.x) - 1, y + 2, 3, 1);
        ctx.fillRect(Math.round(j.x), y + 3, 1, 1);
      }
    }

    if (this.fade > 0) {
      ctx.fillStyle = `rgba(8,6,4,${this.fade})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  private desenharObjetos(ctx: CanvasRenderingContext2D, objetos: ObjetoId[], t: number, camada: 'fundo' | 'frente') {
    const r = (x: number, y: number, w: number, h: number, cor: string) => {
      ctx.fillStyle = cor;
      ctx.fillRect(Math.round(x), Math.round(y), w, h);
    };
    for (const o of objetos) {
      if (camada === 'fundo') {
        if (o === 'arvore-frutas') {
          r(196, 70, 8, 60, '#5a3f25');
          r(176, 52, 48, 26, '#2f6b2f');
          r(182, 44, 36, 10, '#3f8a3a');
          [[184, 60], [196, 66], [210, 58], [202, 50], [190, 70], [214, 68]].forEach(([x, y]) => r(x, y, 4, 4, '#f39c34'));
        }
        if (o === 'pedra-leis') {
          r(160, 104, 34, 30, '#7d7468');
          r(162, 102, 30, 2, '#958b7c');
          for (let i = 0; i < 5; i++) r(166, 108 + i * 5, 14 + ((i * 7) % 9), 1, '#3b352e');
        }
        if (o === 'fonte') {
          r(160, 116, 40, 14, '#6f6557');
          r(166, 120, 28, 8, '#4f9cc4');
          r(170 + ((t * 8) % 18), 122, 3, 1, '#d8ecf2');
          r(176, 104, 3, 14, '#4f9cc4');
        }
        if (o === 'jangada') {
          for (let i = 0; i < 7; i++) r(172 + i * 5, 124, 4, 10, i % 2 ? '#8a6a3a' : '#6e5230');
          r(170, 126, 38, 2, '#4a3522');
          r(188, 100, 2, 24, '#6e5230');
          r(190, 102, 12, 14, '#e9e2cf');
        }
        if (o === 'cabeca') {
          ctx.drawImage(spriteCabecaPorco(), 176, PES - 22);
          moscas(ctx, 184, PES - 18, t);
        }
        if (o === 'destrocos') {
          const b = Math.sin(t * 1.5) * 1.5;
          r(30, 108 + b, 26, 6, '#c9ccd1');
          r(50, 100 + b, 6, 8, '#c9ccd1');
          r(34, 110 + b, 18, 1, '#9aa0a8');
          r(200, 124 - b, 14, 4, '#8a6a3a');
          r(222, 116 + b, 8, 5, '#e05a3a');
        }
      } else {
        if (o === 'concha') {
          r(72, PES - 2, 10, 5, '#f4e2c8');
          r(74, PES - 4, 7, 2, '#f4e2c8');
          r(80, PES - 1, 4, 3, '#e8b7a0');
          r(74, PES, 6, 1, '#c99f84');
        }
        if (o === 'caixa') {
          r(150, PES - 10, 18, 12, '#6b7f5a');
          r(150, PES - 10, 18, 2, '#56684a');
          r(157, PES - 6, 4, 3, '#e0d8b0');
        }
        if (o === 'oferenda') {
          r(196, PES - 2, 20, 4, '#6e5230');
          [[198, 'f39c34'], [204, 'c0392b'], [210, 'f7d154']].forEach(([x, c]) => r(x as number, PES - 6, 4, 4, '#' + c));
          r(214, PES - 5, 8, 3, '#7fa3b8');
        }
        if (o === 'oculos') {
          r(150, PES - 1, 4, 3, '#d8ecf2');
          r(155, PES - 1, 4, 3, '#d8ecf2');
          r(154, PES, 1, 1, '#1d1410');
        }
      }
    }
  }

  private desenharAtor(ctx: CanvasRenderingContext2D, a: Ator) {
    const andando = Math.abs(a.alvoX - a.x) > 0.5;
    const t = this.t;
    const passo = andando && Math.floor(t * 7 + a.x * 0.01) % 2 === 0;
    const img = sprite(a.aparencia, passo);
    const x = Math.round(a.x);
    let base = PES + a.y;
    let bob = 0;
    if (andando) bob = passo ? -1 : 0;
    else if (a.pose === 'dancando') bob = -Math.round(Math.abs(Math.sin(t * 8 + a.x)) * 4);
    else bob = Math.floor(t * 1.2 + a.x) % 2 === 0 ? 0 : -1;
    bob -= Math.round(Math.sin(a.pulo * Math.PI) * 4);
    const esquerda = a.pose === 'dancando' ? Math.floor(t * 3 + a.x) % 2 === 0 : a.olhando === 'esquerda';

    ctx.save();
    if (a.pose === 'deitado') {
      ctx.translate(x, base);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(img, -2, -img.width / 2 - 4);
      ctx.restore();
      return;
    }
    if (a.pose === 'nadando') {
      base = PES + a.y - 8 + Math.round(Math.sin(t * 2 + a.x) * 1.5);
      const alturaVisivel = 13;
      ctx.translate(x, 0);
      if (esquerda) ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, img.width, alturaVisivel, -img.width / 2, base - alturaVisivel, img.width, alturaVisivel);
      ctx.fillStyle = 'rgba(220,240,250,0.7)';
      ctx.fillRect(-img.width / 2 - 2, base - 1, img.width + 4, 1);
      ctx.restore();
      return;
    }
    // sombra
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(x - 6, base - 1, 12, 2);
    ctx.translate(x, 0);
    if (esquerda) ctx.scale(-1, 1);
    ctx.drawImage(img, -img.width / 2, base - img.height + bob);
    ctx.restore();
  }

  private desenharEmote(ctx: CanvasRenderingContext2D, a: Ator) {
    if (!a.emote || this.t > a.emoteAte) return;
    const img = sprite(a.aparencia);
    const topo = PES + a.y - (a.pose === 'nadando' ? 22 : img.height) - 14;
    const x = Math.round(a.x) - 6;
    const y = Math.round(topo + Math.sin(this.t * 6) * 1);
    const r = (dx: number, dy: number, w: number, h: number, cor: string) => {
      ctx.fillStyle = cor;
      ctx.fillRect(x + dx, y + dy, w, h);
    };
    r(1, 0, 11, 1, '#1d1410');
    r(0, 1, 13, 9, '#1d1410');
    r(1, 10, 11, 1, '#1d1410');
    r(1, 1, 11, 9, '#fbf6e8');
    r(4, 11, 3, 1, '#1d1410');
    r(5, 12, 1, 1, '#1d1410');
    switch (a.emote) {
      case '!':
        r(6, 2, 1, 5, '#c0392b');
        r(6, 8, 1, 1, '#c0392b');
        break;
      case '?':
        r(5, 2, 3, 1, '#2d5f8a');
        r(8, 3, 1, 2, '#2d5f8a');
        r(6, 5, 2, 1, '#2d5f8a');
        r(6, 6, 1, 1, '#2d5f8a');
        r(6, 8, 1, 1, '#2d5f8a');
        break;
      case 'coracao':
        r(3, 3, 2, 1, '#d6453a');
        r(8, 3, 2, 1, '#d6453a');
        r(2, 4, 9, 2, '#d6453a');
        r(3, 6, 7, 1, '#d6453a');
        r(4, 7, 5, 1, '#d6453a');
        r(6, 8, 1, 1, '#d6453a');
        break;
      case 'raiva':
        r(3, 2, 2, 2, '#c0392b');
        r(8, 2, 2, 2, '#c0392b');
        r(3, 7, 2, 2, '#c0392b');
        r(8, 7, 2, 2, '#c0392b');
        r(5, 4, 3, 3, '#c0392b');
        r(6, 5, 1, 1, '#fbf6e8');
        break;
      case '...':
        r(3, 5, 1, 1, '#1d1410');
        r(6, 5, 1, 1, '#1d1410');
        r(9, 5, 1, 1, '#1d1410');
        break;
      case 'gota':
        r(6, 2, 1, 1, '#4f9cc4');
        r(5, 3, 3, 2, '#4f9cc4');
        r(4, 5, 5, 3, '#4f9cc4');
        r(5, 8, 3, 1, '#4f9cc4');
        break;
    }
  }
}
