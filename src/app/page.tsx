import { processes } from '@/data/processes';
import { Header } from '@/components/Header';
import { DashboardTabs } from '@/components/DashboardTabs';

export const metadata = {
  title: 'Mikami · Análise Crítica de Processos',
};

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header subtitle="Análise Crítica de Processos" />

      {/* Hero band */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid var(--border)',
          padding: '24px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1
            className="display"
            style={{ color: 'var(--charcoal)', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 600, marginBottom: 6 }}
          >
            Análise Crítica de Processos Operacionais
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-outfit, system-ui)' }}>
            Diagnóstico via Matriz GUT · Junho 2026 · Mikami Supermercados
          </p>
        </div>
      </div>

      <DashboardTabs processes={processes} />

      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '24px 0',
          marginTop: '40px',
          background: 'var(--red)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            © 2026 Mikami Supermercados · Análise crítica interna
          </p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-outfit, system-ui)' }}>
            Grupo Gestão · Consultoria Organizacional
          </p>
        </div>
      </footer>
    </div>
  );
}
