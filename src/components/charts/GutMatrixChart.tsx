'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ScatterPointItem } from 'recharts/types/cartesian/Scatter';
import { Process } from '@/data/processes';
import { getGutInfo } from '@/lib/gut';

interface GutMatrixChartProps {
  processes: Process[];
}

interface Dot {
  x: number;
  y: number;
  z: number;
  nome: string;
  pontuacao: number;
  slug: string;
  color: string;
}

type DotShapeProps = ScatterPointItem & {
  index?: number;
  payload?: Dot;
};

function CustomDot({ cx = 0, cy = 0, payload }: DotShapeProps) {
  if (!payload) return null;
  const r = 10 + payload.z * 3.5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.85} stroke="white" strokeWidth={1.5} />
      <text
        x={cx}
        y={cy + r + 11}
        textAnchor="middle"
        fill="#7A6F65"
        fontSize={9}
        fontFamily="var(--font-outfit, system-ui)"
        style={{ pointerEvents: 'none' }}
      >
        {payload.nome.length > 16 ? payload.nome.substring(0, 14) + '…' : payload.nome}
      </text>
    </g>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: Dot }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '10px 14px',
      boxShadow: '0 4px 16px rgba(26,23,20,0.12)',
      fontFamily: 'var(--font-outfit, system-ui)',
      maxWidth: 220,
    }}>
      <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, color: 'var(--charcoal)' }}>{d.nome}</p>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        G{d.x} × U{d.y} × T{d.z} = <strong style={{ color: d.color }}>{d.pontuacao}</strong>
      </p>
    </div>
  );
}

export function GutMatrixChart({ processes }: GutMatrixChartProps) {
  const data: Dot[] = processes
    .filter(p => p.gravidade && p.urgencia && p.tendencia && p.pontuacaoGut)
    .map(p => ({
      x: p.gravidade as number,
      y: p.urgencia as number,
      z: p.tendencia as number,
      nome: p.nome,
      pontuacao: p.pontuacaoGut as number,
      slug: p.slug,
      color: getGutInfo(p.pontuacaoGut).color,
    }));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          type="number"
          dataKey="x"
          name="Gravidade"
          domain={[0.5, 5.5]}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(v) => `G${v}`}
          label={{ value: 'Gravidade', position: 'insideBottom', offset: -20, style: { fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' } }}
          tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Urgência"
          domain={[0.5, 5.5]}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(v) => `U${v}`}
          label={{ value: 'Urgência', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' } }}
          tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-outfit)' }}
        />
        <ZAxis type="number" dataKey="z" range={[100, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Scatter
          data={data}
          shape={(props: DotShapeProps) => <CustomDot {...props} />}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
