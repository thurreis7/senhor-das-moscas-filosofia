# O Senhor das Moscas — Edição Filosófica

Jogo de navegador feito para o trabalho de Filosofia da Turma 305 (IFRJ), baseado no filme *O Senhor das Moscas* (1990).
O jogador cria um personagem, vive 20 situações na ilha (12 cenas do filme + 8 imprevistos sorteados) e descobre com quais pensadores mais se parece.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço que aparecer (normalmente http://localhost:5173).

## Onde editar os textos

Tudo fica em `src/data/`:

| Arquivo | O que tem |
|---|---|
| `situacoes.ts` | As 35 situações: texto, 5 opções, consequências e pontos de cada pensador |
| `cenas.ts` | Como cada situação aparece: cenário, hora do dia, quem fala e a fala |
| `pensadores.ts` | Os 21 pensadores: ideia central e relação com o filme |
| `finais.ts` | Escolha inicial (Hobbes, Locke, Rousseau) e os 3 finais |

Marcadores especiais nos textos:
- `{nome}` vira o nome do jogador;
- `{o|a}` vira "o" para menino e "a" para menina (ex.: `sozinh{o|a}`).

Depois de mexer nos pontos, rode `npm run balance` para conferir se nenhum pensador ficou fácil ou difícil demais.

## Publicar

O projeto é um site estático (Vite). Na Vercel: **Add New → Project → importar o repositório do GitHub**. As configurações padrão (Vite, `npm run build`, pasta `dist`) já funcionam. Cada `git push` publica uma nova versão.
