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
    <Link href={`/processos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <div
        className="process-card fade-up"
        style={{
          '--td': `${delay}ms`,
          background: 'white',
          border: '1px solid var(--glass-border)',
          borderTop: `3px solid ${info.color}`,
          borderRadius: '14px',
          padding: '24px 26px',
          height: '100%',
          cursor: 'pointer',
          boxShadow: 'var(--glass-shadow)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        } as React.CSSProperties}
      >
        <div style={{ marginBottom: '14px' }}>
          <GutBadge pontuacao={p.pontuacaoGut} size="sm" />
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: '10px',
            lineHeight: 1.25,
          }}
        >
          {p.nome}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '18px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            <span style={{ fontWeight: 500, color: 'var(--red)' }}>Consultor</span> · {p.consultor}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            <span style={{ fontWeight: 500 }}>Cargo</span> · {p.cargoExecutor}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
          <Chip label={`${p.numAtividades} ativ.`} />
          {p.processoRotineiro && <Chip label="Rotineiro" />}
          {p.correlacionamento && <Chip label="Multi-área" color="var(--red-muted)" text="var(--red)" />}
        </div>

        {p.riscos.length > 0 && (
          <div style={{ marginTop: '14px' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gut-critical)', fontFamily: 'var(--font-outfit, system-ui)' }}>
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
      background: color || 'rgba(26,23,20,0.05)',
      color: text || 'var(--text-muted)',
      padding: '3px 9px',
      borderRadius: '4px',
      fontFamily: 'var(--font-outfit, system-ui)',
    }}>
      {label}
    </span>
  );
}
