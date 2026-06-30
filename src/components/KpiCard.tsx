interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  delay?: number;
}

export function KpiCard({ label, value, sub, accent, delay = 0 }: KpiCardProps) {
  return (
    <div
      className="fade-up"
      style={{
        '--td': `${delay}ms`,
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderTop: `3px solid ${accent || 'var(--gold)'}`,
        borderRadius: '8px',
        padding: '20px 24px',
      } as React.CSSProperties}
    >
      <p
        style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '8px',
          fontFamily: 'var(--font-outfit, system-ui)',
        }}
      >
        {label}
      </p>
      <p
        className="display"
        style={{
          fontSize: '2.25rem',
          color: accent || 'var(--charcoal)',
          lineHeight: 1,
          marginBottom: sub ? '6px' : 0,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
