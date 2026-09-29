import { useEffect, useRef, useState, type ReactNode } from 'react';
import { alternarMudo, estaMudo, som } from '../audio';
import { Palco } from '../pixel/palco';
import { sprite, spriteCabecaPorco, type Aparencia } from '../pixel/sprites';

/** Canvas do palco. O `Palco` é criado uma vez e entregue por `aoCriar`. */
export function PalcoCanvas({
  aparencia,
  aoCriar,
  children,
  rotulo,
}: {
  aparencia: Aparencia;
  aoCriar: (palco: Palco) => void;
  children?: ReactNode;
  rotulo?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palcoRef = useRef<Palco | null>(null);

  useEffect(() => {
    const palco = new Palco(canvasRef.current!, aparencia);
    palcoRef.current = palco;
    aoCriar(palco);
    return () => palco.destruir();
    // o palco vive enquanto o componente existir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    palcoRef.current?.definirJogador(aparencia);
  }, [aparencia]);

  return (
    <div className="palco">
      <canvas ref={canvasRef} role="img" aria-label={rotulo ?? 'Cena do jogo em pixel art'} />
      {children}
      <BotaoSom />
    </div>
  );
}

/** Rosto do personagem (recorte da cabeça do sprite). */
export function Retrato({ aparencia, cabeca, tamanho = 64 }: { aparencia?: Aparencia; cabeca?: boolean; tamanho?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, c.width, c.height);
    if (cabeca) ctx.drawImage(spriteCabecaPorco(), 0, 0, 16, 13, 0, 1, 16, 13);
    else if (aparencia) ctx.drawImage(sprite(aparencia), 0, 0, 16, 14, 0, 0, 16, 14);
  }, [aparencia, cabeca]);
  return <canvas ref={ref} width={16} height={14} className="retrato" style={{ width: tamanho, height: (tamanho * 14) / 16 }} />;
}

/** Corpo inteiro, grande (criador de personagem e resultado). */
export function Boneco({ aparencia, escala = 8 }: { aparencia: Aparencia; escala?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [passo, setPasso] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPasso((p) => !p), 600);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(sprite(aparencia), 0, passo ? 1 : 0);
  }, [aparencia, passo]);
  return <canvas ref={ref} width={16} height={25} className="boneco" style={{ width: 16 * escala, height: 25 * escala }} />;
}

/** Texto que aparece letra por letra. Clique ou Enter mostra tudo de uma vez. */
export function useDigitacao(texto: string, ativo: boolean, comSom: 'fala' | 'narracao' | false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
  }, [texto]);
  useEffect(() => {
    if (!ativo || n >= texto.length) return;
    const id = setTimeout(() => {
      setN((v) => Math.min(texto.length, v + 1));
      if (comSom && n % 3 === 0 && texto[n] !== ' ') som.blip(comSom === 'narracao');
    }, 38);
    return () => clearTimeout(id);
  }, [ativo, n, texto, comSom]);
  return {
    mostrado: texto.slice(0, n),
    completo: n >= texto.length,
    completar: () => setN(texto.length),
  };
}

export function BotaoSom({ fixo = false }: { fixo?: boolean }) {
  const [mudo, setMudo] = useState(estaMudo());
  return (
    <button
      className={`botao-mudo ${fixo ? 'fixo' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setMudo(alternarMudo());
      }}
      aria-label={mudo ? 'Ligar som' : 'Desligar som'}
      title={mudo ? 'Ligar som' : 'Desligar som'}
    >
      {mudo ? '♪̸' : '♪'}
    </button>
  );
}
