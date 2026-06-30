import { notFound } from 'next/navigation';
import { processes } from '@/data/processes';
import { Header } from '@/components/Header';
import { GutBadge } from '@/components/GutBadge';
import { getGutInfo } from '@/lib/gut';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return processes.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = processes.find(x => x.slug === slug);
  if (!p) return {};
  return { title: `${p.nome} | Mikami` };
}

export default async function ProcessoPage({ params }: PageProps) {
  const { slug } = await params;
  const p = processes.find(x => x.slug === slug);
  if (!p) notFound();

  const info = getGutInfo(p.pontuacaoGut);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm)' }}>
      <Header
        subtitle="Processos"
        back={{ href: '/', label: 'Voltar ao Dashboard' }}
      />

      {/* Process hero */}
      <div style={{ background: 'var(--red)', padding: '32px 0 28px', borderBottom: `4px solid var(--gold)` }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ marginBottom: '12px' }}>
            <GutBadge
              pontuacao={p.pontuacaoGut}
              gravidade={p.gravidade}
              urgencia={p.urgencia}
              tendencia={p.tendencia}
              size="lg"
            />
          </div>
          <h1
            className="display"
            style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '10px' }}
          >
            {p.nome}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <MetaChip label="Consultor" value={p.consultor} color="var(--gold-light)" />
            <MetaChip label="Cargo" value={p.cargoExecutor} />
            <MetaChip label="Atividades" value={`${p.numAtividades}`} />
            {p.processoRotineiro && <MetaChip label="Tipo" value="Rotineiro" />}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Metadata row */}
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}>
            <InfoBox
              icon="⚡"
              label="Gatilho de Início"
              value={p.gatilhoInicio}
            />
            <InfoBox
              icon="🔗"
              label="Correlacionamento"
              value={p.correlacionamento ? `Sim — ${p.correlacionamentoAreas}` : 'Não'}
            />
            <InfoBox
              icon="📂"
              label="Documentos / Armazenamento"
              value={p.documentos}
            />
            {p.observacoes && (
              <InfoBox icon="📝" label="Observações" value={p.observacoes} />
            )}
          </div>
        </section>

        {/* Análise Crítica */}
        {p.analiseCritica && (
          <Card title="Análise Crítica">
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'var(--charcoal)',
              fontFamily: 'var(--font-outfit, system-ui)',
              whiteSpace: 'pre-wrap',
            }}>
              {p.analiseCritica}
            </p>
          </Card>
        )}

        {/* Riscos + Gargalos + Planos */}
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {p.riscos.length > 0 && (
              <ItemList
                title="Riscos Identificados"
                items={p.riscos}
                icon="⚠"
                color="var(--gut-critical)"
                bg="var(--gut-critical-bg)"
                border="rgba(215,25,33,0.2)"
              />
            )}
            {p.gargalos.length > 0 && (
              <ItemList
                title="Gargalos Operacionais"
                items={p.gargalos}
                icon="🔒"
                color="var(--gut-high)"
                bg="var(--gut-high-bg)"
                border="rgba(196,122,44,0.2)"
              />
            )}
            {p.planosDeAcao.length > 0 && (
              <ItemList
                title="Planos de Ação"
                items={p.planosDeAcao}
                icon="✓"
                color="var(--gut-low)"
                bg="var(--gut-low-bg)"
                border="rgba(74,138,98,0.2)"
                numbered
              />
            )}
          </div>
        </section>

        {/* POP card */}
        {p.popFile && (
          <Card title="Procedimento Operacional Padrão (POP)">
            {p.resumoPop && (
              <p style={{
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--charcoal)',
                marginBottom: '20px',
                fontFamily: 'var(--font-outfit, system-ui)',
                borderLeft: '3px solid var(--gold)',
                paddingLeft: '14px',
                fontStyle: 'italic',
              }}>
                {p.resumoPop}
                {p.resumoPop.length >= 490 ? '…' : ''}
              </p>
            )}
            <a
              href={`/pops/${encodeURIComponent(p.popFile)}`}
              download={p.popFile}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--charcoal)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: 'var(--font-outfit, system-ui)',
                letterSpacing: '0.04em',
                transition: 'opacity 0.15s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Baixar POP (.docx)
            </a>
          </Card>
        )}

      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 0', background: 'var(--red)', marginTop: '40px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            © 2026 Mikami Supermercados · Análise crítica interna
          </p>
        </div>
      </footer>
    </div>
  );
}

function MetaChip({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-outfit, system-ui)', display: 'block', marginBottom: '2px' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.88rem', color: color || 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-outfit, system-ui)' }}>
        {value}
      </span>
    </div>
  );
}

function InfoBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '16px',
    }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-outfit, system-ui)' }}>
        {icon} {label}
      </p>
      <p style={{ fontSize: '0.88rem', color: 'var(--charcoal)', lineHeight: 1.5, fontFamily: 'var(--font-outfit, system-ui)' }}>
        {value}
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '24px' }}>
      <h2 className="display" style={{ fontSize: '1.4rem', marginBottom: '4px', color: 'var(--charcoal)' }}>
        {title}
      </h2>
      <div style={{ height: '2px', width: '36px', background: 'linear-gradient(to right, var(--red), var(--gold))', marginBottom: '16px' }} />
      {children}
    </div>
  );
}

function ItemList({
  title, items, icon, color, bg, border, numbered,
}: {
  title: string;
  items: string[];
  icon: string;
  color: string;
  bg: string;
  border: string;
  numbered?: boolean;
}) {
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '10px',
      padding: '20px',
    }}>
      <h3 style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color,
        marginBottom: '14px',
        fontFamily: 'var(--font-outfit, system-ui)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span>{icon}</span> {title}
        <span style={{ marginLeft: 'auto', fontWeight: 600, opacity: 0.7 }}>({items.length})</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            {numbered ? (
              <span style={{
                flexShrink: 0,
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: color,
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-outfit, system-ui)',
              }}>
                {i + 1}
              </span>
            ) : (
              <span style={{ flexShrink: 0, color, fontSize: '0.7rem', marginTop: '4px' }}>●</span>
            )}
            <p style={{
              fontSize: '0.86rem',
              color: 'var(--charcoal)',
              lineHeight: 1.55,
              fontFamily: 'var(--font-outfit, system-ui)',
            }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
