import Link from 'next/link';
import { Process } from '@/data/processes';
import { getGutInfo } from '@/lib/gut';
import { GutBadge } from './GutBadge';

interface ProcessCardProps {
  process: Process;
  delay?: number;
}

export function ProcessCard({ process: p, delay = 0 }: ProcessCardProps) {
  const info = getGutInfo(p.pontuacaoGut);

  return (
    <Link href={`/processos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        className="process-card fade-up"
        style={{
          '--td': `${delay}ms`,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: `3px solid ${info.color}`,
          borderRadius: '8px',
          padding: '18px 20px',
          height: '100%',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(26,23,20,0.05)',
        } as React.CSSProperties}
      >
        <div style={{ marginBottom: '10px' }}>
          <GutBadge pontuacao={p.pontuacaoGut} size="sm" />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: '8px',
            lineHeight: 1.25,
          }}
        >
          {p.nome}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            <span style={{ fontWeight: 500, color: 'var(--gold)' }}>Consultor</span> · {p.consultor}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            <span style={{ fontWeight: 500 }}>Cargo</span> · {p.cargoExecutor}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <Chip label={`${p.numAtividades} ativ.`} />
          {p.processoRotineiro && <Chip label="Rotineiro" />}
          {p.correlacionamento && <Chip label="Multi-área" color="var(--gold-muted)" text="var(--gold)" />}
        </div>

        {p.riscos.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gut-critical)', marginBottom: '4px', fontFamily: 'var(--font-outfit, system-ui)' }}>
              {p.riscos.length} {p.riscos.length === 1 ? 'risco' : 'riscos'} identificados
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

function Chip({ label, color, text }: { label: string; color?: string; text?: string }) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.68rem',
      fontWeight: 500,
      background: color || 'var(--warm-dark)',
      color: text || 'var(--text-muted)',
      padding: '2px 8px',
      borderRadius: '3px',
      fontFamily: 'var(--font-outfit, system-ui)',
    }}>
      {label}
    </span>
  );
}
