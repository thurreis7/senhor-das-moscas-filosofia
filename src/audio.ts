// Efeitos sonoros gerados na hora pelo navegador (Web Audio), sem arquivos.

const CHAVE_MUDO = 'senhor-das-moscas:mudo';

let contexto: AudioContext | null = null;
let volumeGeral: GainNode | null = null;
let ambiente: { parar: () => void; tipo: string } | null = null;
let mudo = (() => {
  try {
    return localStorage.getItem(CHAVE_MUDO) === '1';
  } catch {
    return false;
  }
})();

function ctx(): AudioContext | null {
  if (typeof window === 'undefined' || !window.AudioContext) return null;
  if (!contexto) {
    contexto = new AudioContext();
    volumeGeral = contexto.createGain();
    volumeGeral.gain.value = mudo ? 0 : 0.5;
    volumeGeral.connect(contexto.destination);
  }
  if (contexto.state === 'suspended') void contexto.resume();
  return contexto;
}

export function estaMudo() {
  return mudo;
}

export function alternarMudo(): boolean {
  mudo = !mudo;
  try {
    localStorage.setItem(CHAVE_MUDO, mudo ? '1' : '0');
  } catch {
    // ignora
  }
  if (volumeGeral && contexto) volumeGeral.gain.setTargetAtTime(mudo ? 0 : 0.5, contexto.currentTime, 0.05);
  return mudo;
}

function tom(freq: number, dur: number, tipo: OscillatorType = 'square', volume = 0.08, deslize?: number) {
  const c = ctx();
  if (!c || !volumeGeral) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, c.currentTime);
  if (deslize) o.frequency.exponentialRampToValueAtTime(deslize, c.currentTime + dur);
  g.gain.setValueAtTime(volume, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(volumeGeral);
  o.start();
  o.stop(c.currentTime + dur + 0.02);
}

function ruido(c: AudioContext, segundos: number): AudioBufferSourceNode {
  const buffer = c.createBuffer(1, c.sampleRate * segundos, c.sampleRate);
  const dados = buffer.getChannelData(0);
  for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1;
  const fonte = c.createBufferSource();
  fonte.buffer = buffer;
  return fonte;
}

export const som = {
  blip(grave = false) {
    tom(grave ? 180 + Math.random() * 30 : 420 + Math.random() * 80, 0.04, 'square', 0.035);
  },
  clique() {
    tom(660, 0.06, 'square', 0.05, 880);
  },
  escolha() {
    tom(520, 0.08, 'square', 0.06);
    setTimeout(() => tom(780, 0.12, 'square', 0.06), 70);
  },
  bom() {
    tom(523, 0.1, 'triangle', 0.1);
    setTimeout(() => tom(659, 0.1, 'triangle', 0.1), 90);
    setTimeout(() => tom(784, 0.16, 'triangle', 0.1), 180);
  },
  ruim() {
    tom(220, 0.18, 'sawtooth', 0.06, 110);
  },
  neutro() {
    tom(440, 0.12, 'triangle', 0.08, 392);
  },
  concha() {
    tom(196, 1.2, 'sine', 0.18, 233);
    tom(392, 1.2, 'sine', 0.05, 466);
  },
  passo() {
    tom(90, 0.03, 'triangle', 0.04);
  },
};

/** Som ambiente contínuo: ondas do mar, fogo ou chuva. */
export function ambienteSom(tipo: 'mar' | 'mata' | 'chuva' | 'fogo' | null) {
  if (ambiente?.tipo === tipo) return;
  ambiente?.parar();
  ambiente = null;
  const c = ctx();
  if (!c || !volumeGeral || !tipo) return;
  const fonte = ruido(c, 4);
  fonte.loop = true;
  const filtro = c.createBiquadFilter();
  const g = c.createGain();
  const lfo = c.createOscillator();
  const lfoGanho = c.createGain();
  if (tipo === 'mar') {
    filtro.type = 'lowpass';
    filtro.frequency.value = 500;
    g.gain.value = 0.05;
    lfo.frequency.value = 0.12;
    lfoGanho.gain.value = 0.04;
  } else if (tipo === 'chuva') {
    filtro.type = 'highpass';
    filtro.frequency.value = 1800;
    g.gain.value = 0.04;
    lfo.frequency.value = 0.3;
    lfoGanho.gain.value = 0.01;
  } else if (tipo === 'fogo') {
    filtro.type = 'bandpass';
    filtro.frequency.value = 900;
    g.gain.value = 0.03;
    lfo.frequency.value = 7;
    lfoGanho.gain.value = 0.025;
  } else {
    filtro.type = 'bandpass';
    filtro.frequency.value = 3000;
    g.gain.value = 0.012;
    lfo.frequency.value = 0.5;
    lfoGanho.gain.value = 0.008;
  }
  lfo.connect(lfoGanho).connect(g.gain);
  fonte.connect(filtro).connect(g).connect(volumeGeral);
  fonte.start();
  lfo.start();
  ambiente = {
    tipo,
    parar: () => {
      g.gain.setTargetAtTime(0, c.currentTime, 0.3);
      setTimeout(() => {
        fonte.stop();
        lfo.stop();
      }, 1200);
    },
  };
}
