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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                gridTemplateColumns: '28px 1fr auto',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderLeft: `4px solid ${info.color}`,
                borderRadius: '6px',
                transition: 'box-shadow 0.15s, transform 0.15s',
                cursor: 'pointer',
              }}
              className="process-rank-row"
            >
              {/* rank number */}
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

              {/* bar + name */}
              <div style={{ overflow: 'hidden' }}>
                <p
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--charcoal)',
                    marginBottom: '5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: 'var(--font-outfit, system-ui)',
                  }}
                >
                  {p.nome}
                </p>
                <div style={{ height: '5px', background: 'var(--warm-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    className="bar-animated"
                    style={{
                      '--tw': `${pct}%`,
                      '--td': `${delay}ms`,
                      height: '100%',
                      background: info.color,
                      borderRadius: '3px',
                      opacity: p.pontuacaoGut ? 1 : 0.3,
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* score badge */}
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
