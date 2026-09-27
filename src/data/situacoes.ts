import type { Opcao, Pesos, Situacao } from './tipos';

/**
 * Como editar:
 * - `texto` é a situação; cada opção tem `texto` (a escolha) e `consequencia` (o que acontece depois).
 * - `pesos`: quantos pontos a escolha dá para cada pensador (-1 a 3).
 * - `civ`: 1 = civilização, 0 = neutro, -1 = barbárie (define o final da história).
 * - Cenas do filme (tipo 'filme') aparecem sempre, nesta ordem.
 * - Eventos (tipo 'evento') são sorteados; `depoisDe` = número da cena do filme depois da qual o evento pode aparecer.
 */
function op(texto: string, consequencia: string, pesos: Pesos, civ: -1 | 0 | 1): Opcao {
  return { texto, consequencia, pesos, civ };
}

export const CENAS_DO_FILME: Situacao[] = [
  {
    id: 'f01',
    tipo: 'filme',
    titulo: 'A queda',
    texto:
      'Noite. O avião que levava os cadetes da academia militar caiu no mar. Você boia no escuro, ouvindo gritos. Ao longe, a silhueta de uma ilha. Perto de você, o piloto, capitão Benson, geme com um corte fundo na perna.',
    opcoes: [
      op(
        'Nadar direto para a ilha. Primeiro eu me salvo; só assim posso ajudar alguém.',
        'Você chega exaust{o|a} à areia, mas viv{o|a}. De lá, vê os outros chegando aos poucos.',
        { hobbes: 2, nietzsche: 2, hayek: 1 },
        0,
      ),
      op(
        'Ajudar a arrastar o capitão ferido, mesmo que seja mais lento e arriscado.',
        'Com mais dois cadetes, você puxa o capitão até a praia. Ele está vivo, mas delira de febre.',
        { kant: 3, rawls: 2, rousseau: 1 },
        1,
      ),
      op(
        'Gritar os nomes, organizar os garotos em fila e nadar juntos, como no treinamento.',
        'A disciplina da academia funciona: o grupo chega unido à areia.',
        { burke: 2, weber: 2, durkheim: 2 },
        1,
      ),
      op(
        'Agarrar os destroços que boiam — mochilas, caixas, coletes. Vamos precisar deles.',
        'Você chega com uma mochila cheia e alguns olhares desconfiados: aquilo é seu ou de todos?',
        { locke: 2, smith: 2, maquiavel: 1 },
        0,
      ),
      op(
        'Contar quantos somos e ver quem está ferido antes de decidir para onde ir.',
        'Você perde minutos preciosos, mas descobre que ninguém ficou para trás.',
        { comte: 2, dewey: 2, platao: 1, aristoteles: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f02',
    tipo: 'filme',
    titulo: 'A concha',
    texto:
      'Na manhã seguinte, Ralph encontra uma concha grande na areia. Piggy mostra como soprá-la, e o som reúne todos os garotos espalhados pela praia. É a primeira reunião na ilha. Qual deve ser a primeira decisão?',
    opcoes: [
      op(
        'Escolher um chefe. Sem comando, ninguém sabe o que fazer.',
        'A ideia pega rápido: todos querem saber quem vai mandar.',
        { hobbes: 3, weber: 1, maquiavel: 1 },
        0,
      ),
      op(
        'Fazer uma fogueira de sinal. Ser resgatado é o bem maior de todos.',
        'Ninguém discorda: o fogo vira o grande objetivo comum da ilha.',
        { mill: 3, comte: 1, dewey: 1 },
        1,
      ),
      op(
        'Combinar regras de convivência antes de tudo: como decidir, como falar, como dividir.',
        'Alguns bocejam, mas as primeiras regras da ilha nascem ali.',
        { locke: 2, montesquieu: 2, rousseau: 1, kant: 1 },
        1,
      ),
      op(
        'Explorar a ilha: sem saber o que há aqui, qualquer decisão é chute.',
        'Ralph, Jack e Simon partem para explorar. Voltam com a notícia: a ilha é desabitada.',
        { dewey: 2, comte: 2, aristoteles: 1, platao: 1 },
        0,
      ),
      op(
        'Aproveitar! Sem professores, sem coronel. Cada um faz o que quiser por um tempo.',
        'Metade da reunião corre para o mar. A outra metade olha para Ralph sem saber o que fazer.',
        { nietzsche: 2, hayek: 2, rousseau: 1 },
        -1,
      ),
    ],
  },
  {
    id: 'f03',
    tipo: 'filme',
    titulo: 'A eleição',
    texto:
      'Ralph, que tem a concha, e Jack, o cadete mais velho e mais durão, disputam a liderança. Jack diz que tem mais patente e sabe comandar; Ralph diz que o chefe deve ser escolhido por todos.',
    opcoes: [
      op(
        'Voto em Ralph: ele reuniu todo mundo e respeita a vontade do grupo.',
        'Ralph vence. Jack engole a derrota — por enquanto.',
        { rousseau: 2, locke: 2, dewey: 1 },
        1,
      ),
      op(
        'Voto em Jack: ele é mais forte e sabe comandar. Numa ilha, precisamos de um chefe firme.',
        'Seu voto não basta: Ralph vence. Mas Jack guarda o nome de quem ficou do lado dele.',
        { hobbes: 3, maquiavel: 1, nietzsche: 1 },
        -1,
      ),
      op(
        'Proponho dividir: Ralph cuida das decisões gerais e Jack comanda os caçadores.',
        'Ralph gosta da ideia e Jack vira chefe dos caçadores. Por um tempo, o equilíbrio funciona.',
        { montesquieu: 3, aristoteles: 2 },
        1,
      ),
      op(
        'O chefe deveria ser o mais inteligente, não o mais popular. Proponho Piggy.',
        'Os garotos riem e Piggy fica vermelho. Mas você plantou uma ideia.',
        { platao: 3, comte: 1, freire: 1 },
        1,
      ),
      op(
        'Não voto. Chefe nenhum manda em mim.',
        'Ralph vence sem o seu voto. Você fica livre — e também sem voz.',
        { hayek: 2, nietzsche: 2 },
        0,
      ),
    ],
  },
  {
    id: 'f04',
    tipo: 'filme',
    titulo: 'A regra da concha',
    texto:
      'Ralph cria a regra: quem segura a concha fala, e os outros escutam. Jack debocha: "Regras? Na academia a gente obedecia ordens, não conchas."',
    opcoes: [
      op(
        'A regra vale para todos, inclusive para o chefe. Ninguém está acima dela.',
        'A concha ganha força: até Ralph precisa pedi-la para falar.',
        { kant: 2, montesquieu: 2, locke: 1, weber: 1 },
        1,
      ),
      op(
        'A concha é um bom costume. Viemos da civilização; devemos manter seus hábitos.',
        'Os mais velhos concordam. A concha vira símbolo de "como as coisas são feitas".',
        { burke: 3, durkheim: 2 },
        1,
      ),
      op(
        'Jack tem razão: regra sem ninguém para punir é só enfeite.',
        'Jack sorri para você. Ralph percebe que a autoridade da concha nasceu frágil.',
        { hobbes: 2, maquiavel: 2 },
        -1,
      ),
      op(
        'Precisamos garantir que os pequenos também falem, não só os que gritam mais.',
        'Um menino pequeno segura a concha, tremendo, e fala pela primeira vez. Todos escutam.',
        { freire: 3, rawls: 2, rousseau: 1 },
        1,
      ),
      op(
        'Vamos testar a regra por uns dias e ver se funciona na prática.',
        'O teste funciona nas primeiras assembleias. Depois, as reuniões ficam longas e cansativas.',
        { dewey: 3, mill: 1, aristoteles: 1 },
        0,
      ),
    ],
  },
  {
    id: 'f05',
    tipo: 'filme',
    titulo: 'Os óculos do Piggy',
    texto:
      'Não há fósforos. Jack arranca os óculos do rosto de Piggy e usa as lentes para concentrar o sol e acender o fogo. Piggy, quase cego sem eles, protesta.',
    opcoes: [
      op(
        'Os óculos são do Piggy. Ninguém tem o direito de tomar à força; tem que pedir.',
        'Jack devolve os óculos com cara feia. Piggy empresta de boa vontade quando precisam do fogo.',
        { locke: 3, kant: 2 },
        1,
      ),
      op(
        'Os óculos agora são um bem de todos: são a única forma de fazer fogo na ilha.',
        'Os óculos viram ferramenta coletiva. Piggy fica com eles, mas já não são só dele.',
        { marx: 3, rousseau: 1, mill: 1 },
        0,
      ),
      op(
        'Fogo em primeiro lugar. Se funcionou, pouco importa como.',
        'O fogo acende e todos comemoram. Ninguém nota Piggy sentado, tateando a areia.',
        { maquiavel: 2, mill: 2, hobbes: 1 },
        -1,
      ),
      op(
        'Criar uma regra: Piggy é o guardião dos óculos e só ele acende o fogo.',
        'Piggy ganha uma função oficial. Pela primeira vez, alguém o leva a sério.',
        { weber: 2, platao: 2, montesquieu: 1 },
        1,
      ),
      op(
        'Aprender com a lente: entender como ela funciona para fazer fogo de outras formas também.',
        'Você e Piggy testam ângulos e distâncias. A ilha ganha seu primeiro "cientista".',
        { comte: 3, dewey: 2 },
        1,
      ),
    ],
  },
  {
    id: 'f06',
    tipo: 'filme',
    titulo: 'O capitão ferido',
    texto:
      'O capitão Benson, o piloto, piora a cada dia. Tem febre, delira e às vezes grita com os garotos como se ainda estivesse no avião. Cuidar dele toma tempo e comida.',
    opcoes: [
      op(
        'Ele é o único adulto e a única autoridade real. Devemos obedecer ao que ele disser quando estiver lúcido.',
        'Nos momentos de lucidez, o capitão só consegue murmurar: "Não deixem o fogo apagar." Uma noite, delirando, ele some na mata.',
        { weber: 2, burke: 2, hobbes: 1 },
        1,
      ),
      op(
        'Organizar turnos para cuidar dele. Ninguém é abandonado, mesmo que custe esforço.',
        'Os turnos funcionam por uns dias. Mas uma noite, delirando, o capitão some na mata.',
        { kant: 2, rawls: 2, rousseau: 1, durkheim: 1 },
        1,
      ),
      op(
        'Ele gasta comida e não ajuda em nada. Temos que priorizar quem pode sobreviver.',
        'Ninguém tem coragem de dizer isso em voz alta. Numa noite, o capitão some na mata sozinho.',
        { mill: 2, maquiavel: 2, nietzsche: 1, kant: -1 },
        -1,
      ),
      op(
        'Cuida dele quem quiser, voluntariamente. Não dá para obrigar ninguém.',
        'Só Simon e dois pequenos se oferecem. Uma noite, o capitão foge delirando para a mata.',
        { hayek: 3, locke: 1 },
        0,
      ),
      op(
        'Tentar tratar a febre: ferver água, limpar o corte, testar plantas com cuidado.',
        'A febre baixa por um tempo. Mas numa noite de chuva, o capitão desaparece na mata.',
        { comte: 2, dewey: 2, aristoteles: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f07',
    tipo: 'filme',
    titulo: 'O fogo apagou',
    texto:
      'Os caçadores, que deviam vigiar o fogo, saíram atrás de um porco. Enquanto isso, um barulho de motor corta o céu... e a fogueira está apagada. O resgate passa direto. Jack volta sujo de sangue, gritando: "Pegamos um porco!"',
    opcoes: [
      op(
        'Enfrentar Jack na frente de todos: ele traiu o grupo e deve perder o comando dos caçadores.',
        'Jack fica furioso e humilhado. Naquela noite, ele começa a falar em "fazer as coisas do seu jeito".',
        { locke: 2, montesquieu: 2, kant: 1 },
        1,
      ),
      op(
        'Comer a carne e seguir em frente. Estamos com fome, e brigar não faz o resgate voltar.',
        'A carne é deliciosa. Mas a pergunta fica no ar: o que vale mais, comida hoje ou resgate amanhã?',
        { mill: 2, maquiavel: 2 },
        0,
      ),
      op(
        'Criar uma escala fixa do fogo, com nomes, horários e um responsável cobrando.',
        'A escala é pendurada numa árvore. Funciona — enquanto alguém tiver autoridade para cobrá-la.',
        { weber: 3, comte: 2 },
        1,
      ),
      op(
        'Mostrar aos caçadores, com calma, o que eles perderam: todos queremos voltar para casa.',
        'Alguns caçadores baixam a cabeça. Jack não: para ele, você está do lado do Piggy.',
        { freire: 2, aristoteles: 2, dewey: 1 },
        1,
      ),
      op(
        'Dar razão a Jack: sem carne ninguém tem força. A caça é tão importante quanto o fogo.',
        'Jack te dá um pedaço maior de carne. Você acabou de entrar na lista dos "dele".',
        { smith: 2, nietzsche: 1, hobbes: 1 },
        -1,
      ),
    ],
  },
  {
    id: 'f08',
    tipo: 'filme',
    titulo: 'A fera',
    texto:
      'Os pequenos acordam gritando: dizem que há uma fera na caverna do morro. Alguns cadetes juram ter visto "algo enorme se mexendo" lá dentro. O medo se espalha pela ilha.',
    opcoes: [
      op(
        'Organizar uma expedição para ir até a caverna e ver com os próprios olhos.',
        'A expedição vê uma forma escura se mexendo lá no fundo — e foge. O medo só aumenta.',
        { comte: 2, dewey: 2, platao: 1 },
        1,
      ),
      op(
        'Explicar que feras não existem. O medo está dentro de nós, não na ilha.',
        'Simon concorda baixinho: "Talvez a fera seja só a gente." Os outros riem dele.',
        { platao: 2, rousseau: 1, freire: 1, gramsci: 1 },
        1,
      ),
      op(
        'Aproveitar o medo: com uma ameaça lá fora, todos vão obedecer a quem prometer proteção.',
        'Jack faz exatamente isso: "Meus caçadores vão proteger vocês." O medo vira poder.',
        { maquiavel: 3, hobbes: 2 },
        -1,
      ),
      op(
        'Criar vigias armados à noite: exista a fera ou não, os pequenos precisam dormir em paz.',
        'Os pequenos dormem melhor. Mas, com lanças na mão, os vigias começam a se sentir soldados de verdade.',
        { hobbes: 2, weber: 1, mill: 1, aristoteles: 1 },
        0,
      ),
      op(
        'Fazer uma assembleia para que todos contem o que viram e decidam juntos.',
        'A assembleia vira gritaria. Cada um viu uma fera diferente. Ninguém sai mais calmo.',
        { rousseau: 2, dewey: 2, durkheim: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f09',
    tipo: 'filme',
    titulo: 'A divisão',
    texto:
      'Jack desafia Ralph na frente de todos: "Ele não é caçador, não sabe proteger ninguém!" Ninguém vota contra Ralph. Jack vai embora gritando: "Quem quiser caçar e se divertir, venha comigo. Lá tem carne!" Vários cadetes o seguem.',
    opcoes: [
      op(
        'Fico com Ralph. Ele foi eleito, e isso tem que valer alguma coisa.',
        'Vocês são cada vez menos. Mas a concha continua com vocês.',
        { locke: 2, weber: 2, burke: 1 },
        1,
      ),
      op(
        'Vou com Jack. Lá tem carne, proteção e diversão.',
        'Você ganha tinta no rosto e um pedaço de carne. E aprende rápido que ali ninguém discorda de Jack.',
        { nietzsche: 2, hobbes: 2, maquiavel: 1 },
        -1,
      ),
      op(
        'Tento um pacto: os caçadores trazem carne e o grupo de Ralph mantém o fogo.',
        'Jack aceita trocar carne por fogo — mas nos termos dele. O acordo dura pouco.',
        { smith: 3, aristoteles: 2, mill: 1 },
        1,
      ),
      op(
        'Fico no meu canto, sem tribo nenhuma. Vou me virar sozinh{o|a}.',
        'Você sobrevive de frutas e silêncio. E percebe que, sozinh{o|a}, ninguém escuta o que você pensa.',
        { hayek: 3, nietzsche: 1 },
        0,
      ),
      op(
        'Vou com Jack, mas para convencer os outros a voltarem depois.',
        'De dia, você grita com eles nas danças. À noite, sussurra dúvidas para os mais novos.',
        { gramsci: 3, freire: 1, maquiavel: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f10',
    tipo: 'filme',
    titulo: 'O Senhor das Moscas',
    texto:
      'Os caçadores de Jack matam uma porca e deixam a cabeça espetada numa estaca, como "oferenda para a fera". As moscas zumbem ao redor. Sozinh{o|a} na clareira, você encara a cabeça. Parece que ela sorri.',
    opcoes: [
      op(
        'Derrubo a cabeça. É só carne podre; não vou deixar a superstição governar a ilha.',
        'A cabeça cai na terra. No dia seguinte, os caçadores fincam outra no mesmo lugar.',
        { comte: 3, platao: 1, kant: 1 },
        1,
      ),
      op(
        'Deixo lá. Se isso acalma os garotos, que mal faz?',
        'A oferenda vira tradição. Toda caçada termina ali, e o ritual fica maior a cada dia.',
        { durkheim: 2, burke: 1, mill: 1, maquiavel: 1 },
        -1,
      ),
      op(
        'Entendo o recado: a fera não está na floresta. Ela é o que está crescendo dentro da gente.',
        'É a mesma verdade que Simon descobre. Mas saber a verdade é diferente de ter coragem de contá-la.',
        { platao: 2, rousseau: 2, kant: 1 },
        1,
      ),
      op(
        'Uso a cabeça a meu favor: quem controla o "deus" da ilha controla os garotos.',
        'Você descobre o poder dos símbolos. Jack descobriu antes.',
        { maquiavel: 2, gramsci: 2, nietzsche: 1, kant: -1 },
        -1,
      ),
      op(
        'Vou atrás de Simon. Ele subiu sozinho o morro e pode estar em perigo.',
        'Você não o encontra. Lá em cima, Simon acaba de descobrir que a "fera" da caverna é o corpo do capitão Benson.',
        { kant: 2, rawls: 1, aristoteles: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f11',
    tipo: 'filme',
    titulo: 'A dança',
    texto:
      'Noite de tempestade. Na tribo de Jack, todos dançam em roda em volta do fogo, gritando para "matar a fera". Até garotos do grupo de Ralph entram na roda, por medo e por fome. De repente, uma figura sai da mata correndo na direção do fogo...',
    opcoes: [
      op(
        'Entro na roda. Todos estão dentro; ficar de fora é perigoso.',
        'Na escuridão, a roda se fecha sobre a figura. Só depois alguém ilumina o rosto: era Simon. Ele vinha contar que a fera não existia.',
        { durkheim: 2, hobbes: 1, maquiavel: 1 },
        -1,
      ),
      op(
        'Grito para pararem: "É uma pessoa!"',
        'Sua voz se perde na chuva e nos gritos. Quando a roda se abre, é tarde: era Simon, que vinha contar a verdade sobre a fera.',
        { kant: 3, rawls: 1 },
        1,
      ),
      op(
        'Fico longe e observo. Não é problema meu.',
        'Você vê tudo de longe e não faz nada. No dia seguinte, o corpo de Simon é levado pelo mar.',
        { hayek: 1, nietzsche: 1, kant: -1 },
        -1,
      ),
      op(
        'Puxo os pequenos para longe da roda e os escondo.',
        'Você protege os pequenos do frenesi. Mas lá atrás, a roda já tinha engolido Simon.',
        { rawls: 3, rousseau: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Tento apagar a fogueira para quebrar o ritual.',
        'Você joga água na fogueira, mas a chuva e os gritos continuam. Quando tudo para, Simon está no chão.',
        { gramsci: 2, dewey: 1, maquiavel: 1, comte: 1 },
        1,
      ),
    ],
  },
  {
    id: 'f12',
    tipo: 'filme',
    titulo: 'Os óculos roubados',
    texto:
      'Numa noite, a tribo de Jack ataca o acampamento de Ralph e rouba os óculos de Piggy — agora são eles que controlam o fogo. Piggy, quase cego, quer ir até a rocha onde a tribo vive e exigir os óculos de volta.',
    opcoes: [
      op(
        'Vamos com a concha. Ela ainda representa as regras; eles precisam ouvir.',
        'Piggy ergue a concha e pergunta o que é melhor: ter regras ou caçar e matar. Lá de cima, Roger empurra uma pedra enorme. A concha se despedaça, e Piggy não volta.',
        { locke: 2, kant: 1, weber: 1, burke: 1 },
        1,
      ),
      op(
        'Vamos armados. Com quem não respeita regras, só a força resolve.',
        'Vocês são poucos contra muitos. Lá de cima, Roger empurra uma pedra enorme sobre Piggy. A concha se despedaça.',
        { hobbes: 3, maquiavel: 1 },
        -1,
      ),
      op(
        'Proponho uma troca: devolvem os óculos e nós dividimos o fogo com eles.',
        'Jack ri da proposta: por que trocar o que ele já tem? Da rocha, Roger empurra uma pedra enorme. Piggy cai no mar.',
        { smith: 2, mill: 1, dewey: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Não vamos. Eles são perigosos; melhor tentar fazer fogo de outro jeito.',
        'Piggy não aceita e vai com Ralph mesmo assim. Da rocha, Roger empurra uma pedra enorme. Piggy não volta.',
        { mill: 2, comte: 1, hayek: 1 },
        0,
      ),
      op(
        'Falar com os garotos da tribo, não com Jack. Muitos só estão lá por medo.',
        'Alguns hesitam, mas o medo de Jack é maior. Roger empurra a pedra antes que alguém mude de lado. Piggy morre na queda.',
        { freire: 3, gramsci: 2, marx: 1 },
        1,
      ),
    ],
  },
];

export const EVENTOS: Situacao[] = [
  {
    id: 'e01',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'A comida do amigo',
    texto:
      'Seu amigo passou a manhã inteira colhendo frutas. Quando você pede um pouco, ele te empurra no chão: "Colhi sozinho. Vai buscar a sua."',
    opcoes: [
      op(
        'Ele tem razão: o que ele colheu com o próprio trabalho é dele.',
        'Você vai colher as suas. Na volta, ele até oferece uma — porque quis.',
        { locke: 3, hayek: 2 },
        0,
      ),
      op(
        'Revido no mesmo tom. Se ele usa a força, eu também uso.',
        'Vocês rolam na areia. Você fica com metade das frutas e sem o amigo.',
        { nietzsche: 2, hobbes: 1, maquiavel: 1 },
        -1,
      ),
      op(
        'Levo o caso à assembleia: precisamos de uma regra sobre dividir comida.',
        'A assembleia decide: cada um fica com uma parte do que colhe e o resto vai para o estoque comum.',
        { montesquieu: 2, rousseau: 1, weber: 1, dewey: 1 },
        1,
      ),
      op(
        'Proponho uma troca: frutas dele por peixes que eu pescar.',
        'Ele topa. Nasce o primeiro "comércio" da ilha.',
        { smith: 3, dewey: 1 },
        1,
      ),
      op(
        'Na ilha, tudo o que a natureza dá é de todos. Comida tem que ser dividida.',
        'Ele não concorda. Mas alguns garotos que ouviram começam a juntar as frutas num lugar só.',
        { rousseau: 2, marx: 2, rawls: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e02',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'O ladrão da noite',
    texto:
      'Alguém anda roubando frutas do estoque comum. Numa madrugada, vocês flagram o ladrão: é um dos pequenos, magrinho, chorando de fome.',
    opcoes: [
      op(
        'Castigo exemplar, na frente de todos. Senão ninguém mais respeita o estoque.',
        'Ninguém mais rouba. E os pequenos passam a ter medo dos maiores.',
        { hobbes: 2, maquiavel: 2 },
        -1,
      ),
      op(
        'Descobrir por que ele está com fome: talvez a divisão esteja injusta com os pequenos.',
        'Vocês descobrem que os maiores pegam mais. A divisão é refeita.',
        { rawls: 3, marx: 1, rousseau: 1 },
        1,
      ),
      op(
        'Roubar é errado, mesmo com fome. Ele precisa devolver e pedir desculpas.',
        'Ele devolve, envergonhado. A regra fica clara, mas ele continua com fome.',
        { kant: 3, burke: 1 },
        1,
      ),
      op(
        'Julgar numa reunião com três juízes escolhidos, e não pelo chefe sozinho.',
        'Os juízes decidem: ele vai ajudar a vigiar o estoque. Quem vigia não precisa roubar.',
        { montesquieu: 3, weber: 1, locke: 1 },
        1,
      ),
      op(
        'Ensinar os pequenos a pescar e a achar comida sozinhos.',
        'Em uma semana, os pequenos trazem os próprios peixes. O estoque para de sumir.',
        { freire: 2, dewey: 2, smith: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e03',
    tipo: 'evento',
    depoisDe: 2,
    titulo: 'Febre',
    texto:
      'Um dos pequenos está com febre alta e não consegue levantar. Cuidar dele significa alguém deixar de caçar ou de vigiar o fogo.',
    opcoes: [
      op(
        'Cuido eu. Não dá para deixar ninguém sozinho assim.',
        'Você passa a noite molhando a testa dele. De manhã, a febre cede.',
        { kant: 2, rousseau: 2, rawls: 1 },
        1,
      ),
      op(
        'Fazer um revezamento: cada um dá uma hora do seu dia.',
        'O revezamento une o grupo. Pela primeira vez, todos se sentem responsáveis por alguém.',
        { durkheim: 2, aristoteles: 2, rawls: 1 },
        1,
      ),
      op(
        'O grupo não pode parar por causa de um. Fogo e comida vêm primeiro.',
        'O fogo fica aceso. O pequeno passa a noite sozinho, tremendo. Ele sobrevive — mas não esquece.',
        { mill: 2, maquiavel: 1, nietzsche: 1 },
        -1,
      ),
      op(
        'Perguntar quem entende de primeiros socorros e deixar essa pessoa responsável.',
        'Um cadete que foi escoteiro assume. Ele sabe o que fazer.',
        { platao: 2, comte: 2, weber: 1 },
        1,
      ),
      op(
        'Ajuda quem quiser. Não posso obrigar ninguém.',
        'Simon se oferece, como sempre. Os outros seguem com suas tarefas.',
        { hayek: 3, locke: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e04',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'A tempestade',
    texto:
      'Uma tempestade derruba quase todos os abrigos da praia. Os pequenos estão ensopados. Os caçadores dizem que estão cansados demais para reconstruir.',
    opcoes: [
      op(
        'Primeiro os abrigos dos pequenos, depois os dos maiores.',
        'Os pequenos dormem secos. Os maiores resmungam, mas passam uma noite no chão.',
        { rawls: 3, rousseau: 1 },
        1,
      ),
      op(
        'Cada um reconstrói o seu. Quem trabalhar mais terá o melhor abrigo.',
        'Os abrigos ficam desiguais. Os mais fortes dormem bem; os pequenos, mal.',
        { locke: 2, hayek: 2, smith: 1 },
        0,
      ),
      op(
        'O chefe manda e todos obedecem: mutirão agora, sem discussão.',
        'Em uma tarde, tudo está de pé. Ninguém gostou do tom, mas funcionou.',
        { hobbes: 2, weber: 2 },
        0,
      ),
      op(
        'Construir um único abrigo grande, de todos, no lugar mais protegido.',
        'O abrigo coletivo vira o centro da vida na praia. Dormir juntos também espanta o medo.',
        { marx: 3, rousseau: 1, durkheim: 1 },
        1,
      ),
      op(
        'Estudar por que caíram: mudar o lugar e o formato para aguentar a próxima tempestade.',
        'Os novos abrigos, mais longe do mar e com estacas fundas, resistem à tempestade seguinte.',
        { dewey: 3, comte: 2 },
        1,
      ),
    ],
  },
  {
    id: 'e05',
    tipo: 'evento',
    depoisDe: 1,
    titulo: 'A caixa do avião',
    texto:
      'Presa nas pedras, você encontra uma caixa do avião. Dentro há uma faca, uma corda, um sinalizador e um kit de primeiros socorros.',
    opcoes: [
      op(
        'Achei, é meu. Vou usar com responsabilidade.',
        'Com a faca, você vira alguém importante. Todo mundo passa a te pedir favores.',
        { locke: 2, hayek: 2, nietzsche: 1 },
        0,
      ),
      op(
        'Entrego tudo ao chefe eleito: ele decide o que fazer.',
        'Ralph agradece e guarda o sinalizador para o momento certo.',
        { weber: 2, hobbes: 1, burke: 1 },
        1,
      ),
      op(
        'Tudo vira de uso comum e fica num lugar onde qualquer um pode pegar.',
        'Em dois dias, a faca some. Ninguém sabe quem pegou.',
        { marx: 2, rousseau: 2 },
        0,
      ),
      op(
        'Uso a faca e o sinalizador como moeda: troco por comida e favores.',
        'Você enriquece rápido. E ganha alguns inimigos também.',
        { smith: 2, maquiavel: 2 },
        -1,
      ),
      op(
        'Anoto cada item num registro: quem pegou, para quê e quando devolveu.',
        'O caderno de controle funciona. É chato, mas nada some.',
        { weber: 2, comte: 1, montesquieu: 1, mill: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e06',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'Quem não trabalha, come?',
    texto:
      'Três cadetes passam os dias nadando e dormindo enquanto os outros caçam, pescam e cuidam do fogo. Na hora da comida, eles são os primeiros da fila.',
    opcoes: [
      op(
        'Quem não trabalha, não come. Simples assim.',
        'Na primeira noite com fome, eles aparecem para trabalhar.',
        { locke: 2, smith: 2 },
        0,
      ),
      op(
        'Conversar com eles para entender por que não ajudam.',
        'Eles dizem que ninguém explicou o que fazer. Com uma função clara, dois deles começam a ajudar.',
        { freire: 2, dewey: 2, aristoteles: 1 },
        1,
      ),
      op(
        'Cada um contribui conforme pode e recebe conforme precisa.',
        'A frase é bonita. Mas os três continuam nadando.',
        { marx: 3, rousseau: 1 },
        0,
      ),
      op(
        'Eles são livres para não trabalhar, mas também não podem exigir nada dos outros.',
        'Os três passam a pescar por conta própria. Não ajudam o grupo, mas também não atrapalham.',
        { hayek: 2, mill: 2 },
        0,
      ),
      op(
        'Castigo à moda da academia: uma semana limpando a latrina.',
        'Eles obedecem, mas com raiva. Na primeira oportunidade, vão para o lado de Jack.',
        { hobbes: 2, burke: 1, maquiavel: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e07',
    tipo: 'evento',
    depoisDe: 8,
    titulo: 'A mentira',
    texto:
      'Um cadete conta que viu a fera de perto e que ela "fala". Você sabe que ele inventou: ele só queria atenção e comida extra por "ter enfrentado a fera".',
    opcoes: [
      op(
        'Desmascaro na frente de todos. A verdade vem primeiro.',
        'Ele fica humilhado. Mas os pequenos param de chorar à noite.',
        { kant: 3, platao: 1 },
        1,
      ),
      op(
        'Deixo quieto. A história dele distrai todo mundo dos problemas reais.',
        'A história cresce de boca em boca. Agora a fera "fala", "voa" e "come crianças".',
        { maquiavel: 2, nietzsche: 1, kant: -1 },
        -1,
      ),
      op(
        'Converso com ele em particular. Se ele precisava tanto de atenção, algo está errado.',
        'Ele admite que tinha medo de ser esquecido. Vocês combinam de ele contar a verdade junto com você.',
        { rousseau: 2, freire: 1, aristoteles: 1, durkheim: 1 },
        1,
      ),
      op(
        'Provo, com uma expedição, que a história não bate.',
        'A expedição não encontra nada. Metade acredita em você; a outra metade acha que a fera se escondeu.',
        { comte: 3, dewey: 1 },
        1,
      ),
      op(
        'Crio uma regra: quem espalhar pânico perde a comida extra.',
        'As histórias diminuem. Os boatos continuam — só que em voz baixa.',
        { weber: 2, montesquieu: 1, hobbes: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e08',
    tipo: 'evento',
    depoisDe: 4,
    titulo: 'Quebrou a regra',
    texto:
      'Um cadete abandonou seu turno no fogo para ir nadar. Ninguém sabe o que fazer com ele: nunca ninguém foi punido na ilha.',
    opcoes: [
      op(
        'O chefe decide a punição na hora. Autoridade que não pune não é autoridade.',
        'Ralph hesita, e Jack aproveita: "Na minha tribo, quem falha apanha."',
        { hobbes: 3, maquiavel: 1 },
        0,
      ),
      op(
        'Uma assembleia julga, e ele tem direito de se defender.',
        'Ele explica que ninguém apareceu para a troca de turno. A falha era da escala, não só dele.',
        { montesquieu: 2, locke: 2, rousseau: 1 },
        1,
      ),
      op(
        'Punição proporcional, igual para qualquer um que fizer o mesmo — até o chefe.',
        'A regra fica clara e vale para todos. Até Jack precisa respeitá-la — por enquanto.',
        { kant: 2, weber: 1, rawls: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Nada de punir. Ele precisa entender por que o fogo importa.',
        'Depois de uma conversa sobre o resgate, ele nunca mais falta a um turno.',
        { freire: 3, dewey: 1 },
        1,
      ),
      op(
        'Seguir o regulamento da academia militar, como fazíamos antes.',
        'Os cadetes reconhecem o castigo: flexões e guarda dobrada. A tradição dá segurança.',
        { burke: 3, weber: 1, durkheim: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e09',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'A escola da ilha',
    texto:
      'Os pequenos estão esquecendo como é a vida lá fora. Alguns já não lembram o próprio endereço; outros nem sabem mais contar os dias.',
    opcoes: [
      op(
        'Criar uma escola na areia, com aulas de leitura, contas e regras da ilha.',
        'As aulas funcionam. Os pequenos voltam a contar os dias.',
        { comte: 2, platao: 2, burke: 1 },
        1,
      ),
      op(
        'Aulas em roda, em que os pequenos também ensinam o que sabem.',
        'Um pequeno ensina a achar caranguejos; outro, uma música de casa. Todos aprendem.',
        { freire: 3, dewey: 2 },
        1,
      ),
      op(
        'Isso não é prioridade. Primeiro sobreviver, depois estudar.',
        'Os pequenos passam os dias soltos. Em pouco tempo, estão imitando a pintura dos caçadores.',
        { mill: 2, hobbes: 1 },
        -1,
      ),
      op(
        'Contar as histórias e tradições de casa, para eles não esquecerem quem são.',
        'À noite, perto do fogo, as histórias de casa mantêm os pequenos ligados à civilização.',
        { burke: 2, durkheim: 2, gramsci: 1 },
        1,
      ),
      op(
        'Cada um aprende o que quiser, quando quiser, explorando a ilha.',
        'Alguns aprendem a nadar e a subir em árvores. Outros não aprendem nada.',
        { rousseau: 2, hayek: 2, nietzsche: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e10',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'A fonte',
    texto:
      'Você descobre a única fonte de água doce deste lado da ilha, escondida entre as rochas. Ninguém mais sabe dela.',
    opcoes: [
      op(
        'Conto para todos na hora: água é vida, é de todo mundo.',
        'A fonte muda a vida no acampamento. Você vira {um herói discreto|uma heroína discreta}.',
        { rousseau: 2, marx: 2, kant: 1 },
        1,
      ),
      op(
        'Guardo segredo e uso como vantagem: quem quiser água vai negociar comigo.',
        'Você ganha poder. Mas se descobrirem o segredo, perde tudo — inclusive os amigos.',
        { maquiavel: 3, nietzsche: 1 },
        -1,
      ),
      op(
        'Conto só ao chefe, que decide como organizar o uso.',
        'Ralph cria turnos para buscar água. A fonte fica protegida.',
        { weber: 2, hobbes: 1, platao: 1 },
        1,
      ),
      op(
        'Descobri, então é minha; mas deixo os outros usarem em troca de ajuda nas minhas tarefas.',
        'Você trabalha menos e todos têm água. Alguns acham justo; outros, não.',
        { locke: 2, smith: 2 },
        0,
      ),
      op(
        'Proponho regras de uso para todos: horários, limpeza e ninguém pode sujar a água.',
        'A fonte vira o primeiro "bem público" com regras da ilha.',
        { aristoteles: 3, montesquieu: 1, mill: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e11',
    tipo: 'evento',
    depoisDe: 5,
    titulo: 'A jangada',
    texto:
      'Um cadete quer construir uma jangada e tentar chegar sozinho a outra ilha. Para isso, precisa da madeira que seria usada nos abrigos.',
    opcoes: [
      op(
        'Ele é livre para arriscar a própria vida. Mas a madeira, ele tem que conseguir sozinho.',
        'Ele passa dias cortando madeira. A jangada fica pronta — e pequena.',
        { hayek: 2, mill: 2, locke: 1 },
        0,
      ),
      op(
        'Não. A madeira é do grupo e o risco é grande demais.',
        'Ele fica frustrado e começa a se aproximar da tribo de Jack.',
        { burke: 2, hobbes: 1, rawls: 1 },
        0,
      ),
      op(
        'Todos votam: se a maioria achar que vale, ele vai com a madeira do grupo.',
        'O grupo vota a favor. Se ele conseguir, pode trazer ajuda para todos.',
        { rousseau: 2, dewey: 1, mill: 1 },
        1,
      ),
      op(
        'Estudar antes: correntes, ventos, distância. Só vai se houver chance real.',
        'O estudo mostra que a corrente o levaria para o mar aberto. Ele desiste — e continua vivo.',
        { comte: 2, dewey: 2, platao: 1 },
        1,
      ),
      op(
        'Deixo ele ir. Se der certo, ótimo; se não, é um a menos para dividir a comida.',
        'Ninguém tem coragem de dizer isso em voz alta. Mas muitos pensam.',
        { nietzsche: 2, maquiavel: 1, kant: -1 },
        -1,
      ),
    ],
  },
  {
    id: 'e12',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'Quem faz o quê',
    texto:
      'Ralph pede ajuda para organizar as tarefas: fogo, pesca, abrigos, água, caça e cuidar dos pequenos.',
    opcoes: [
      op(
        'Cada um faz aquilo em que é melhor: o mais forte caça, o mais esperto planeja.',
        'Funciona bem. Mas quem "não é bom em nada" se sente sobrando.',
        { platao: 3, aristoteles: 1 },
        1,
      ),
      op(
        'Especialização total: cada um faz uma coisa só e troca o resultado com os outros.',
        'A produção aumenta. E todo mundo passa a depender de todo mundo.',
        { smith: 3, durkheim: 1 },
        1,
      ),
      op(
        'Rodízio: todos fazem todas as tarefas, para ninguém ficar sempre com a pior.',
        'Ninguém fica preso ao pior trabalho. Mas o fogo, às vezes, fica com quem não sabe cuidar dele.',
        { marx: 2, rawls: 2, rousseau: 1 },
        1,
      ),
      op(
        'Seguir a hierarquia da academia: os de patente mais alta distribuem as tarefas.',
        'Os cadetes obedecem por hábito. Os pequenos, que não têm patente, ficam com o pior.',
        { burke: 2, weber: 2, hobbes: 1 },
        0,
      ),
      op(
        'Cada um escolhe o que quer fazer; se faltar gente em alguma tarefa, a gente vê.',
        'Quase todos escolhem caçar. Ninguém escolhe cuidar da latrina.',
        { hayek: 3, dewey: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e13',
    tipo: 'evento',
    depoisDe: 2,
    titulo: 'O apelido',
    texto:
      'Os garotos inventaram um apelido para um colega gordinho e de óculos, e riem sempre que ele tenta falar na assembleia. Ele finge que não liga.',
    opcoes: [
      op(
        'Defendo ele na frente de todos. Ninguém merece ser humilhado.',
        'As risadas param. Por enquanto.',
        { kant: 2, rawls: 2 },
        1,
      ),
      op(
        'Rio junto. É só brincadeira, e assim ninguém me zoa também.',
        'Você fica do lado "seguro". Ele percebe — e para de tentar falar.',
        { maquiavel: 1, hobbes: 1, durkheim: 1 },
        -1,
      ),
      op(
        'Crio uma regra: na assembleia, quem zoar quem está falando perde a vez.',
        'A regra funciona nas reuniões. Fora delas, a zoação continua.',
        { weber: 2, montesquieu: 1, locke: 1 },
        1,
      ),
      op(
        'Chamo os garotos para conversar sobre como seria se fosse com eles.',
        'Alguns ficam sem graça. Um deles pede desculpas, meio sem jeito.',
        { freire: 2, rousseau: 1, rawls: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Mostro que ele é o mais inteligente do grupo, dando a ele uma tarefa importante.',
        'Quando as ideias dele funcionam, os garotos passam a respeitá-lo — um pouco.',
        { platao: 2, dewey: 1, mill: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e14',
    tipo: 'evento',
    depoisDe: 5,
    titulo: 'Pintura de guerra',
    texto:
      'Os caçadores começam a pintar o rosto com barro e carvão. Dizem que assim os porcos não os veem. Mas, pintados, eles parecem outras pessoas — e agem como outras pessoas.',
    opcoes: [
      op(
        'Proíbo. A máscara faz as pessoas perderem a vergonha.',
        'Os caçadores obedecem na praia e se pintam escondidos na mata.',
        { burke: 2, hobbes: 1, kant: 1 },
        1,
      ),
      op(
        'É só uma técnica de caça. Se funciona, ótimo.',
        'A caça melhora. E a pintura fica cada vez mais assustadora.',
        { dewey: 2, mill: 1, smith: 1 },
        0,
      ),
      op(
        'Pinto também: faz parte de pertencer ao grupo.',
        'Com a pintura, você sente a força do grupo. E sente a vergonha ir embora.',
        { durkheim: 3, nietzsche: 1 },
        -1,
      ),
      op(
        'A pintura é um símbolo de poder: quem se pinta vira "da tribo". Precisamos dos nossos próprios símbolos.',
        'Vocês adotam a concha como símbolo. Mas uma concha não assusta ninguém.',
        { gramsci: 3, weber: 1 },
        0,
      ),
      op(
        'Cada um faz o que quiser com o próprio rosto.',
        'Ninguém proíbe nada. Em uma semana, só você e Piggy continuam sem pintura.',
        { hayek: 2, mill: 2, nietzsche: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e15',
    tipo: 'evento',
    depoisDe: 9,
    titulo: 'A proposta',
    texto:
      'Um caçador da tribo de Jack aparece escondido e oferece carne fresca. Em troca, quer que você deixe o fogo "descuidado" esta noite.',
    opcoes: [
      op(
        'Aceito. Estou com fome, e um fogo por uma noite não faz diferença.',
        'A carne é boa. Na manhã seguinte, a fogueira de sinal está destruída.',
        { hobbes: 1, maquiavel: 1, smith: 1, nietzsche: 1 },
        -1,
      ),
      op(
        'Recuso e conto a Ralph imediatamente.',
        'Ralph reforça a vigia. Naquela noite, a tribo não consegue chegar ao fogo.',
        { kant: 2, weber: 1, locke: 1 },
        1,
      ),
      op(
        'Faço uma contraproposta: a carne em troca de fogo para a tribo deles, sem sabotagem.',
        'O caçador volta dias depois com carne. A troca ainda é possível — com quem quer trocar.',
        { smith: 3, aristoteles: 1, dewey: 1 },
        1,
      ),
      op(
        'Aceito a carne e não cumpro o trato. Com quem não tem palavra, não preciso ter.',
        'Você come e o fogo segue aceso. Mas agora Jack sabe que você é um alvo.',
        { maquiavel: 3, nietzsche: 1, kant: -1 },
        0,
      ),
      op(
        'Aproveito para convencê-lo a voltar para o grupo de Ralph.',
        'Ele diz que não pode: na tribo, quem sai é caçado. Mas vai embora pensativo.',
        { gramsci: 2, freire: 1, rousseau: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e16',
    tipo: 'evento',
    depoisDe: 4,
    titulo: 'As leis na pedra',
    texto:
      'Piggy sugere escrever as regras da ilha numa pedra lisa, para ninguém dizer depois que "não sabia".',
    opcoes: [
      op(
        'Ótima ideia. Lei escrita vale igual para todos.',
        'A pedra das leis vira o centro do governo da praia.',
        { weber: 3, montesquieu: 1, kant: 1 },
        1,
      ),
      op(
        'Não precisa: as boas regras a gente já traz de casa, no costume.',
        'As regras continuam só na memória. Cada um lembra de um jeito.',
        { burke: 3, durkheim: 1 },
        0,
      ),
      op(
        'Só se as regras forem decididas por todos antes de serem escritas.',
        'A assembleia leva dois dias, mas cada regra na pedra é de todos.',
        { rousseau: 3, locke: 1 },
        1,
      ),
      op(
        'Poucas regras, só o essencial: não roubar, não bater, cuidar do fogo.',
        'Três regras cabem na pedra. Todos conseguem lembrar delas.',
        { hayek: 2, mill: 1, aristoteles: 1, locke: 1 },
        1,
      ),
      op(
        'Tanto faz. Regra só vale se houver alguém forte para fazer cumprir.',
        'Você não está errado. Mas uma regra escrita pelo menos deixa claro quem a quebrou.',
        { hobbes: 2, maquiavel: 2 },
        -1,
      ),
    ],
  },
  {
    id: 'e17',
    tipo: 'evento',
    depoisDe: 7,
    titulo: 'Poder de emergência',
    texto:
      'Depois do fogo apagado, Ralph pensa em anunciar: "Até o resgate, eu decido tudo sozinho. Sem assembleias." Ele pede a sua opinião.',
    opcoes: [
      op(
        'Apoio. Em crise, precisamos de um comando só, rápido e firme.',
        'Ralph tenta, mas não tem o jeito de Jack para mandar. Os garotos obedecem ainda menos.',
        { hobbes: 3, weber: 1 },
        0,
      ),
      op(
        'Não. Se ele pode tudo, quem vai controlá-lo? O poder precisa de limites.',
        'Ralph desiste. As assembleias continuam, só que mais curtas e objetivas.',
        { montesquieu: 3, hayek: 1, locke: 1 },
        1,
      ),
      op(
        'Só se for por tempo limitado e aprovado pela assembleia.',
        'A assembleia aprova três dias de "emergência". Depois, tudo volta ao normal.',
        { aristoteles: 3, locke: 2, weber: 1 },
        1,
      ),
      op(
        'Que decida um conselho dos mais sensatos: Ralph, Piggy e Simon.',
        'O conselho toma boas decisões. Mas os outros garotos se sentem de fora.',
        { platao: 3, comte: 1 },
        1,
      ),
      op(
        'Tanto faz quem manda: o que importa é se o fogo fica aceso.',
        'Seu foco no resultado ajuda. Mas a pergunta sobre quem manda não some.',
        { mill: 2, dewey: 2, maquiavel: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e18',
    tipo: 'evento',
    depoisDe: 9,
    titulo: 'O desertor',
    texto:
      'Um garoto da tribo de Jack aparece à noite, machucado. Quer voltar para o grupo de Ralph, mas tem medo: quem sai da tribo é caçado.',
    opcoes: [
      op(
        'Acolho. Todo mundo merece uma segunda chance.',
        'Ele chora de alívio. E conta segredos sobre a tribo de Jack.',
        { rousseau: 2, kant: 1, rawls: 1 },
        1,
      ),
      op(
        'Desconfio. Pode ser um espião de Jack.',
        'Vocês o mandam embora. Nunca vão saber se era verdade.',
        { hobbes: 2, maquiavel: 2 },
        0,
      ),
      op(
        'Aceito, mas ele tem que provar lealdade trabalhando no fogo.',
        'Ele trabalha dobrado por uma semana. Depois, é um de vocês.',
        { locke: 2, weber: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Uso ele para descobrir os planos de Jack; depois vejo o que faço.',
        'As informações são valiosas. Ele percebe que só é útil para você — e some de novo.',
        { maquiavel: 3, kant: -1 },
        -1,
      ),
      op(
        'Ele escolheu ir; ele que assuma as consequências.',
        'Ele volta para a mata. Você não sabe se para a tribo ou para longe de todos.',
        { nietzsche: 2, hayek: 1 },
        -1,
      ),
    ],
  },
  {
    id: 'e19',
    tipo: 'evento',
    depoisDe: 9,
    titulo: 'As árvores de fruta',
    texto:
      'A tribo de Jack declara que as árvores de fruta do norte agora são "território da tribo". Quem pegar fruta ali sem permissão vai apanhar.',
    opcoes: [
      op(
        'Ninguém é dono de árvore que nasceu sozinha. A natureza é de todos.',
        'Vocês colhem mesmo assim. Dois garotos voltam machucados.',
        { rousseau: 3, marx: 1 },
        0,
      ),
      op(
        'Se eles cuidam das árvores, até faz sentido. Se não, é só roubo com outro nome.',
        'Vocês descobrem que ninguém cuida das árvores. A "propriedade" deles é só força.',
        { locke: 3, smith: 1 },
        0,
      ),
      op(
        'Negociar: fruta em troca de peixe.',
        'Jack aceita — desde que vocês reconheçam que as árvores são dele.',
        { smith: 2, dewey: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Invadir de noite e pegar o que precisamos. Contra a força, astúcia.',
        'Funciona uma vez. Na segunda, os caçadores estão esperando.',
        { maquiavel: 2, nietzsche: 1, hobbes: 1 },
        -1,
      ),
      op(
        'É o começo da desigualdade: quem tem as árvores vai mandar em quem não tem.',
        'Você explica isso numa assembleia. Os garotos entendem o perigo — mas continuam com fome.',
        { marx: 2, rousseau: 1, gramsci: 1, rawls: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e20',
    tipo: 'evento',
    depoisDe: 5,
    titulo: 'O melhor caçador',
    texto:
      'O melhor caçador da ilha diz que merece uma porção maior de carne: sem ele, ninguém comeria.',
    opcoes: [
      op(
        'Justo. Quem produz mais deve receber mais — isso incentiva todo mundo.',
        'Os caçadores se esforçam mais. E quem cuida do fogo se sente menos valorizado.',
        { smith: 2, locke: 1, hayek: 1, nietzsche: 1 },
        0,
      ),
      op(
        'Não. Ele só caça porque outros mantêm o fogo, os abrigos e a água.',
        'Ele fica irritado, mas não tem resposta. A dependência de uns com os outros fica clara.',
        { marx: 3, durkheim: 1 },
        1,
      ),
      op(
        'Porção maior, sim, mas só se isso não deixar os pequenos com menos.',
        'Ele recebe um pouco mais; os pequenos, o suficiente. Todos aceitam.',
        { rawls: 3, aristoteles: 1 },
        1,
      ),
      op(
        'Divisão igual, sempre. Na ilha somos todos iguais.',
        'A igualdade agrada a maioria. O caçador começa a caçar menos.',
        { rousseau: 2, marx: 1 },
        0,
      ),
      op(
        'Ele merece — e é bom manter o melhor caçador do nosso lado antes que Jack o leve.',
        'Ele fica. E você aprende que lealdade também tem preço.',
        { maquiavel: 2, mill: 1 },
        0,
      ),
    ],
  },
  {
    id: 'e21',
    tipo: 'evento',
    depoisDe: 3,
    titulo: 'As patentes',
    texto:
      'Alguns cadetes querem reorganizar o grupo como na academia: com patentes, continências e um "coronel" no comando.',
    opcoes: [
      op(
        'Boa ideia. A hierarquia da academia funcionava; vamos mantê-la.',
        'Os cadetes se sentem em casa. Os pequenos, sem patente, viram "recrutas" de todos.',
        { burke: 3, weber: 1, hobbes: 1 },
        1,
      ),
      op(
        'Não! Aqui ninguém tem patente. Somos iguais e decidimos juntos.',
        'A igualdade agrada os pequenos. Os cadetes mais velhos se sentem rebaixados.',
        { rousseau: 2, marx: 1, freire: 1 },
        1,
      ),
      op(
        'Patentes, sim, mas pelo mérito aqui na ilha, não pelo que era na academia.',
        'Simon vira "capitão" do cuidado com os pequenos. Ninguém esperava.',
        { platao: 2, weber: 1, smith: 1 },
        1,
      ),
      op(
        'Cuidado: disciplina militar é exatamente o que Jack quer para mandar em todos.',
        'Você tinha razão. Poucos dias depois, Jack se autoproclama "coronel" da tribo.',
        { montesquieu: 1, hayek: 1, gramsci: 1 },
        0,
      ),
      op(
        'Pode ser útil em emergências, mas não no dia a dia.',
        'Vocês combinam: patentes só na vigia noturna e nas caçadas. O resto se decide em assembleia.',
        { aristoteles: 3, dewey: 1 },
        1,
      ),
    ],
  },
  {
    id: 'e22',
    tipo: 'evento',
    depoisDe: 8,
    titulo: 'Oferendas',
    texto:
      'Com medo da fera, alguns pequenos começam a deixar frutas e peixes na entrada da mata "para ela não vir". A comida está fazendo falta.',
    opcoes: [
      op(
        'Proíbo. Não vou desperdiçar comida com superstição.',
        'As oferendas param. Mas o medo fica sem ter para onde ir.',
        { comte: 2, platao: 1, hobbes: 1 },
        1,
      ),
      op(
        'Deixo. Se isso os acalma e mantém o grupo unido, vale a pena.',
        'O ritual vira parte da rotina. E rituais, uma vez criados, crescem.',
        { durkheim: 3, burke: 1 },
        0,
      ),
      op(
        'Explico, com paciência, de onde vêm os barulhos da mata à noite.',
        'Os pequenos entendem que são porcos e o vento. Alguns ainda deixam uma fruta "só por garantia".',
        { freire: 2, comte: 1, dewey: 1 },
        1,
      ),
      op(
        'Uso as oferendas: quem quiser proteção contra a fera traz comida para mim.',
        'É exatamente o que Jack faz. Você só chegou antes.',
        { maquiavel: 3, nietzsche: 1, kant: -1 },
        -1,
      ),
      op(
        'Cada um faz o que quiser com a própria comida.',
        'Os pequenos continuam dando comida à "fera". E continuam com fome.',
        { hayek: 2, mill: 2 },
        0,
      ),
    ],
  },
  {
    id: 'e23',
    tipo: 'evento',
    depoisDe: 5,
    titulo: 'A maioria',
    texto:
      'Numa assembleia, a maioria vota para largar a fogueira do morro e mudar o acampamento para perto da mata, onde a caça é fácil. Você e alguns outros acham um erro grave.',
    opcoes: [
      op(
        'A maioria decidiu, está decidido. É assim que funciona.',
        'O acampamento muda. O fogo do morro fica cada vez mais fraco.',
        { rousseau: 2, locke: 1 },
        0,
      ),
      op(
        'A maioria não pode tudo. Algumas coisas, como o fogo do resgate, não se votam.',
        'Vocês garantem um turno mínimo no fogo, mesmo contra a maioria.',
        { mill: 2, montesquieu: 1, kant: 1, rawls: 1 },
        1,
      ),
      op(
        'Convencer um por um, até virar a votação.',
        'Leva dias, mas a nova votação mantém o fogo aceso no morro.',
        { gramsci: 2, freire: 1, aristoteles: 1 },
        1,
      ),
      op(
        'Ignoro a votação e continuo cuidando do fogo com quem quiser.',
        'Vocês são poucos, mas o fogo não apaga.',
        { hayek: 2, nietzsche: 1 },
        0,
      ),
      op(
        'Peço ao chefe para anular a votação. Tem decisão que não é para todo mundo tomar.',
        'Ralph anula a votação. O fogo fica, mas a confiança nas assembleias diminui.',
        { platao: 2, hobbes: 2 },
        0,
      ),
    ],
  },
];

export const TODAS_AS_SITUACOES: Situacao[] = [...CENAS_DO_FILME, ...EVENTOS];

export const SITUACAO_POR_ID = Object.fromEntries(TODAS_AS_SITUACOES.map((s) => [s.id, s])) as Record<
  string,
  Situacao
>;
