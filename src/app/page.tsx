import { processes } from '@/data/processes';
import { Header } from '@/components/Header';
import { DashboardTabs } from '@/components/DashboardTabs';

export const metadata = {
  title: 'Mikami · Análise Crítica de Processos',
};

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm)', position: 'relative' }}>
      {/* Decorative background blobs for glassmorphism depth */}
      <div style={{
        position: 'fixed', top: '-10%', right: '-5%',
        width: '750px', height: '750px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,25,33,0.13) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-15%', left: '-8%',
        width: '650px', height: '650px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,25,33,0.09) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '35%', left: '25%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(170,124,74,0.07) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header subtitle="Análise Crítica de Processos" />

        {/* Hero band */}
        <div style={{ padding: '64px 0 48px' }}>
          <div className="max-w-7xl mx-auto px-8" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--red)',
              fontFamily: 'var(--font-outfit, system-ui)', marginBottom: '20px',
            }}>
              Diagnóstico via Matriz GUT · Junho 2026
            </p>
            <h1
              className="display"
              style={{ color: 'var(--charcoal)', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 600, marginBottom: '20px', maxWidth: '760px', lineHeight: 1.05 }}
            >
              Análise Crítica de Processos Operacionais
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontFamily: 'var(--font-outfit, system-ui)', maxWidth: '500px', lineHeight: 1.65 }}>
              Mikami Supermercados — mapeamento e priorização de processos por impacto operacional
            </p>
          </div>
        </div>

        <DashboardTabs processes={processes} />

        <footer style={{ padding: '32px 0', marginTop: '64px', background: 'var(--red)' }}>
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-outfit, system-ui)' }}>
              © 2026 Mikami Supermercados · Análise crítica interna
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-outfit, system-ui)' }}>
              Grupo Gestão · Consultoria Organizacional
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
