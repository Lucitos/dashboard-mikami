'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Process } from '@/data/processes';

interface ConsultorDonutProps {
  processes: Process[];
}

const COLORS = ['var(--red)', 'var(--gold)'];

interface CustomLabelProps {
  cx?: number;
  cy?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '8px 12px',
      fontFamily: 'var(--font-outfit, system-ui)',
      fontSize: '0.82rem',
    }}>
      <p style={{ fontWeight: 600 }}>{payload[0].name}</p>
      <p style={{ color: 'var(--text-muted)' }}>{payload[0].value} processos</p>
    </div>
  );
}

export function ConsultorDonut({ processes }: ConsultorDonutProps) {
  const counts: Record<string, number> = {};
  processes.forEach(p => {
    counts[p.consultor] = (counts[p.consultor] || 0) + 1;
  });
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  const total = data.reduce((s, d) => s + d.value, 0);

  function CenterLabel({ cx = 0, cy = 0 }: CustomLabelProps) {
    return (
      <>
        <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-cormorant, Georgia)" fontSize={28} fontWeight={700} fill="var(--charcoal)">{total}</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="var(--font-outfit, system-ui)" fontSize={11} fill="var(--text-muted)">processos</text>
      </>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={52}
          outerRadius={78}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
          <CenterLabel />
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(val) => <span style={{ fontSize: '0.8rem', color: 'var(--charcoal)', fontFamily: 'var(--font-outfit)' }}>{val}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
