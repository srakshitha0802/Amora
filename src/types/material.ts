export type EmblemFinish = 'rose-gold' | 'plum-enamel' | 'velvet-ceramic' | 'champagne-chrome';

export interface FinishOption {
  id: EmblemFinish;
  name: string;
  badge: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  bezelColor: string;
  ringColor1: string;
  ringColor2: string;
  particleColors: [string, string, string];
}

export const EMBLEM_FINISHES: Record<EmblemFinish, FinishOption> = {
  'rose-gold': {
    id: 'rose-gold',
    name: 'Rose-Gold Foil',
    badge: 'Hot Stamped',
    metalness: 0.9,
    roughness: 0.14,
    clearcoat: 0.9,
    bezelColor: '#D87A6E',
    ringColor1: '#E88A98',
    ringColor2: '#F3C69F',
    particleColors: ['#D87A6E', '#E88A98', '#F3C69F'],
  },
  'plum-enamel': {
    id: 'plum-enamel',
    name: 'Plum Enamel',
    badge: 'Gloss Lacquer',
    metalness: 0.85,
    roughness: 0.12,
    clearcoat: 1.0,
    bezelColor: '#5C3165',
    ringColor1: '#8C4898',
    ringColor2: '#E88A98',
    particleColors: ['#5C3165', '#8C4898', '#E88A98'],
  },
  'velvet-ceramic': {
    id: 'velvet-ceramic',
    name: 'Velvet Ceramic',
    badge: 'Matte Porcelain',
    metalness: 0.2,
    roughness: 0.45,
    clearcoat: 0.3,
    bezelColor: '#E8DDD5',
    ringColor1: '#F3C69F',
    ringColor2: '#D87A6E',
    particleColors: ['#FAF6F0', '#F3C69F', '#D87A6E'],
  },
  'champagne-chrome': {
    id: 'champagne-chrome',
    name: 'Mirror Chrome',
    badge: 'High Polish',
    metalness: 0.96,
    roughness: 0.06,
    clearcoat: 1.0,
    bezelColor: '#E2A877',
    ringColor1: '#FAF6F0',
    ringColor2: '#E88A98',
    particleColors: ['#E2A877', '#FAF6F0', '#E88A98'],
  },
};
