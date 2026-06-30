import Link from 'next/link';
import { Process } from '@/data/processes';
import { getGutInfo, MAX_SCORE } from '@/lib/gut';

interface PriorityRankingProps {
  processes: Process[];
}

export function PriorityRanking({ processes }: PriorityRankingProps) {
  const ranked = [...processes].sort(
    (a, b) => (b.pontuacaoGut ?? -1) - (a.pontuacaoGut ?? -1)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {ranked.map((p, i) => {
        const info = getGutInfo(p.pontuacaoGut);
        const pct = p.pontuacaoGut ? Math.max(4, (p.pontuacaoGut / MAX_SCORE) * 100) : 3;
        const delay = i * 60;

        return (
          <Link
            key={p.slug}
            href={`/processos/${p.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr auto',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                borderLeft: `3px solid ${info.color}`,
                borderRadius: '10px',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.15s, transform 0.15s',
                cursor: 'pointer',
              } as React.CSSProperties}
              className="process-rank-row"
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant, Georgia, serif)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textAlign: 'right',
                }}
              >
                {i + 1}
              </span>

              <div style={{ overflow: 'hidden' }}>
                <p
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--charcoal)',
                    marginBottom: '6px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'var(--font-outfit, system-ui)',
                  }}
                >
                  {p.nome}
                </p>
                <div style={{ height: '4px', background: 'rgba(26,23,20,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    className="bar-animated"
                    style={{
                      '--tw': `${pct}%`,
                      '--td': `${delay}ms`,
                      height: '100%',
                      background: info.color,
                      borderRadius: '2px',
                      opacity: p.pontuacaoGut ? 1 : 0.3,
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-outfit, system-ui)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: info.color,
                    background: info.bg,
                    border: `1px solid ${info.color}`,
                    borderRadius: '4px',
                    padding: '2px 7px',
                  }}
                >
                  {p.pontuacaoGut !== null ? p.pontuacaoGut : '—'}
                </span>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '3px', fontFamily: 'var(--font-outfit, system-ui)' }}>
                  {info.label}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
