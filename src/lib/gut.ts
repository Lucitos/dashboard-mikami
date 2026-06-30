export type GutLevel = 'critical' | 'high' | 'medium' | 'low' | 'none';

export interface GutInfo {
  level: GutLevel;
  label: string;
  color: string;
  bg: string;
  border: string;
}

export function getGutInfo(pontuacao: number | null): GutInfo {
  if (pontuacao === null) return { level: 'none', label: 'N/A', color: 'var(--gut-none)', bg: 'var(--gut-none-bg)', border: '#D5D0CB' };
  if (pontuacao >= 60) return { level: 'critical', label: 'CRÍTICO', color: 'var(--gut-critical)', bg: 'var(--gut-critical-bg)', border: 'var(--gut-critical)' };
  if (pontuacao >= 20) return { level: 'high', label: 'ALTO', color: 'var(--gut-high)', bg: 'var(--gut-high-bg)', border: 'var(--gut-high)' };
  if (pontuacao >= 8)  return { level: 'medium', label: 'MÉDIO', color: 'var(--gut-medium)', bg: 'var(--gut-medium-bg)', border: 'var(--gut-medium)' };
  return { level: 'low', label: 'BAIXO', color: 'var(--gut-low)', bg: 'var(--gut-low-bg)', border: 'var(--gut-low)' };
}

export const GUT_SCALE: Record<number, string> = {
  1: 'Sem/Não irá mudar',
  2: 'Pouco grave / longo prazo',
  3: 'Grave / Urgente',
  4: 'Muito Grave / Muito urgente',
  5: 'Extremamente Grave / Pra ontem',
};

export const MAX_SCORE = 125; // 5×5×5
