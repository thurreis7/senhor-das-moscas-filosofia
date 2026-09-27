import { fundoFixo, frenteFixa } from './pixel/cenario';
import { sprite, type Aparencia } from './pixel/sprites';

export interface DadosImagem {
  nome: string;
  aparencia: Aparencia;
  final: string;
  top: { nome: string; grupo: string; cor: string; porcentagem: number }[];
  url: string;
}

/** Gera um PNG 1200x630 com o resultado, para baixar ou compartilhar. */
export async function gerarImagemResultado(d: DadosImagem): Promise<Blob> {
  await Promise.all([
    document.fonts.load('700 40px "Pixelify Sans"'),
    document.fonts.load('600 20px "Inter"'),
  ]).catch(() => undefined);
  const c = document.createElement('canvas');
  c.width = 1200;
  c.height = 630;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  // fundo: praia ao entardecer, escurecida
  ctx.drawImage(fundoFixo('praia', 'tarde'), 0, 0, 1200, 675);
  const frente = frenteFixa('praia');
  if (frente) ctx.drawImage(frente, 0, 0, 1200, 675);
  ctx.fillStyle = 'rgba(12,10,8,0.62)';
  ctx.fillRect(0, 0, 1200, 630);

  // personagem
  const img = sprite({ ...d.aparencia, pintura: d.aparencia.pintura });
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(110, 486, 190, 16);
  ctx.drawImage(img, 110, 190, 16 * 12, img.height * 12);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f39c34';
  ctx.font = '700 34px "Pixelify Sans", monospace';
  ctx.fillText(d.nome, 205, 548);

  // título
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff6e0';
  ctx.font = '700 44px "Pixelify Sans", monospace';
  ctx.fillText('Na ilha, eu pensei como…', 400, 110);
  ctx.fillStyle = '#b9ad92';
  ctx.font = '500 22px Inter, sans-serif';
  ctx.fillText(`Final: ${d.final}`, 402, 148);

  // top 4
  d.top.forEach((p, i) => {
    const y = 210 + i * 88;
    ctx.fillStyle = '#f39c34';
    ctx.font = '700 40px "Pixelify Sans", monospace';
    ctx.fillText(`${i + 1}º`, 400, y + 30);
    ctx.fillStyle = '#fff6e0';
    ctx.font = `700 ${i === 0 ? 34 : 30}px "Pixelify Sans", monospace`;
    ctx.fillText(p.nome, 470, y + 26);
    ctx.fillStyle = '#b9ad92';
    ctx.font = '600 17px Inter, sans-serif';
    ctx.fillText(p.grupo.toUpperCase(), 472, y + 52);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff6e0';
    ctx.font = '700 32px "Pixelify Sans", monospace';
    ctx.fillText(`${p.porcentagem}%`, 1140, y + 26);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000';
    ctx.fillRect(640, y + 40, 500, 12);
    ctx.fillStyle = p.cor;
    ctx.fillRect(640, y + 40, Math.round(5 * p.porcentagem), 12);
  });

  // rodapé
  ctx.fillStyle = '#f39c34';
  ctx.fillRect(0, 586, 1200, 44);
  ctx.fillStyle = '#1a120c';
  ctx.font = '700 22px "Pixelify Sans", monospace';
  ctx.fillText('O Senhor das Moscas — Edição Filosófica · Turma 305', 30, 615);
  ctx.textAlign = 'right';
  ctx.font = '600 18px Inter, sans-serif';
  ctx.fillText(d.url.replace(/^https?:\/\//, '').replace(/\/$/, ''), 1170, 614);

  return new Promise((resolver, rejeitar) =>
    c.toBlob((b) => (b ? resolver(b) : rejeitar(new Error('Falha ao gerar imagem'))), 'image/png'),
  );
}
