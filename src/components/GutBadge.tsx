import { getGutInfo } from '@/lib/gut';

interface GutBadgeProps {
  pontuacao: number | null;
  gravidade?: number | null;
  urgencia?: number | null;
  tendencia?: number | null;
  size?: 'sm' | 'md' | 'lg';
}

export function GutBadge({ pontuacao, gravidade, urgencia, tendencia, size = 'md' }: GutBadgeProps) {
  const info = getGutInfo(pontuacao);

  const sizes = {
    sm: { badge: '0.65rem', score: '0.75rem', pad: '2px 7px' },
    md: { badge: '0.7rem', score: '1rem', pad: '3px 10px' },
    lg: { badge: '0.75rem', score: '1.25rem', pad: '4px 14px' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: info.bg,
          border: `1.5px solid ${info.color}`,
          borderRadius: '4px',
          padding: s.pad,
          color: info.color,
          fontFamily: 'var(--font-outfit, system-ui)',
          fontWeight: 600,
          fontSize: s.badge,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {info.label}
        {pontuacao !== null && (
          <span style={{ fontSize: s.score, fontWeight: 700, opacity: 0.9 }}>
            {pontuacao}
          </span>
        )}
      </span>
      {gravidade && urgencia && tendencia && size !== 'sm' && (
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-outfit, system-ui)' }}>
          G{gravidade} × U{urgencia} × T{tendencia}
        </span>
      )}
    </div>
  );
}
