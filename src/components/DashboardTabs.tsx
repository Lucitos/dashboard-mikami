'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Process } from '@/data/processes';
import { KpiCard } from './KpiCard';
import { PriorityRanking } from './PriorityRanking';
import { ProcessCard } from './ProcessCard';
import { GutMatrixChart } from './charts/GutMatrixChart';
import { ActivitiesChart } from './charts/ActivitiesChart';
import { ConsultorDonut } from './charts/ConsultorDonut';
import { getGutInfo } from '@/lib/gut';
import { GutBadge } from './GutBadge';

type TabId = 'resumo' | 'matriz-gut' | 'analise' | 'planos';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'matriz-gut', label: 'Matriz GUT' },
  { id: 'analise', label: 'Análise Específica' },
  { id: 'planos', label: 'Planos de Ação' },
];

const GUT_LEGEND = [
  { label: 'CRÍTICO', sub: '≥ 60 pts', color: 'var(--gut-critical)', bg: 'var(--gut-critical-bg)' },
  { label: 'ALTO', sub: '20–59 pts', color: 'var(--gut-high)', bg: 'var(--gut-high-bg)' },
  { label: 'MÉDIO', sub: '8–19 pts', color: 'var(--gut-medium)', bg: 'var(--gut-medium-bg)' },
  { label: 'BAIXO', sub: '1–7 pts', color: 'var(--gut-low)', bg: 'var(--gut-low-bg)' },
  { label: 'N/A', sub: 'Não pontuado', color: 'var(--gut-none)', bg: 'var(--gut-none-bg)' },
];

interface DashboardTabsProps {
  processes: Process[];
}

export function DashboardTabs({ processes }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('resumo');

  const { sorted, pontuados, totalAtividades, topProcess, comPlanos, totalPlanos, processosComPlanos } = useMemo(() => {
    const sorted = [...processes].sort((a, b) => (b.pontuacaoGut ?? -1) - (a.pontuacaoGut ?? -1));
    return {
      sorted,
      pontuados: processes.filter(p => p.pontuacaoGut !== null),
      totalAtividades: processes.reduce((s, p) => s + p.numAtividades, 0),
      topProcess: sorted[0],
      comPlanos: processes.filter(p => p.planosDeAcao.length > 0).length,
      totalPlanos: processes.reduce((s, p) => s + p.planosDeAcao.length, 0),
      processosComPlanos: sorted.filter(p => p.planosDeAcao.length > 0),
    };
  }, [processes]);

  return (
    <div>
      {/* Tab Bar — glassmorphism sticky */}
      <div
        style={{
          background: 'rgba(246,244,240,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(26,23,20,0.07)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          willChange: 'transform',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', gap: '4px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--red)' : '2px solid transparent',
                padding: '18px 24px',
                marginBottom: '-1px',
                cursor: 'pointer',
                fontFamily: 'var(--font-outfit, system-ui)',
                fontSize: '0.875rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? 'var(--red)' : 'var(--text-muted)',
                letterSpacing: '0.01em',
                transition: 'color 0.18s, border-color 0.18s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 32px', minHeight: '60vh' }}>

        {/* ── RESUMO ─────────────────────────────────────── */}
        {activeTab === 'resumo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px' }}>
              <KpiCard label="Processos Mapeados" value={processes.length} sub="processos operacionais" delay={0} />
              <KpiCard label="Pontuação GUT Máxima" value={topProcess.pontuacaoGut ?? '—'} sub={topProcess.nome} accent="var(--red)" delay={80} />
              <KpiCard label="Com Plano de Ação" value={comPlanos} sub={`de ${processes.length} processos`} delay={160} />
              <KpiCard label="Total de Atividades" value={totalAtividades} sub="atividades documentadas" delay={240} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
              <Card label="Atividades por Processo">
                <ActivitiesChart processes={processes} />
              </Card>
              <Card label="Distribuição por Consultor">
                <ConsultorDonut processes={processes} />
              </Card>
            </div>

            <div>
              <TabSectionTitle>Top Processos Críticos</TabSectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px' }}>
                {sorted.filter(p => p.pontuacaoGut && p.pontuacaoGut >= 20).slice(0, 6).map((p, i) => (
                  <ProcessCard key={p.slug} process={p} delay={i * 50} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MATRIZ GUT ─────────────────────────────────── */}
        {activeTab === 'matriz-gut' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', alignItems: 'start' }}>
              <Card label="Gravidade × Urgência (tamanho = Tendência)">
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)', marginBottom: '20px' }}>
                  <strong style={{ color: 'var(--charcoal)' }}>{pontuados.length}</strong> de {processes.length} processos pontuados
                </p>
                <GutMatrixChart processes={processes} />
              </Card>

              <Card label="Ranking G × U × T">
                <PriorityRanking processes={processes} />
              </Card>
            </div>

            <Card label="Legenda da Classificação GUT">
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                {GUT_LEGEND.map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        color: l.color,
                        background: l.bg,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: `1px solid ${l.color}`,
                        fontFamily: 'var(--font-outfit, system-ui)',
                      }}
                    >
                      {l.label}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)' }}>
                      {l.sub}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ── ANÁLISE ESPECÍFICA ─────────────────────────── */}
        {activeTab === 'analise' && (
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)', marginBottom: '32px', lineHeight: 1.6, textAlign: 'center' }}>
              {processes.length} processos mapeados, ordenados por pontuação GUT — clique para ver análise completa
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px' }}>
              {sorted.map((p, i) => (
                <ProcessCard key={p.slug} process={p} delay={i * 35} />
              ))}
            </div>
          </div>
        )}

        {/* ── PLANOS DE AÇÃO ─────────────────────────────── */}
        {activeTab === 'planos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <KpiCard label="Total de Ações" value={totalPlanos} sub="planos de ação documentados" accent="var(--red)" delay={0} />
              <KpiCard label="Processos com Ações" value={comPlanos} sub={`de ${processes.length} processos`} delay={80} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {processosComPlanos.map((p, idx) => {
                const info = getGutInfo(p.pontuacaoGut);
                return (
                  <div
                    key={p.slug}
                    className="fade-up"
                    style={{
                      '--td': `${idx * 45}ms`,
                      background: 'white',
                      border: '1px solid var(--glass-border)',
                      borderLeft: `4px solid ${info.color}`,
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: 'var(--glass-shadow)',
                    } as React.CSSProperties}
                  >
                    {/* Process header */}
                    <div
                      style={{
                        padding: '18px 24px',
                        borderBottom: '1px solid rgba(26,23,20,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        background: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-cormorant, Georgia, serif)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: info.color,
                            minWidth: '28px',
                          }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <Link href={`/processos/${p.slug}`} style={{ textDecoration: 'none' }}>
                            <h3
                              style={{
                                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: 'var(--charcoal)',
                                lineHeight: 1.2,
                              }}
                            >
                              {p.nome}
                            </h3>
                          </Link>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-outfit, system-ui)', marginTop: '3px' }}>
                            {p.consultor} · {p.cargoExecutor}
                          </p>
                        </div>
                      </div>
                      <GutBadge pontuacao={p.pontuacaoGut} size="sm" />
                    </div>

                    {/* Action items */}
                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {p.planosDeAcao.map((plano, i) => (
                          <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                            <span
                              style={{
                                flexShrink: 0,
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'var(--red)',
                                color: 'white',
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-outfit, system-ui)',
                                marginTop: '1px',
                              }}
                            >
                              {i + 1}
                            </span>
                            <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.6, fontFamily: 'var(--font-outfit, system-ui)' }}>
                              {plano}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid var(--glass-border)',
        borderRadius: '14px',
        padding: '28px 30px',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '20px',
          fontFamily: 'var(--font-outfit, system-ui)',
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function TabSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 className="display" style={{ fontSize: '1.65rem', color: 'var(--charcoal)', marginBottom: '10px' }}>
        {children}
      </h2>
      <div style={{ height: '2px', width: '36px', background: 'var(--red)', borderRadius: '1px' }} />
    </div>
  );
}
