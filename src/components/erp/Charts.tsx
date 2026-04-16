"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---------------------------------------------------------------------------
// Theme colors
// ---------------------------------------------------------------------------
const C = {
  cyan: "#00E5FF",
  gold: "#D4AF37",
  green: "#00E5A0",
  red: "#FF7B7B",
  orange: "#FFA94D",
  muted: "#7A8A9E",
  grid: "rgba(0,229,255,0.08)",
  bg: "#03080D",
};

const fmt = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Shared dark tooltip
// ---------------------------------------------------------------------------
/* eslint-disable @typescript-eslint/no-explicit-any */
function HudTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div
      className="hud-panel p-3"
      style={{
        minWidth: 140,
        background: "rgba(10,34,54,0.95)",
        border: "1px solid rgba(0,229,255,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(0,229,255,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "SF Mono, Monaco, Consolas, monospace",
          fontSize: "0.62rem",
          color: "#00E5FF",
          letterSpacing: "0.12em",
          marginBottom: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {payload.map((entry: any, i: number) => (
        <div
          key={i}
          style={{
            color: entry.color,
            fontSize: "0.85rem",
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          {entry.name ? `${entry.name}: ` : ""}
          {fmt.format(entry.value)}
        </div>
      ))}
    </div>
  );
}

function HudTooltipCount({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div
      className="hud-panel p-3"
      style={{
        minWidth: 140,
        background: "rgba(10,34,54,0.95)",
        border: "1px solid rgba(0,229,255,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(0,229,255,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "SF Mono, Monaco, Consolas, monospace",
          fontSize: "0.62rem",
          color: "#00E5FF",
          letterSpacing: "0.12em",
          marginBottom: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {payload.map((entry: any, i: number) => (
        <div
          key={i}
          style={{ color: entry.color, fontSize: "0.85rem", fontWeight: 600 }}
        >
          {entry.name}: {entry.value} faktur /{" "}
          {fmt.format(entry.payload?.total ?? 0)}
        </div>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// A) CashFlowChart — monthly bar chart
// ---------------------------------------------------------------------------
export interface CashFlowChartProps {
  data: { month: string; projected: number; actual?: number }[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{
            fill: C.muted,
            fontSize: 11,
            fontFamily: "SF Mono, Monaco, Consolas, monospace",
          }}
          axisLine={{ stroke: C.grid }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: C.muted, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
          width={52}
        />
        <Tooltip
          content={<HudTooltip />}
          cursor={{ fill: "rgba(0,229,255,0.04)" }}
        />
        <Bar
          dataKey="projected"
          name="Predikce"
          fill={C.cyan}
          radius={[3, 3, 0, 0]}
          opacity={0.7}
        />
        <Bar
          dataKey="actual"
          name="Skutecnost"
          fill={C.gold}
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// B) AgingChart — horizontal bar chart for aging buckets
// ---------------------------------------------------------------------------
export interface AgingChartProps {
  data: { bucket: string; count: number; total: number }[];
}

const agingColors: Record<string, string> = {
  "0-30": C.green,
  "31-60": C.gold,
  "61-90": C.orange,
  "90+": C.red,
};

export function AgingChart({ data }: AgingChartProps) {
  const coloredData = data.map((d) => ({
    ...d,
    fill: agingColors[d.bucket] ?? C.muted,
    label: `${d.bucket} dni`,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={coloredData}
        layout="vertical"
        margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={C.grid}
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fill: C.muted, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1_000_000
              ? `${(v / 1_000_000).toFixed(1)}M`
              : v >= 1_000
                ? `${(v / 1_000).toFixed(0)}k`
                : String(v)
          }
        />
        <YAxis
          type="category"
          dataKey="label"
          tick={{
            fill: C.muted,
            fontSize: 11,
            fontFamily: "SF Mono, Monaco, Consolas, monospace",
          }}
          axisLine={false}
          tickLine={false}
          width={72}
        />
        <Tooltip
          content={<HudTooltipCount />}
          cursor={{ fill: "rgba(0,229,255,0.04)" }}
        />
        <Bar dataKey="total" name="Celkem" radius={[0, 3, 3, 0]}>
          {coloredData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// C) RevenueChart — line/area chart for monthly revenue
// ---------------------------------------------------------------------------
export interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.cyan} stopOpacity={0.25} />
            <stop offset="100%" stopColor={C.cyan} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{
            fill: C.muted,
            fontSize: 11,
            fontFamily: "SF Mono, Monaco, Consolas, monospace",
          }}
          axisLine={{ stroke: C.grid }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: C.muted, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
          width={52}
        />
        <Tooltip
          content={<HudTooltip />}
          cursor={{ stroke: C.cyan, strokeDasharray: "3 3" }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={C.cyan}
          strokeWidth={2}
          fill="url(#cyanGrad)"
          dot={{ r: 4, fill: C.bg, stroke: C.cyan, strokeWidth: 2 }}
          activeDot={{
            r: 6,
            fill: C.cyan,
            stroke: C.bg,
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// D) RiskDonut — pie chart showing risk distribution
// ---------------------------------------------------------------------------
export interface RiskDonutProps {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const riskColors = [C.red, C.gold, C.cyan, C.green];
const riskLabels = ["Kriticke", "Vysoke", "Stredni", "Nizke"];

export function RiskDonut({ critical, high, medium, low }: RiskDonutProps) {
  const data = [
    { name: riskLabels[0], value: critical },
    { name: riskLabels[1], value: high },
    { name: riskLabels[2], value: medium },
    { name: riskLabels[3], value: low },
  ].filter((d) => d.value > 0);

  const total = critical + high + medium + low;

  if (total === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: 260, color: "#7A8A9E" }}
      >
        Zadna rizika
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, i) => {
              const colorIndex = riskLabels.indexOf(entry.name);
              return (
                <Cell
                  key={i}
                  fill={riskColors[colorIndex >= 0 ? colorIndex : 0]}
                />
              );
            })}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0];
              return (
                <div
                  className="hud-panel p-3"
                  style={{
                    background: "rgba(10,34,54,0.95)",
                    border: "1px solid rgba(0,229,255,0.25)",
                    minWidth: 100,
                  }}
                >
                  <div
                    style={{
                      color: d.payload?.fill ?? "#fff",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {d.name}: {d.value}
                  </div>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1,
          }}
        >
          {total}
        </div>
        <div
          style={{
            fontFamily: "SF Mono, Monaco, Consolas, monospace",
            fontSize: "0.58rem",
            color: "#7A8A9E",
            letterSpacing: "0.12em",
            marginTop: 2,
          }}
        >
          RIZIK
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        {data.map((d) => {
          const colorIndex = riskLabels.indexOf(d.name);
          return (
            <div key={d.name} className="flex items-center gap-1.5">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: riskColors[colorIndex >= 0 ? colorIndex : 0],
                }}
              />
              <span style={{ color: "#B8C1C8", fontSize: "0.75rem" }}>
                {d.name} ({d.value})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
