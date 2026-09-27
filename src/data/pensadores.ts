import type { Grupo, GrupoId, Pensador, PensadorId } from './tipos';

export const GRUPOS: Grupo[] = [
  { id: 'contratualistas', nome: 'Contratualistas', cor: '#8a5a2b' },
  { id: 'esquerda', nome: 'Esquerda', cor: '#a33b2c' },
  { id: 'direita', nome: 'Direita', cor: '#2f4f7a' },
  { id: 'centro', nome: 'Centro', cor: '#6b6f2a' },
  { id: 'pragmatismo', nome: 'Pragmatismo', cor: '#b0782a' },
  { id: 'tecnocracia', nome: 'Tecnocracia', cor: '#4d6b6b' },
  { id: 'moral', nome: 'Moral e sociedade', cor: '#6a4a7a' },
];

export const GRUPO_POR_ID = Object.fromEntries(GRUPOS.map((g) => [g.id, g])) as Record<GrupoId, Grupo>;

export const PENSADORES: Pensador[] = [
  // Contratualistas
  {
    id: 'hobbes',
    nome: 'Thomas Hobbes',
    grupo: 'contratualistas',
    anos: '1588–1679',
    ideia:
      'Sem um poder forte acima de todos, a vida vira "guerra de todos contra todos". Por medo da morte, as pessoas entregam sua liberdade a um soberano (o Leviatã) em troca de segurança.',
    noFilme:
      'A ilha sem adultos é o estado de natureza de Hobbes: quando a autoridade da concha some, o medo e a violência tomam conta.',
  },
  {
    id: 'locke',
    nome: 'John Locke',
    grupo: 'contratualistas',
    anos: '1632–1704',
    ideia:
      'Todos nascem com direitos naturais: vida, liberdade e propriedade (fruto do próprio trabalho). O governo existe para proteger esses direitos e só é legítimo com o consentimento dos governados.',
    noFilme:
      'A eleição de Ralph e a regra da concha são um contrato por consentimento. Jack rompe esse pacto quando passa a tomar à força o que é dos outros.',
  },
  {
    id: 'rousseau',
    nome: 'Jean-Jacques Rousseau',
    grupo: 'contratualistas',
    anos: '1712–1778',
    ideia:
      'O ser humano nasce bom; é a sociedade, a desigualdade e a propriedade que o corrompem. A política legítima nasce da "vontade geral" decidida por todos.',
    noFilme:
      'Os garotos chegam inocentes. A disputa por poder, comida e território é o que os corrompe — e as assembleias da concha tentam expressar a vontade geral.',
  },
  // Esquerda
  {
    id: 'marx',
    nome: 'Karl Marx',
    grupo: 'esquerda',
    anos: '1818–1883',
    ideia:
      'A história é a história da luta de classes. Quem controla os meios de produção domina os outros; a saída é a propriedade coletiva e o fim da exploração.',
    noFilme:
      'Quem controla a carne e o fogo controla a ilha. Os caçadores de Jack viram uma classe dominante que troca comida por obediência.',
  },
  {
    id: 'gramsci',
    nome: 'Antonio Gramsci',
    grupo: 'esquerda',
    anos: '1891–1937',
    ideia:
      'O poder não se mantém só pela força, mas pela hegemonia: a cultura, os símbolos e o "senso comum" fazem as pessoas aceitarem a dominação como natural.',
    noFilme:
      'Jack domina com rituais, pinturas, cantos e o mito da fera. Os símbolos (a concha, a cabeça do porco) disputam quem define o que é "normal" na ilha.',
  },
  {
    id: 'freire',
    nome: 'Paulo Freire',
    grupo: 'esquerda',
    anos: '1921–1997',
    ideia:
      'Educar é libertar: o diálogo e a consciência crítica tiram o oprimido da posição de quem apenas obedece. Ninguém educa ninguém, ninguém se educa sozinho.',
    noFilme:
      'Piggy tenta pensar e dialogar, mas é silenciado e ridicularizado. Os pequenos, sem voz nem consciência crítica, seguem quem grita mais alto.',
  },
  // Direita
  {
    id: 'burke',
    nome: 'Edmund Burke',
    grupo: 'direita',
    anos: '1729–1797',
    ideia:
      'As tradições e instituições acumulam a sabedoria de gerações. Mudanças devem ser graduais; romper tudo de uma vez abre as portas para o caos.',
    noFilme:
      'Ralph e Piggy tentam manter os costumes da academia militar e da "civilização". Quando os garotos abandonam as tradições, a barbárie avança rápido.',
  },
  {
    id: 'smith',
    nome: 'Adam Smith',
    grupo: 'direita',
    anos: '1723–1790',
    ideia:
      'A divisão do trabalho e as trocas livres geram riqueza. Cada um buscando o próprio interesse, dentro de regras justas, acaba beneficiando o conjunto — a "mão invisível".',
    noFilme:
      'Caçar, cuidar do fogo e construir abrigos exigem divisão do trabalho. A ilha vira uma pequena economia de trocas: carne por lugar na tribo.',
  },
  {
    id: 'hayek',
    nome: 'Friedrich Hayek',
    grupo: 'direita',
    anos: '1899–1992',
    ideia:
      'Nenhum planejador central sabe o suficiente para comandar a sociedade. A liberdade individual, a propriedade e a ordem espontânea funcionam melhor que o controle total.',
    noFilme:
      'Jack concentra todas as decisões e vira um tirano. Para Hayek, esse é o caminho da servidão: quem planeja tudo acaba mandando em todos.',
  },
  // Centro
  {
    id: 'aristoteles',
    nome: 'Aristóteles',
    grupo: 'centro',
    anos: '384–322 a.C.',
    ideia:
      'O ser humano é um "animal político": só se realiza vivendo em comunidade. A virtude está no justo meio entre dois extremos — nem covardia, nem temeridade.',
    noFilme:
      'Os garotos que se isolam da comunidade viram "feras ou deuses". A ilha precisa de equilíbrio entre a ordem de Ralph e a energia de Jack.',
  },
  {
    id: 'montesquieu',
    nome: 'Montesquieu',
    grupo: 'centro',
    anos: '1689–1755',
    ideia:
      'Todo poder tende ao abuso, então o poder deve frear o poder: separar quem faz as leis, quem as executa e quem julga.',
    noFilme:
      'Na tribo de Jack, ele cria as regras, executa e pune sozinho. Sem divisão de poderes, nada impede o abuso.',
  },
  {
    id: 'rawls',
    nome: 'John Rawls',
    grupo: 'centro',
    anos: '1921–2002',
    ideia:
      'Regras justas são as que escolheríamos sob o "véu da ignorância", sem saber se seríamos o mais forte ou o mais fraco. Desigualdades só valem se beneficiarem os que estão pior.',
    noFilme:
      'Se ninguém soubesse se seria Jack ou Piggy, ninguém aceitaria as regras da tribo de Jack. Os pequenos são quem mais perde.',
  },
  // Pragmatismo
  {
    id: 'maquiavel',
    nome: 'Nicolau Maquiavel',
    grupo: 'pragmatismo',
    anos: '1469–1527',
    ideia:
      'A política tem sua própria lógica, separada da moral cristã. Um governante precisa de virtù para manter o poder e, se não puder ser amado, é mais seguro ser temido.',
    noFilme:
      'Jack é maquiavélico: usa o medo da fera, a carne e as festas para conquistar seguidores. Ralph perde porque não sabe jogar esse jogo.',
  },
  {
    id: 'mill',
    nome: 'John Stuart Mill',
    grupo: 'pragmatismo',
    anos: '1806–1873',
    ideia:
      'O certo é o que produz a maior felicidade para o maior número (utilitarismo). A liberdade individual só pode ser limitada para evitar dano aos outros.',
    noFilme:
      'Manter o fogo aceso traria o maior bem para todos (o resgate), mas a caçada dá prazer imediato a poucos. Uma escolha utilitária mal calculada.',
  },
  {
    id: 'dewey',
    nome: 'John Dewey',
    grupo: 'pragmatismo',
    anos: '1859–1952',
    ideia:
      'Ideias valem pelo que resolvem na prática. A democracia é um modo de vida experimental: testar, errar, discutir e corrigir juntos.',
    noFilme:
      'A ilha é um laboratório. Assembleias que resolvem problemas concretos funcionam; as que viram falatório sem ação perdem os garotos para Jack.',
  },
  // Tecnocracia
  {
    id: 'platao',
    nome: 'Platão',
    grupo: 'tecnocracia',
    anos: '428–348 a.C.',
    ideia:
      'A cidade justa deve ser governada pelos que conhecem o Bem — o rei-filósofo. Cada um deve cumprir a função para a qual é mais apto.',
    noFilme:
      'Piggy, o que "pensa", deveria guiar; mas a maioria prefere as sombras da caverna — o medo da fera — à verdade que Simon descobre.',
  },
  {
    id: 'comte',
    nome: 'Auguste Comte',
    grupo: 'tecnocracia',
    anos: '1798–1857',
    ideia:
      'A humanidade evolui do pensamento mágico para o científico (positivismo). A sociedade deve ser organizada pela ciência: "Ordem e Progresso", lema da nossa bandeira.',
    noFilme:
      'A ilha regride do científico (óculos, fogo, sinais) ao mágico (fera, sacrifícios ao Senhor das Moscas). É o positivismo ao contrário.',
  },
  {
    id: 'weber',
    nome: 'Max Weber',
    grupo: 'tecnocracia',
    anos: '1864–1920',
    ideia:
      'Há três tipos de autoridade: tradicional, carismática e racional-legal (regras e cargos). O Estado detém o monopólio do uso legítimo da força.',
    noFilme:
      'Ralph tem autoridade legal (foi eleito, tem a concha); Jack tem autoridade carismática. No filme, o carisma vence a regra.',
  },
  // Moral e sociedade
  {
    id: 'kant',
    nome: 'Immanuel Kant',
    grupo: 'moral',
    anos: '1724–1804',
    ideia:
      'Aja só segundo regras que você aceitaria como lei para todos (imperativo categórico). Nunca trate uma pessoa apenas como meio, mas sempre como fim.',
    noFilme:
      'Simon e Ralph fazem o certo mesmo quando não compensa. Jack usa os outros como ferramentas — o oposto da ética kantiana.',
  },
  {
    id: 'nietzsche',
    nome: 'Friedrich Nietzsche',
    grupo: 'moral',
    anos: '1844–1900',
    ideia:
      'A moral tradicional é uma "moral de rebanho". A vida é vontade de potência: o indivíduo forte cria os próprios valores em vez de obedecer aos herdados.',
    noFilme:
      'Jack rejeita as regras herdadas e cria novos valores, com rituais próprios. O filme mostra o lado sombrio dessa força sem limites.',
  },
  {
    id: 'durkheim',
    nome: 'Émile Durkheim',
    grupo: 'moral',
    anos: '1858–1917',
    ideia:
      'A sociedade se mantém unida por fatos sociais e pela solidariedade. Quando as normas perdem a força, surge a anomia: desorientação e desagregação.',
    noFilme:
      'Longe da escola e dos adultos, as normas se dissolvem: é a anomia. A tribo de Jack cria uma nova coesão pelo ritual coletivo.',
  },
];

export const PENSADOR_POR_ID = Object.fromEntries(PENSADORES.map((p) => [p.id, p])) as Record<
  PensadorId,
  Pensador
>;
