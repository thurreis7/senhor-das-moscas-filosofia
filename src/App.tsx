import { useEffect, useMemo, useState } from 'react';
import { gerarImagemResultado } from './imagem';
import { ambienteSom, som } from './audio';
import { Cena } from './components/Cena';
import { Boneco, BotaoSom, PalcoCanvas, Retrato, useDigitacao } from './components/Pixel';
import { ENCENACAO_FINAL, ENCENACAO_INICIAL, ENCENACOES } from './data/cenas';
import { OPCOES_INICIAIS, type ContratualistaId } from './data/finais';
import { GRUPO_POR_ID, PENSADOR_POR_ID } from './data/pensadores';
import { SITUACAO_POR_ID } from './data/situacoes';
import {
  calcularResultado,
  codificar,
  decodificar,
  montarPartida,
  ordemDasOpcoes,
  type Escolha,
} from './jogo';
import type { Palco } from './pixel/palco';
import { CABELOS, CORES_DE_CABELO, TONS_DE_PELE, type Aparencia, type TipoCabelo } from './pixel/sprites';
import { personalizar, type Genero, type Perfil } from './texto';

type Tela = 'inicio' | 'criador' | 'escolha' | 'jogo' | 'final' | 'resultado' | 'creditos';

interface Jogador {
  perfil: Perfil;
  aparencia: Aparencia;
}

interface Partida {
  contratualista: ContratualistaId;
  ordem: string[];
  ordensOpcoes: Record<string, number[]>;
  escolhas: Escolha[];
}

interface Salvo {
  jogador: Jogador;
  partida: Partida | null;
}

const CHAVE_SALVAMENTO = 'senhor-das-moscas:v2';

const INTEGRANTES = [
  'Arthur Hideo Ichiyama de Faria Reis',
  'Igor de Souza Gomes',
  'Pedro Henrique Viana dos Reis Santos',
  'Petrus Prazeres Dalbosco',
  'Gustavo Ferreira Figueiredo',
  'Pedro Henrique da Silva Sales',
  'Matheus Fortes Sobrinho',
].sort((a, b) => a.localeCompare(b, 'pt-BR'));

const JOGADOR_PADRAO: Jogador = {
  perfil: { nome: '', genero: 'menino' },
  aparencia: { pele: TONS_DE_PELE[2], cabelo: 'curto', corCabelo: CORES_DE_CABELO[1] },
};

function carregar(): Salvo | null {
  try {
    const texto = localStorage.getItem(CHAVE_SALVAMENTO);
    if (!texto) return null;
    const salvo = JSON.parse(texto) as Salvo;
    if (salvo.partida && !salvo.partida.ordem.every((id) => SITUACAO_POR_ID[id])) salvo.partida = null;
    return salvo;
  } catch {
    return null;
  }
}

function salvar(salvo: Salvo) {
  try {
    localStorage.setItem(CHAVE_SALVAMENTO, JSON.stringify(salvo));
  } catch {
    // sem armazenamento: o jogo funciona, só não guarda o progresso
  }
}

// Link de resultado: #r=<escolhas>&j=<nome~g~pele~cabelo~cor>
function codificarJogador(j: Jogador): string {
  return [
    j.perfil.nome,
    j.perfil.genero === 'menina' ? 'a' : 'o',
    TONS_DE_PELE.indexOf(j.aparencia.pele),
    j.aparencia.cabelo,
    CORES_DE_CABELO.indexOf(j.aparencia.corCabelo),
  ].join('~');
}

function lerLinkCompartilhado(): { partida: { contratualista: ContratualistaId; escolhas: Escolha[] }; jogador: Jogador } | null {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const r = params.get('r');
  if (!r) return null;
  const partida = decodificar(r);
  if (!partida) return null;
  const [nome = '', g, pele, cabelo, cor] = (params.get('j') ?? '').split('~');
  return {
    partida,
    jogador: {
      perfil: { nome, genero: g === 'a' ? 'menina' : 'menino' },
      aparencia: {
        pele: TONS_DE_PELE[Number(pele)] ?? TONS_DE_PELE[2],
        cabelo: cabelo in CABELOS ? (cabelo as TipoCabelo) : 'curto',
        corCabelo: CORES_DE_CABELO[Number(cor)] ?? CORES_DE_CABELO[1],
      },
    },
  };
}

function jogadorPintado(escolhas: Escolha[]): boolean {
  return escolhas.some((e) => e.situacaoId === 'f09' && e.opcao === 1);
}

export default function App() {
  const compartilhado = useMemo(lerLinkCompartilhado, []);
  const salvoInicial = useMemo(() => (compartilhado ? null : carregar()), [compartilhado]);
  const [tela, setTela] = useState<Tela>(compartilhado ? 'resultado' : 'inicio');
  const [jogador, setJogador] = useState<Jogador>(salvoInicial?.jogador ?? JOGADOR_PADRAO);
  const [partida, setPartida] = useState<Partida | null>(salvoInicial?.partida ?? null);
  const [visitante, setVisitante] = useState(compartilhado);

  useEffect(() => {
    if (!visitante) salvar({ jogador, partida });
  }, [jogador, partida, visitante]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (tela === 'resultado' || tela === 'creditos' || tela === 'criador') ambienteSom(null);
  }, [tela]);

  function sairDoLinkCompartilhado() {
    if (visitante) {
      history.replaceState(null, '', window.location.pathname);
      setVisitante(null);
    }
  }

  const emAndamento = partida && partida.escolhas.length < partida.ordem.length;
  const terminada = partida && partida.escolhas.length === partida.ordem.length;

  return (
    <div className="app">
      {(tela === 'criador' || tela === 'resultado' || tela === 'creditos') && <BotaoSom fixo />}

      {tela === 'inicio' && (
        <TelaInicio
          aparencia={jogador.aparencia}
          continuar={emAndamento ? () => setTela('jogo') : terminada ? () => setTela('resultado') : undefined}
          rotuloContinuar={emAndamento ? 'Continuar partida' : 'Ver meu último resultado'}
          comecar={() => {
            som.clique();
            setTela('criador');
          }}
          creditos={() => setTela('creditos')}
        />
      )}

      {tela === 'criador' && (
        <TelaCriador
          jogador={jogador}
          mudar={setJogador}
          voltar={() => setTela('inicio')}
          pronto={() => {
            setPartida(null);
            setTela('escolha');
          }}
        />
      )}

      {tela === 'escolha' && (
        <TelaEscolha
          jogador={jogador}
          escolher={(contratualista) => {
            const ordem = montarPartida();
            setPartida({
              contratualista,
              ordem,
              ordensOpcoes: Object.fromEntries(ordem.map((id) => [id, ordemDasOpcoes()])),
              escolhas: [],
            });
            setTela('jogo');
          }}
        />
      )}

      {tela === 'jogo' && partida && emAndamento && (
        <TelaJogo
          jogador={jogador}
          partida={partida}
          escolher={(escolha) => {
            const escolhas = [...partida.escolhas, escolha];
            setPartida({ ...partida, escolhas });
            if (escolhas.length === partida.ordem.length) setTela('final');
          }}
          sair={() => {
            ambienteSom(null);
            setTela('inicio');
          }}
        />
      )}

      {tela === 'final' && partida && (
        <TelaFinal jogador={jogador} partida={partida} seguir={() => setTela('resultado')} />
      )}

      {tela === 'resultado' && (visitante || terminada) && (
        <TelaResultado
          jogador={visitante ? visitante.jogador : jogador}
          contratualista={(visitante ? visitante.partida : partida)!.contratualista}
          escolhas={(visitante ? visitante.partida : partida)!.escolhas}
          compartilhado={!!visitante}
          jogarDeNovo={() => {
            sairDoLinkCompartilhado();
            setPartida(null);
            setTela(visitante ? 'inicio' : 'escolha');
          }}
          inicio={() => {
            sairDoLinkCompartilhado();
            setTela('inicio');
          }}
          creditos={() => setTela('creditos')}
        />
      )}

      {tela === 'creditos' && (
        <TelaCreditos
          voltar={() => {
            sairDoLinkCompartilhado();
            setTela('inicio');
          }}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Início

function TelaInicio(props: {
  aparencia: Aparencia;
  continuar?: () => void;
  rotuloContinuar: string;
  comecar: () => void;
  creditos: () => void;
}) {
  function montar(palco: Palco) {
    palco.montar({
      cenario: 'praia',
      hora: 'tarde',
      objetos: ['concha'],
      atores: [
        { id: 'ralph', x: 60, olhando: 'direita' },
        { id: 'piggy', x: 40, y: -4, olhando: 'direita' },
        { id: 'simon', x: 190, y: -6, olhando: 'esquerda' },
      ],
    });
    palco.fadeImediato(1);
    void palco.clarear();
    const passear = async () => {
      await palco.entrar({ id: 'jack', x: 150, olhando: 'esquerda' });
      palco.emote('ralph', '!', 1.5);
      await new Promise((r) => setTimeout(r, 2500));
      await palco.sair('jack');
      setTimeout(passear, 2500);
    };
    setTimeout(passear, 1200);
  }
  return (
    <main className="tela tela-inicio">
      <PalcoCanvas aparencia={props.aparencia} aoCriar={montar} rotulo="Praia da ilha ao entardecer">
        <div className="titulo-sobre-palco">
          <p className="sobretitulo">Trabalho de Filosofia · Turma 305</p>
          <h1>
            O Senhor
            <br />
            das Moscas
          </h1>
          <p className="subtitulo">Edição Filosófica</p>
        </div>
      </PalcoCanvas>
      <div className="painel">
        <p>
          Um avião com cadetes de uma academia militar cai no mar. Os sobreviventes chegam a uma ilha
          deserta — sem adultos, sem regras, sem ninguém para dizer o que é certo.
        </p>
        <p>
          Crie seu personagem, viva as situações da ilha e descubra com quais <strong>filósofos, sociólogos e
          economistas</strong> você mais se parece.
        </p>
        <div className="acoes">
          <button className="botao principal" onClick={props.comecar}>
            Novo jogo
          </button>
          {props.continuar && (
            <button className="botao" onClick={props.continuar}>
              {props.rotuloContinuar}
            </button>
          )}
          <button className="botao" onClick={props.creditos}>
            Créditos
          </button>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------- Criador

function Amostras<T extends string>({
  rotulo,
  valores,
  atual,
  escolher,
  cor,
}: {
  rotulo: string;
  valores: T[];
  atual: T;
  escolher: (v: T) => void;
  cor?: boolean;
}) {
  return (
    <fieldset className="campo">
      <legend>{rotulo}</legend>
      <div className="amostras">
        {valores.map((v, i) => (
          <button
            key={v}
            className={`amostra ${v === atual ? 'ativa' : ''}`}
            style={cor ? { background: v } : undefined}
            onClick={() => {
              som.clique();
              escolher(v);
            }}
            aria-label={`${rotulo} ${i + 1}`}
            aria-pressed={v === atual}
          />
        ))}
      </div>
    </fieldset>
  );
}

function TelaCriador({
  jogador,
  mudar,
  voltar,
  pronto,
}: {
  jogador: Jogador;
  mudar: (j: Jogador) => void;
  voltar: () => void;
  pronto: () => void;
}) {
  const { perfil, aparencia } = jogador;
  const setAparencia = (a: Partial<Aparencia>) => mudar({ perfil, aparencia: { ...aparencia, ...a } });
  const setPerfil = (p: Partial<Perfil>) => mudar({ aparencia, perfil: { ...perfil, ...p } });

  function sortear() {
    som.escolha();
    const tipos = Object.keys(CABELOS) as TipoCabelo[];
    const pegar = <T,>(l: T[]) => l[Math.floor(Math.random() * l.length)];
    setAparencia({ pele: pegar(TONS_DE_PELE), cabelo: pegar(tipos), corCabelo: pegar(CORES_DE_CABELO) });
  }

  return (
    <main className="tela tela-criador">
      <h2 className="titulo-tela">Quem é você na ilha?</h2>
      <div className="criador">
        <div className="vitrine">
          <Boneco aparencia={aparencia} escala={9} />
          <div className="pedestal" />
          <p className="plaquinha">{perfil.nome || 'Sem nome'}</p>
        </div>
        <div className="painel controles">
          <label className="campo">
            <span className="legenda">Nome</span>
            <input
              type="text"
              value={perfil.nome}
              maxLength={16}
              placeholder="Digite seu nome"
              onChange={(e) => setPerfil({ nome: e.target.value })}
              autoFocus
            />
          </label>
          <fieldset className="campo">
            <legend>Gênero</legend>
            <div className="alternar">
              {(['menino', 'menina'] as Genero[]).map((g) => (
                <button
                  key={g}
                  className={`botao pequeno ${perfil.genero === g ? 'principal' : ''}`}
                  onClick={() => {
                    som.clique();
                    setPerfil({ genero: g });
                  }}
                  aria-pressed={perfil.genero === g}
                >
                  {g === 'menino' ? 'Menino' : 'Menina'}
                </button>
              ))}
            </div>
          </fieldset>
          <Amostras rotulo="Tom de pele" valores={TONS_DE_PELE} atual={aparencia.pele} escolher={(pele) => setAparencia({ pele })} cor />
          <fieldset className="campo">
            <legend>Cabelo</legend>
            <div className="cabelos">
              {(Object.keys(CABELOS) as TipoCabelo[]).map((c) => (
                <button
                  key={c}
                  className={`cabelo ${aparencia.cabelo === c ? 'ativa' : ''}`}
                  onClick={() => {
                    som.clique();
                    setAparencia({ cabelo: c });
                  }}
                  aria-pressed={aparencia.cabelo === c}
                  title={CABELOS[c].nome}
                >
                  <Retrato aparencia={{ ...aparencia, cabelo: c }} tamanho={40} />
                  <span>{CABELOS[c].nome}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <Amostras
            rotulo="Cor do cabelo"
            valores={CORES_DE_CABELO}
            atual={aparencia.corCabelo}
            escolher={(corCabelo) => setAparencia({ corCabelo })}
            cor
          />
          <div className="acoes">
            <button className="botao" onClick={sortear}>
              Aleatório
            </button>
            <button
              className="botao principal"
              onClick={() => {
                som.bom();
                if (!perfil.nome.trim()) setPerfil({ nome: 'Cadete' });
                pronto();
              }}
            >
              Ir para a ilha ▶
            </button>
          </div>
          <button className="link" onClick={voltar}>
            ← Voltar
          </button>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------- Escolha inicial

function TelaEscolha({ jogador, escolher }: { jogador: Jogador; escolher: (c: ContratualistaId) => void }) {
  const [palco, setPalco] = useState<Palco | null>(null);
  return (
    <main className="tela tela-jogo">
      <PalcoCanvas aparencia={jogador.aparencia} aoCriar={setPalco} />
      {palco && (
        <Cena
          palco={palco}
          perfil={jogador.perfil}
          aparencia={jogador.aparencia}
          encenacao={ENCENACAO_INICIAL}
          marcarJogador
          narracao="Você acorda na areia. O mar devolveu os sobreviventes um a um. Não há nenhum adulto de pé — só cadetes assustados, olhando uns para os outros."
          opcoes={OPCOES_INICIAIS.map((o, i) => ({ id: i, texto: o.titulo, detalhe: `${o.lema} — ${o.descricao}` }))}
          consequencia={(i) => OPCOES_INICIAIS[i].introducao + ' São 20 situações. Não existe resposta certa: escolha o que você realmente faria.'}
          rotuloContinuar="Começar"
          titulo="Como a ilha deve ser organizada?"
          etiqueta={{ texto: "Primeira decisão", tipo: "filme" }}
          aoTerminar={(i) => escolher(OPCOES_INICIAIS[i].id)}
        />
      )}
    </main>
  );
}

// ---------------------------------------------------------------- Jogo

function TelaJogo({
  jogador,
  partida,
  escolher,
  sair,
}: {
  jogador: Jogador;
  partida: Partida;
  escolher: (e: Escolha) => void;
  sair: () => void;
}) {
  const [palco, setPalco] = useState<Palco | null>(null);
  const indice = partida.escolhas.length;
  const situacao = SITUACAO_POR_ID[partida.ordem[indice]];
  const encenacao = ENCENACOES[situacao.id];
  const ordem = partida.ordensOpcoes[situacao.id] ?? [0, 1, 2, 3, 4];
  const total = partida.ordem.length;
  const [cartao, setCartao] = useState(true);

  useEffect(() => {
    setCartao(true);
    const id = setTimeout(() => setCartao(false), 1700);
    return () => clearTimeout(id);
  }, [situacao.id]);

  return (
    <main className="tela tela-jogo">
      <header className="barra-jogo">
        <button className="link" onClick={sair}>
          ← Sair
        </button>
        <div className="dias">
          <span className="dias-texto">
            Dia <strong>{indice + 1}</strong> de {total}
            <span>{total - indice - 1 === 0 ? 'último dia' : `faltam ${total - indice - 1}`}</span>
          </span>
          <div className="dias-trilha" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={indice + 1}>
            {partida.ordem.map((id, i) => (
              <span
                key={id}
                className={`dia ${i < indice ? 'feito' : i === indice ? 'atual' : ''} ${SITUACAO_POR_ID[id].tipo === 'filme' ? 'filme' : ''}`}
                title={i < indice ? SITUACAO_POR_ID[id].titulo : `Dia ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </header>
      <PalcoCanvas aparencia={jogador.aparencia} aoCriar={setPalco} rotulo={situacao.titulo}>
        {cartao && (
          <div className="cartao-dia" key={situacao.id}>
            <span className={`etiqueta ${situacao.tipo}`}>{situacao.tipo === 'filme' ? 'Cena do filme' : 'Imprevisto'}</span>
            <span className="cartao-titulo">{situacao.titulo}</span>
            <span className="cartao-sub">Dia {indice + 1}</span>
          </div>
        )}
      </PalcoCanvas>
      {palco && (
        <Cena
          key={situacao.id}
          palco={palco}
          perfil={jogador.perfil}
          aparencia={jogador.aparencia}
          encenacao={encenacao}
          jogadorPintado={jogadorPintado(partida.escolhas)}
          marcarJogador={indice === 0}
          narracao={situacao.texto}
          opcoes={ordem.map((i) => ({ id: i, texto: situacao.opcoes[i].texto, civ: situacao.opcoes[i].civ }))}
          consequencia={(i) => situacao.opcoes[i].consequencia}
          rotuloContinuar={indice + 1 === total ? 'Ver o fim da história' : 'Continuar'}
          titulo={situacao.titulo}
          etiqueta={{ texto: situacao.tipo === 'filme' ? 'Cena do filme' : 'Imprevisto', tipo: situacao.tipo }}
          aoTerminar={(opcao) => escolher({ situacaoId: situacao.id, opcao })}
        />
      )}
    </main>
  );
}

// ---------------------------------------------------------------- Epílogo

function TelaFinal({ jogador, partida, seguir }: { jogador: Jogador; partida: Partida; seguir: () => void }) {
  const resultado = useMemo(() => calcularResultado(partida.contratualista, partida.escolhas), [partida]);
  const barbarie = resultado.final.titulo === 'A fera éramos nós';
  const [palco, setPalco] = useState<Palco | null>(null);
  const [paragrafo, setParagrafo] = useState(-1);
  const textos = [...resultado.final.texto.map((t) => personalizar(t, jogador.perfil))];
  const atual = paragrafo >= 0 ? textos[paragrafo] : '';
  const dig = useDigitacao(atual, paragrafo >= 0, false);
  const falaOficial = personalizar(ENCENACAO_FINAL.fala, jogador.perfil);
  const [mostrarOficial, setMostrarOficial] = useState(false);

  useEffect(() => {
    if (!palco) return;
    palco.fadeImediato(1);
    palco.montar({
      cenario: ENCENACAO_FINAL.cenario,
      hora: ENCENACAO_FINAL.hora,
      atores: [
        { id: 'jogador', x: 100, olhando: 'direita', pintado: barbarie || jogadorPintado(partida.escolhas) },
        ...(ENCENACAO_FINAL.atores ?? []),
      ],
    });
    ambienteSom('fogo');
    void (async () => {
      await palco.clarear();
      setParagrafo(0);
    })();
  }, [palco, barbarie, partida.escolhas]);

  async function avancar() {
    if (!dig.completo) return dig.completar();
    som.clique();
    if (paragrafo === 0 && palco && !mostrarOficial) {
      setMostrarOficial(true);
      await palco.entrar({ id: 'oficial', x: 150, olhando: 'esquerda' });
      palco.emote('jogador', '!', 2);
      palco.emote('jack', '...', 2);
    }
    if (paragrafo < textos.length - 1) setParagrafo(paragrafo + 1);
  }

  const acabou = paragrafo === textos.length - 1 && dig.completo;

  return (
    <main className="tela tela-jogo">
      <PalcoCanvas aparencia={jogador.aparencia} aoCriar={setPalco} rotulo="A ilha em chamas" />
      <div className="painel painel-texto" onClick={() => void avancar()}>
        {mostrarOficial && paragrafo >= 1 ? (
          <div className="fala">
            <Retrato aparencia={{ pele: '#d9a77f', cabelo: 'curto', corCabelo: '#1f1a17', camisa: '#f4f1ea', quepe: true }} />
            <div>
              <p className="falante">Oficial</p>
              <p className="fala-texto">“{falaOficial}”</p>
            </div>
          </div>
        ) : (
          <p className="narracao aguardando">A fumaça sobe da ilha…</p>
        )}
      </div>
      <div className="painel painel-opcoes" onClick={() => void avancar()}>
        <div className="cabecalho-opcoes">
          <span className="etiqueta filme">Epílogo</span>
          <h2>{resultado.final.titulo}</h2>
        </div>
        {textos.slice(0, Math.max(0, paragrafo)).map((t, i) => (
          <p key={i} className="narracao">
            {t}
          </p>
        ))}
        {paragrafo >= 0 && <p className="narracao">{dig.mostrado}</p>}
        {acabou ? (
          <div className="acoes">
            <button
              className="botao principal"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                som.bom();
                seguir();
              }}
            >
              Com quem eu me pareço? ▶
            </button>
          </div>
        ) : (
          <p className="dica">clique ou Enter para avançar</p>
        )}
      </div>
      <TeclaAvancar acao={() => void avancar()} ativo={!acabou} />
    </main>
  );
}

function TeclaAvancar({ acao, ativo }: { acao: () => void; ativo: boolean }) {
  useEffect(() => {
    if (!ativo) return;
    const f = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        acao();
      }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [acao, ativo]);
  return null;
}

// ---------------------------------------------------------------- Resultado

function TelaResultado({
  jogador,
  contratualista,
  escolhas,
  compartilhado,
  jogarDeNovo,
  inicio,
  creditos,
}: {
  jogador: Jogador;
  contratualista: ContratualistaId;
  escolhas: Escolha[];
  compartilhado: boolean;
  jogarDeNovo: () => void;
  inicio: () => void;
  creditos: () => void;
}) {
  const resultado = useMemo(() => calcularResultado(contratualista, escolhas), [contratualista, escolhas]);
  const [aviso, setAviso] = useState('');
  const top = resultado.ranking.slice(0, 4);
  const escolhido = PENSADOR_POR_ID[contratualista];
  const primeiro = PENSADOR_POR_ID[top[0].id];
  const maiorPorcentagem = Math.max(...resultado.grupos.map((g) => g.porcentagem), 1);
  const nome = jogador.perfil.nome || 'Cadete';
  const sobrenome = (n: string) => n.split(' ').pop();

  const url = `${window.location.origin}${window.location.pathname}#r=${codificar(contratualista, escolhas)}&j=${encodeURIComponent(codificarJogador(jogador))}`;
  const texto = `Na ilha de O Senhor das Moscas, eu pensei como ${primeiro.nome}. E você?`;

  function imagem() {
    return gerarImagemResultado({
      nome,
      aparencia: { ...jogador.aparencia, pintura: resultado.final.titulo === 'A fera éramos nós' },
      final: resultado.final.titulo,
      top: top.map((a) => {
        const p = PENSADOR_POR_ID[a.id];
        const g = GRUPO_POR_ID[p.grupo];
        return { nome: p.nome, grupo: g.nome, cor: g.cor, porcentagem: a.porcentagem };
      }),
      url: window.location.origin,
    });
  }

  async function baixarImagem() {
    som.clique();
    const blob = await imagem();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resultado-${nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 2000);
    setAviso('Imagem baixada!');
  }

  async function compartilhar() {
    som.clique();
    try {
      const arquivo = new File([await imagem()], 'resultado.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [arquivo] })) {
        await navigator.share({ files: [arquivo], title: 'O Senhor das Moscas — Edição Filosófica', text: `${texto} ${url}` });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: 'O Senhor das Moscas — Edição Filosófica', text: texto, url });
        return;
      }
      await navigator.clipboard.writeText(`${texto} ${url}`);
      setAviso('Link copiado!');
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      history.replaceState(null, '', url);
      setAviso('Não deu para copiar. O link do resultado está na barra de endereço.');
    }
  }

  return (
    <main className="tela tela-resultado">
      <div className="cabecalho-resultado painel">
        <div className="vitrine pequena">
          <Boneco aparencia={{ ...jogador.aparencia, pintura: resultado.final.titulo === 'A fera éramos nós' }} escala={5} />
        </div>
        <div>
          <p className="sobretitulo">{compartilhado ? 'Resultado compartilhado' : 'Seu resultado'}</p>
          <h2 className="titulo-tela">{nome}, na ilha você pensou como…</h2>
          <p className="final-resumo">Final: {resultado.final.titulo}</p>
        </div>
      </div>

      <ol className="ranking-top">
        {top.map((a, i) => {
          const p = PENSADOR_POR_ID[a.id];
          const grupo = GRUPO_POR_ID[p.grupo];
          return (
            <li key={a.id} className={`cartao-pensador painel ${i === 0 ? 'primeiro' : ''}`}>
              <div className="cartao-topo">
                <span className="posicao">{i + 1}º</span>
                <div className="cartao-nome">
                  <h3>{p.nome}</h3>
                  <span className="grupo" style={{ color: grupo.cor, borderColor: grupo.cor }}>
                    {grupo.nome}
                  </span>
                  <span className="anos">{p.anos}</span>
                </div>
                <span className="porcentagem">{a.porcentagem}%</span>
              </div>
              <div className="barra">
                <div className="barra-preenchida" style={{ width: `${a.porcentagem}%`, background: grupo.cor }} />
              </div>
              <p className="ideia">{p.ideia}</p>
              <p className="no-filme">
                <strong>No filme:</strong> {p.noFilme}
              </p>
              {a.momentos.length > 0 && (
                <div className="momentos">
                  <p className="momentos-titulo">Você pensou como {sobrenome(p.nome)} quando…</p>
                  <ul>
                    {a.momentos.map((m) => (
                      <li key={m.situacao.id}>
                        <strong>{m.situacao.titulo}:</strong> “{personalizar(m.situacao.opcoes[m.opcao].texto, jogador.perfil)}”
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="comparacao painel">
        <p>
          {resultado.posicaoDoEscolhido === 1 ? (
            <>
              Você chegou dizendo que seria como <strong>{escolhido.nome}</strong> — e foi fiel até o fim: ele ficou
              em <strong>1º lugar</strong>.
            </>
          ) : (
            <>
              Você chegou dizendo que seria como <strong>{escolhido.nome}</strong>… mas agiu mais como{' '}
              <strong>{primeiro.nome}</strong>. {sobrenome(escolhido.nome)} ficou em{' '}
              <strong>{resultado.posicaoDoEscolhido}º lugar</strong> entre 21.
            </>
          )}
        </p>
      </div>

      <div className="painel">
        <h3 className="subtitulo-secao">Suas tendências</h3>
        <ul className="grupos">
          {resultado.grupos.map((g) => {
            const grupo = GRUPO_POR_ID[g.id];
            return (
              <li key={g.id}>
                <span className="grupo-nome">{grupo.nome}</span>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${(g.porcentagem / maiorPorcentagem) * 100}%`, background: grupo.cor }}
                  />
                </div>
                <span className="grupo-valor">{g.porcentagem}%</span>
              </li>
            );
          })}
        </ul>

        <details className="ranking-completo">
          <summary>Ver o ranking completo (21 pensadores)</summary>
          <ol>
            {resultado.ranking.map((a) => {
              const p = PENSADOR_POR_ID[a.id];
              return (
                <li key={a.id}>
                  <div className="linha-ranking">
                    <span>
                      {p.nome} <em>· {GRUPO_POR_ID[p.grupo].nome}</em>
                    </span>
                    <span>{a.porcentagem}%</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </details>

        <p className="aviso">
          Os espectros (esquerda, direita, centro etc.) são uma simplificação feita para a aula. Cada pensador é muito
          mais complexo do que um rótulo — e o jogo mede só as escolhas feitas nestas 20 situações.
        </p>
      </div>

      <div className="acoes">
        {compartilhado ? (
          <button className="botao principal" onClick={jogarDeNovo}>
            Jogar também
          </button>
        ) : (
          <>
            <button className="botao principal" onClick={() => void baixarImagem()}>
              Baixar imagem
            </button>
            <button className="botao" onClick={() => void compartilhar()}>
              Compartilhar
            </button>
            <button className="botao" onClick={jogarDeNovo}>
              Jogar de novo
            </button>
          </>
        )}
        <button className="botao" onClick={inicio}>
          Início
        </button>
        <button className="botao" onClick={creditos}>
          Créditos
        </button>
      </div>
      {aviso && <p className="aviso-compartilhar">{aviso}</p>}
    </main>
  );
}

// ---------------------------------------------------------------- Créditos

function TelaCreditos({ voltar }: { voltar: () => void }) {
  return (
    <main className="tela tela-creditos">
      <div className="painel">
        <h2 className="titulo-tela">Créditos</h2>
        <p className="sobretitulo">Trabalho de Filosofia · Turma 305</p>
        <ul className="integrantes">
          {INTEGRANTES.map((nome) => (
            <li key={nome}>{nome}</li>
          ))}
        </ul>
        <p className="nota">
          Baseado no filme <em>O Senhor das Moscas</em> (<em>Lord of the Flies</em>, 1990, dir. Harry Hook), adaptação
          do romance de William Golding (1954). As situações do jogo são uma releitura livre, com fins educativos.
          Personagens, cenários e sons foram feitos em código para este trabalho.
        </p>
        <div className="acoes">
          <button className="botao" onClick={voltar}>
            ← Voltar
          </button>
        </div>
      </div>
    </main>
  );
}
