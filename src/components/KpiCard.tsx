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
        background: 'white',
        border: '1px solid var(--glass-border)',
        borderTop: `3px solid ${accent || 'var(--red)'}`,
        borderRadius: '14px',
        padding: '28px 32px',
        boxShadow: 'var(--glass-shadow)',
      } as React.CSSProperties}
    >
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '12px',
          fontFamily: 'var(--font-outfit, system-ui)',
        }}
      >
        {label}
      </p>
      <p
        className="display"
        style={{
          fontSize: '2.75rem',
          color: accent || 'var(--charcoal)',
          lineHeight: 1,
          marginBottom: sub ? '8px' : 0,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)', lineHeight: 1.45, marginTop: '4px' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
