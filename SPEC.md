# Especificação — O Senhor das Moscas: Edição Filosófica

Trabalho de Filosofia — Turma 305 (IFRJ). Base: filme *O Senhor das Moscas* (1990, dir. Harry Hook).

## Visão geral
Jogo de navegador narrativo. O jogador é um dos cadetes que caíram na ilha. Vive situações do filme e eventos inventados, escolhendo entre 5 opções (A–E). No fim, descobre com quais pensadores mais se parece. Sem banco de dados, sem login. Deploy na Vercel a partir do GitHub.

## Fluxo
1. **Início** — título, sinopse, "Chegar à ilha", link para créditos.
2. **Escolha inicial** — como a ilha deve ser organizada: Hobbes, Locke ou Rousseau. Muda a introdução e é comparada no resultado.
3. **Partida** — 20 situações (~12 min):
   - 12 cenas do filme, sempre, em ordem;
   - 8 eventos sorteados entre 23, intercalados (cada evento pode exigir uma cena mínima anterior).
   - Após cada escolha: texto curto de consequência.
4. **Epílogo** — 3 finais conforme o saldo civilização × barbárie das escolhas; todos terminam no resgate.
5. **Resultado**
   - Top 4 pensadores com % de afinidade, ideia central, relação com o filme e as 2 situações em que o jogador mais agiu como ele;
   - comparação com o contratualista escolhido no início (posição no ranking);
   - barras por grupo;
   - ranking completo (expansível);
   - compartilhar (link com as escolhas codificadas na URL) e jogar de novo;
   - aviso: os espectros são simplificação didática.
6. **Créditos** — integrantes em ordem alfabética, turma 305.

## Pensadores (7 grupos × 3)
| Grupo | Pensadores |
|---|---|
| Contratualistas | Hobbes, Locke, Rousseau |
| Esquerda | Marx, Gramsci, Paulo Freire |
| Direita | Burke, Adam Smith, Hayek |
| Centro | Aristóteles, Montesquieu, Rawls |
| Pragmatismo | Maquiavel, John Stuart Mill, Dewey |
| Tecnocracia | Platão, Comte, Weber |
| Moral e sociedade | Kant, Nietzsche, Durkheim |

## Pontuação
- Cada opção dá de −1 a +3 pontos para 2–4 pensadores. Nenhuma opção corresponde a um espectro inteiro.
- Afinidade = pontos obtidos ÷ pontos máximos possíveis nas situações realmente jogadas (com suavização), para não favorecer quem apareceu mais.
- Cada opção também tem um valor `civ` (+1 civilização, 0, −1 barbárie) que define o epílogo.

## Conteúdo
- Textos em `src/data/` (`pensadores.ts`, `situacoes.ts`, `finais.ts`) — editáveis sem mexer na lógica.
- 12 cenas do filme de 1990: queda do avião, a concha, eleição, regra da concha, fogo e óculos do Piggy, o capitão ferido, fogo apagado com resgate passando, a "fera", divisão da tribo, o Senhor das Moscas, morte de Simon, roubo dos óculos / Rocha do Castelo.
- 23 eventos originais (comida, roubo, doença, tempestade, propriedade, trabalho, punição, educação etc.).

## Tecnologia
Vite + React + TypeScript, site estático. Visual "diário do náufrago" (papel, fonte manuscrita, ícones SVG), mobile-first.

## Cronograma
- Dom 27/09: especificação, conteúdo, jogo jogável, primeiro deploy.
- Seg 28/09: revisão do grupo e ajustes.
- Ter 29/09: versão final no ar.
