'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Process } from '@/data/processes';
import { getGutInfo } from '@/lib/gut';

interface ActivitiesChartProps {
  processes: Process[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { nome: string; nivel: string; color: string } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '8px 12px',
      fontFamily: 'var(--font-outfit, system-ui)',
      fontSize: '0.82rem',
    }}>
      <p style={{ fontWeight: 600, color: 'var(--charcoal)', marginBottom: 2 }}>{d.payload.nome}</p>
      <p style={{ color: 'var(--text-muted)' }}><strong style={{ color: d.payload.color }}>{d.value}</strong> atividades</p>
    </div>
  );
}

export function ActivitiesChart({ processes }: ActivitiesChartProps) {
  const data = [...processes]
    .sort((a, b) => b.numAtividades - a.numAtividades)
    .map(p => ({
      nome: p.nome.length > 22 ? p.nome.substring(0, 20) + '…' : p.nome,
      nomeCompleto: p.nome,
      atividades: p.numAtividades,
      color: getGutInfo(p.pontuacaoGut).color,
      nivel: getGutInfo(p.pontuacaoGut).label,
    }));

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="nome"
          width={172}
          tick={{ fontSize: 11, fill: 'var(--charcoal)', fontFamily: 'var(--font-outfit)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--warm-dark)' }} />
        <Bar dataKey="atividades" radius={[0, 4, 4, 0]} maxBarSize={18} label={{ position: 'right', fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' }}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
