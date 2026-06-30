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
    <div style={{ minHeight: '100vh', background: 'var(--warm)', position: 'relative' }}>
      {/* Background blobs */}
      <div style={{
        position: 'fixed', top: '-10%', right: '-5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,25,33,0.10) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-15%', left: '-8%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,25,33,0.07) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          subtitle="Processos"
          back={{ href: '/', label: 'Voltar ao Dashboard' }}
        />

        {/* Process hero */}
        <div style={{ background: 'var(--red)', padding: '48px 0 40px' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ marginBottom: '16px' }}>
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
              style={{ color: 'white', fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', marginBottom: '20px', lineHeight: 1.1 }}
            >
              {p.nome}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px' }}>
              <MetaChip label="Consultor" value={p.consultor} />
              <MetaChip label="Cargo" value={p.cargoExecutor} />
              <MetaChip label="Atividades" value={`${p.numAtividades}`} />
              {p.processoRotineiro && <MetaChip label="Tipo" value="Rotineiro" />}
            </div>
          </div>
        </div>

        <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '48px 2rem 64px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Metadata row */}
          <section>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '16px',
            }}>
              <InfoBox icon="⚡" label="Gatilho de Início" value={p.gatilhoInicio} />
              <InfoBox icon="🔗" label="Correlacionamento" value={p.correlacionamento ? `Sim — ${p.correlacionamentoAreas}` : 'Não'} />
              <InfoBox icon="📂" label="Documentos / Armazenamento" value={p.documentos} />
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
                lineHeight: 1.75,
                color: 'var(--charcoal)',
                fontFamily: 'var(--font-outfit, system-ui)',
                whiteSpace: 'pre-wrap',
              }}>
                {p.analiseCritica}
              </p>
            </Card>
          )}

          {/* Riscos + Gargalos + Planos */}
          {(p.riscos.length > 0 || p.gargalos.length > 0 || p.planosDeAcao.length > 0) && (
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {p.riscos.length > 0 && (
                  <ItemList
                    title="Riscos Identificados"
                    items={p.riscos}
                    icon="⚠"
                    color="var(--gut-critical)"
                    bg="var(--gut-critical-bg)"
                    border="rgba(215,25,33,0.18)"
                  />
                )}
                {p.gargalos.length > 0 && (
                  <ItemList
                    title="Gargalos Operacionais"
                    items={p.gargalos}
                    icon="🔒"
                    color="var(--gut-high)"
                    bg="var(--gut-high-bg)"
                    border="rgba(196,122,44,0.18)"
                  />
                )}
                {p.planosDeAcao.length > 0 && (
                  <ItemList
                    title="Planos de Ação"
                    items={p.planosDeAcao}
                    icon="✓"
                    color="var(--gut-low)"
                    bg="var(--gut-low-bg)"
                    border="rgba(74,138,98,0.18)"
                    numbered
                  />
                )}
              </div>
            </section>
          )}

          {/* POP card */}
          {p.popFile && (
            <Card title="Procedimento Operacional Padrão (POP)">
              {p.resumoPop && (
                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.75,
                  color: 'var(--charcoal)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-outfit, system-ui)',
                  borderLeft: '3px solid var(--red)',
                  paddingLeft: '16px',
                  fontStyle: 'italic',
                }}>
                  {p.resumoPop}{p.resumoPop.length >= 490 ? '…' : ''}
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
                  padding: '12px 22px',
                  borderRadius: '8px',
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

        <footer style={{ padding: '24px 0', background: 'var(--red)', marginTop: '16px' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-outfit, system-ui)' }}>
              © 2026 Mikami Supermercados · Análise crítica interna
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontSize: '0.67rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-outfit, system-ui)', display: 'block', marginBottom: '4px' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-outfit, system-ui)' }}>
        {value}
      </span>
    </div>
  );
}

function InfoBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)',
      borderRadius: '12px',
      padding: '20px 22px',
      boxShadow: 'var(--glass-shadow)',
    }}>
      <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-outfit, system-ui)' }}>
        {icon} {label}
      </p>
      <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.6, fontFamily: 'var(--font-outfit, system-ui)' }}>
        {value}
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)',
      borderRadius: '14px',
      padding: '32px 36px',
      boxShadow: 'var(--glass-shadow)',
    }}>
      <h2 className="display" style={{ fontSize: '1.5rem', marginBottom: '6px', color: 'var(--charcoal)' }}>
        {title}
      </h2>
      <div style={{ height: '2px', width: '36px', background: 'var(--red)', borderRadius: '1px', marginBottom: '20px' }} />
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
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${border}`,
      borderTop: `3px solid ${color}`,
      borderRadius: '14px',
      padding: '24px 26px',
      boxShadow: 'var(--glass-shadow)',
    }}>
      <h3 style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color,
        marginBottom: '18px',
        fontFamily: 'var(--font-outfit, system-ui)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span>{icon}</span> {title}
        <span style={{ marginLeft: 'auto', fontWeight: 600, opacity: 0.6 }}>({items.length})</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {numbered ? (
              <span style={{
                flexShrink: 0,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: color,
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-outfit, system-ui)',
                marginTop: '1px',
              }}>
                {i + 1}
              </span>
            ) : (
              <span style={{ flexShrink: 0, color, fontSize: '0.6rem', marginTop: '5px' }}>●</span>
            )}
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--charcoal)',
              lineHeight: 1.6,
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
