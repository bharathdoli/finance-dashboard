import React, { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/transactions";
import { formatCurrency, groupByMonth, groupByCategory, getBalanceTrend } from "../../utils/helpers";
import "../../styles/dashboard.css";


function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 14px",
      fontSize: "0.8rem",
      boxShadow: "var(--shadow-md)",
    }}>
      <p style={{ color: "var(--text-muted)", marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {typeof p.value === "number" ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
    return { balance: income - expenses, income, expenses };
  }, [transactions]);

  const balanceTrend = useMemo(() => getBalanceTrend(transactions), [transactions]);
  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
  const categoryData = useMemo(() => groupByCategory(transactions), [transactions]);

  const COLORS = categoryData.map(d => CATEGORIES[d.name]?.color || "#94a3b8");

  return (
    <div className="dashboard-grid">
      <div className="summary-cards">
        <div className="summary-card">
          <p className="card-label">Total Balance</p>
          <p className="card-value">{formatCurrency(summary.balance)}</p>
          <p className="card-sub">
            <span>Across all time</span>
          </p>
        </div>

        <div className="summary-card">
          <p className="card-label">Total Income</p>
          <p className="card-value income">{formatCurrency(summary.income)}</p>
          <p className="card-sub">
            <span className="card-badge income">↑ All time</span>
          </p>
        </div>

        <div className="summary-card">
          <p className="card-label">Total Expenses</p>
          <p className="card-value expense">{formatCurrency(summary.expenses)}</p>
          <p className="card-sub">
            <span className="card-badge expense">↓ All time</span>
          </p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Balance Trend</h3>
          <p>Cumulative balance over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={balanceTrend}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                interval={Math.floor(balanceTrend.length / 5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#balanceGrad)"
                name="Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Spending by Category</h3>
          <p>Where your money goes</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pie-labels">
            {categoryData.slice(0, 5).map((d, i) => (
              <div className="pie-label-row" key={d.name}>
                <div className="pie-label-left">
                  <span className="pie-label-dot" style={{ background: COLORS[i] }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {CATEGORIES[d.name]?.icon} {d.name}
                  </span>
                </div>
                <span className="pie-label-value">{formatCurrency(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-card" style={{ animationDelay: "0.25s" }}>
        <h3>Monthly Overview</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "var(--income-color)" }} />
            Income
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "var(--expense-color)" }} />
            Expenses
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barSize={24} barGap={4}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="var(--income-color)" radius={[4, 4, 0, 0]} name="Income" />
            <Bar dataKey="expenses" fill="var(--expense-color)" radius={[4, 4, 0, 0]} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}