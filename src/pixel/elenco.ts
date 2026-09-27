import type { Aparencia } from './sprites';

export type AtorId =
  | 'jogador'
  | 'ralph'
  | 'jack'
  | 'piggy'
  | 'simon'
  | 'roger'
  | 'sam'
  | 'eric'
  | 'cadete'
  | 'cacador'
  | 'pequeno'
  | 'pequena'
  | 'capitao'
  | 'oficial';

export interface Personagem {
  nome: string;
  aparencia: Aparencia;
}

export const ELENCO: Record<Exclude<AtorId, 'jogador'>, Personagem> = {
  ralph: { nome: 'Ralph', aparencia: { pele: '#f1c9a5', cabelo: 'curto', corCabelo: '#d8b25a' } },
  jack: { nome: 'Jack', aparencia: { pele: '#efc19b', cabelo: 'curto', corCabelo: '#a8431f' } },
  piggy: {
    nome: 'Piggy',
    aparencia: { pele: '#f3cfb0', cabelo: 'curto', corCabelo: '#6b4226', oculos: true, camisa: '#8fa3b8' },
  },
  simon: { nome: 'Simon', aparencia: { pele: '#e8b98f', cabelo: 'comprido', corCabelo: '#1f1a17' } },
  roger: { nome: 'Roger', aparencia: { pele: '#e6b48c', cabelo: 'raspado', corCabelo: '#1f1a17' } },
  sam: { nome: 'Sam', aparencia: { pele: '#f1c9a5', cabelo: 'cacheado', corCabelo: '#8a5a33' } },
  eric: { nome: 'Eric', aparencia: { pele: '#f1c9a5', cabelo: 'cacheado', corCabelo: '#8a5a33' } },
  cadete: { nome: 'Cadete', aparencia: { pele: '#c98e62', cabelo: 'crespo', corCabelo: '#1f1a17' } },
  cacador: {
    nome: 'Caçador',
    aparencia: { pele: '#a8683f', cabelo: 'blackpower', corCabelo: '#1f1a17', pintura: true },
  },
  pequeno: {
    nome: 'Um dos pequenos',
    aparencia: { pele: '#f6d5b8', cabelo: 'cacheado', corCabelo: '#d8b25a', porte: 'pequeno' },
  },
  pequena: {
    nome: 'Outro pequeno',
    aparencia: { pele: '#7a4a2a', cabelo: 'crespo', corCabelo: '#1f1a17', porte: 'pequeno' },
  },
  capitao: {
    nome: 'Capitão Benson',
    aparencia: {
      pele: '#eac3a0',
      cabelo: 'curto',
      corCabelo: '#9b948a',
      camisa: '#e9e6dc',
      calca: '#2f3a4a',
      atadura: true,
      porte: 'adulto',
    },
  },
  oficial: {
    nome: 'Oficial',
    aparencia: {
      pele: '#d9a77f',
      cabelo: 'curto',
      corCabelo: '#1f1a17',
      camisa: '#f4f1ea',
      calca: '#f4f1ea',
      quepe: true,
      porte: 'adulto',
    },
  },
};
