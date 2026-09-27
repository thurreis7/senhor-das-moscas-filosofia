import { useEffect, useRef, useState } from 'react';
import { ambienteSom, som } from '../audio';
import type { Encenacao } from '../data/cenas';
import { ELENCO, type AtorId } from '../pixel/elenco';
import type { Emote, Palco } from '../pixel/palco';
import type { Aparencia } from '../pixel/sprites';
import { personalizar, type Perfil } from '../texto';
import { Retrato, useDigitacao } from './Pixel';

export interface OpcaoCena {
  id: number;
  texto: string;
  detalhe?: string;
  civ?: number;
}

type Fase = 'entrando' | 'narrando' | 'falando' | 'escolhendo' | 'consequencia' | 'saindo';

const LETRAS = ['A', 'B', 'C', 'D', 'E'];
const LADO_DA_TRIBO: (AtorId | 'cabeca')[] = ['jack', 'roger', 'cacador', 'cabeca'];

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

function somAmbiente(e: Encenacao) {
  if (e.hora === 'tempestade') return 'chuva';
  if (e.objetos?.includes('fogueira') || e.cenario === 'incendio') return 'fogo';
  if (e.cenario === 'mata' || e.cenario === 'clareira' || e.cenario === 'caverna') return 'mata';
  return 'mar';
}

export function Cena({
  palco,
  perfil,
  aparencia,
  encenacao,
  narracao,
  opcoes,
  consequencia,
  aoTerminar,
  jogadorPintado = false,
  marcarJogador = false,
  rotuloContinuar = 'Continuar',
  titulo,
  etiqueta,
}: {
  palco: Palco;
  perfil: Perfil;
  aparencia: Aparencia;
  encenacao: Encenacao;
  narracao: string;
  opcoes: OpcaoCena[];
  consequencia: (id: number) => string;
  aoTerminar: (id: number) => void;
  jogadorPintado?: boolean;
  marcarJogador?: boolean;
  rotuloContinuar?: string;
  titulo?: string;
  etiqueta?: { texto: string; tipo: string };
}) {
  const [fase, setFase] = useState<Fase>('entrando');
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const entrou = useRef(false);
  const painelRef = useRef<HTMLDivElement>(null);
  const quem = encenacao.quem;

  const falante =
    quem === 'cabeca'
      ? { nome: 'O Senhor das Moscas', aparencia: undefined }
      : quem === 'jogador'
        ? { nome: perfil.nome || 'Você', aparencia: { ...aparencia, pintura: jogadorPintado } }
        : {
            nome: ELENCO[quem].nome,
            aparencia: {
              ...ELENCO[quem].aparencia,
              pintura: ELENCO[quem].aparencia.pintura || encenacao.quemPintado,
              oculos: ELENCO[quem].aparencia.oculos && !encenacao.quemSemOculos,
            },
          };

  const textoNarracao = personalizar(narracao, perfil);
  const textoFala = personalizar(encenacao.fala, perfil);
  const textoConsequencia = escolhida !== null ? personalizar(consequencia(escolhida), perfil) : '';

  const narr = useDigitacao(textoNarracao, fase === 'narrando', false);
  const fala = useDigitacao(textoFala, fase === 'falando', 'fala');
  const cons = useDigitacao(textoConsequencia, fase === 'consequencia', false);

  useEffect(() => {
    let cancelado = false;
    palco.fadeImediato(1);
    palco.montar({
      cenario: encenacao.cenario,
      hora: encenacao.hora,
      objetos: encenacao.objetos,
      efeitos: [...(encenacao.efeitos ?? []), ...(marcarJogador ? (['marca-jogador'] as const) : [])],
      atores: [
        { id: 'jogador', x: 100, olhando: 'direita', pose: encenacao.poseJogador, pintado: jogadorPintado },
        ...(encenacao.atores ?? []),
      ],
    });
    ambienteSom(somAmbiente(encenacao));
    (async () => {
      await palco.clarear();
      if (cancelado) return;
      if (quem !== 'jogador' && quem !== 'cabeca' && !palco.tem(quem)) {
        entrou.current = true;
        await palco.entrar({
          id: quem,
          x: 148,
          olhando: 'esquerda',
          pintado: encenacao.quemPintado,
          semOculos: encenacao.quemSemOculos,
          pose: encenacao.poseJogador === 'nadando' ? 'nadando' : undefined,
        });
      }
      if (quem === 'jogador') palco.emote('jogador', '...', 2);
      if (quem === 'cabeca') palco.emote('jogador', '!', 1.5);
      if (!cancelado) setFase('narrando');
    })();
    return () => {
      cancelado = true;
    };
    // cada Cena monta o palco uma vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fase === 'narrando' && narr.completo) {
      const id = setTimeout(() => setFase('falando'), 350);
      return () => clearTimeout(id);
    }
    if (fase === 'falando' && fala.completo) {
      const id = setTimeout(() => setFase('escolhendo'), 200);
      return () => clearTimeout(id);
    }
  }, [fase, narr.completo, fala.completo]);

  useEffect(() => {
    if (fase === 'escolhendo' || fase === 'consequencia') {
      const alvo = painelRef.current?.querySelector(fase === 'escolhendo' ? '.opcoes' : '.consequencia');
      alvo?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [fase, cons.completo]);

  function escolher(id: number) {
    if (fase !== 'escolhendo') return;
    setEscolhida(id);
    setFase('consequencia');
    const civ = opcoes.find((o) => o.id === id)?.civ ?? 0;
    const alvo: AtorId = quem === 'cabeca' ? 'jogador' : quem;
    const lado = LADO_DA_TRIBO.includes(quem) ? -1 : 1;
    const reacao = civ * lado;
    const emote: Emote = reacao > 0 ? 'coracao' : reacao < 0 ? 'raiva' : '...';
    palco.emote(alvo, quem === 'cabeca' || quem === 'jogador' ? (civ > 0 ? '!' : civ < 0 ? 'gota' : '...') : emote, 2.4);
    if (civ > 0) som.bom();
    else if (civ < 0) som.ruim();
    else som.neutro();
  }

  async function continuar() {
    if (fase !== 'consequencia' || escolhida === null) return;
    som.clique();
    setFase('saindo');
    if (entrou.current && quem !== 'jogador' && quem !== 'cabeca') {
      void palco.sair(quem);
      await esperar(700);
    }
    await palco.escurecer();
    aoTerminar(escolhida);
  }

  function avancarTexto() {
    if (fase === 'narrando' && !narr.completo) narr.completar();
    else if (fase === 'narrando') setFase('falando');
    else if (fase === 'falando' && !fala.completo) fala.completar();
    else if (fase === 'falando') setFase('escolhendo');
    else if (fase === 'consequencia' && !cons.completo) cons.completar();
  }

  const refAvancar = useRef(avancarTexto);
  refAvancar.current = avancarTexto;
  const refContinuar = useRef(continuar);
  refContinuar.current = continuar;
  const refEscolher = useRef(escolher);
  refEscolher.current = escolher;

  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (fase === 'consequencia' && cons.completo) void refContinuar.current();
        else refAvancar.current();
        return;
      }
      if (fase === 'escolhendo' && e.key.length === 1) {
        let pos = '12345'.indexOf(e.key);
        if (pos < 0) pos = 'abcde'.indexOf(e.key.toLowerCase());
        if (pos >= 0 && opcoes[pos]) refEscolher.current(opcoes[pos].id);
      }
    }
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [fase, cons.completo, opcoes]);

  const mostrarFala = fase !== 'entrando' && fase !== 'narrando';
  const mostrarOpcoes = fase === 'escolhendo' || fase === 'consequencia' || fase === 'saindo';

  return (
    <>
      <div className="painel painel-texto" onClick={avancarTexto}>
        {fase === 'entrando' ? (
          <p className="narracao aguardando">…</p>
        ) : (
          <p className="narracao">{fase === 'narrando' ? narr.mostrado : textoNarracao}</p>
        )}
        {mostrarFala && (
          <div className="fala">
            <Retrato aparencia={falante.aparencia} cabeca={quem === 'cabeca'} />
            <div>
              <p className="falante">{falante.nome}</p>
              <p className="fala-texto">“{fase === 'falando' ? fala.mostrado : textoFala}”</p>
            </div>
          </div>
        )}
        {(fase === 'narrando' || fase === 'falando') && <p className="dica">clique ou Enter para avançar</p>}
      </div>

      <div className="painel painel-opcoes" onClick={avancarTexto} ref={painelRef}>
        {titulo && (
          <div className="cabecalho-opcoes">
            {etiqueta && <span className={`etiqueta ${etiqueta.tipo}`}>{etiqueta.texto}</span>}
            <h2>{titulo}</h2>
          </div>
        )}
        {!mostrarOpcoes && <p className="espera">Leia a cena ao lado…</p>}
        {mostrarOpcoes && (
          <div className="opcoes" role="group" aria-label="Escolhas">
            {opcoes.map((o, pos) => {
              const marcada = escolhida === o.id;
              if (escolhida !== null && !marcada) return null;
              return (
                <button
                  key={o.id}
                  className={`opcao ${marcada ? 'marcada' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    escolher(o.id);
                  }}
                  disabled={fase !== 'escolhendo' && !marcada}
                  aria-pressed={marcada}
                >
                  <span className="letra">{LETRAS[pos]}</span>
                  <span className="opcao-corpo">
                    <span className="opcao-texto">{personalizar(o.texto, perfil)}</span>
                    {o.detalhe && <span className="opcao-detalhe">{o.detalhe}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {(fase === 'consequencia' || fase === 'saindo') && (
          <div className="consequencia" aria-live="polite">
            <p>{fase === 'consequencia' ? cons.mostrado : textoConsequencia}</p>
            {cons.completo && (
              <button
                className="botao principal"
                onClick={(e) => {
                  e.stopPropagation();
                  void continuar();
                }}
                disabled={fase === 'saindo'}
                autoFocus
              >
                {rotuloContinuar} ▶
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
