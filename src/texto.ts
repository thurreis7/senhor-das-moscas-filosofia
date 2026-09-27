export type Genero = 'menino' | 'menina';

export interface Perfil {
  nome: string;
  genero: Genero;
}

/** Troca {nome} pelo nome do jogador e {masculino|feminino} pela forma certa. */
export function personalizar(texto: string, perfil: Perfil): string {
  return texto
    .replace(/\{nome\}/g, perfil.nome || 'cadete')
    .replace(/\{([^{}|]*)\|([^{}|]*)\}/g, (_, m: string, f: string) => (perfil.genero === 'menina' ? f : m));
}
