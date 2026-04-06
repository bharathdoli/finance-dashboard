import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/transactions";
import { formatCurrency, groupByMonth, groupByCategory } from "../../utils/helpers";
import "../../styles/insights.css";

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const categoryData = useMemo(() => groupByCategory(transactions), [transactions]);
  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);

  const topCategory = categoryData[0];
  const totalExpenses = categoryData.reduce((s, c) => s + c.value, 0);

  const avgMonthlyExpense = useMemo(() => {
    if (!monthlyData.length) return 0;
    return monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length;
  }, [monthlyData]);

  const bestMonth = useMemo(() => {
    return monthlyData.reduce(
      (best, m) => {
        const net = m.income - m.expenses;
        return net > best.net ? { ...m, net } : best;
      },
      { net: -Infinity, label: "—" }
    );
  }, [monthlyData]);

  return (
    <div className="insights-page">
      <div>
        <h2>Insights</h2>
        <p className="page-subtitle">Patterns and observations from your financial data</p>
      </div>

      <div className="insight-cards">
        <div className="insight-card">
          <div className="insight-icon">🔥</div>
          <h3>Top Spending Category</h3>
          <p className="insight-value accent">
            {topCategory ? `${CATEGORIES[topCategory.name]?.icon} ${topCategory.name}` : "—"}
          </p>
          <p className="insight-sub">
            {topCategory ? `${formatCurrency(topCategory.value)} total spent` : "No expenses yet"}
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">📅</div>
          <h3>Avg Monthly Spend</h3>
          <p className="insight-value">{formatCurrency(avgMonthlyExpense)}</p>
          <p className="insight-sub">Over {monthlyData.length} month{monthlyData.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">⭐</div>
          <h3>Best Saving Month</h3>
          <p className="insight-value income">{bestMonth.label || "—"}</p>
          <p className="insight-sub">
            {bestMonth.net > -Infinity ? `Net ${formatCurrency(bestMonth.net)} saved` : "No data"}
          </p>
        </div>
      </div>

      <div className="top-categories">
        <h3>Spending Breakdown</h3>
        <p>Category-wise expense distribution</p>

        {categoryData.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No expense data to show.</p>
        ) : (
          <div className="category-bars">
            {categoryData.map(d => {
              const cat = CATEGORIES[d.name] || CATEGORIES.Other;
              const pct = totalExpenses > 0 ? (d.value / totalExpenses) * 100 : 0;
              return (
                <div className="cat-bar-row" key={d.name}>
                  <div className="cat-bar-label">
                    <span>{cat.icon}</span>
                    <span>{d.name}</span>
                  </div>
                  <div className="cat-bar-track">
                    <div
                      className="cat-bar-fill"
                      style={{ width: `${pct}%`, background: cat.color }}
                    />
                  </div>
                  <span className="cat-bar-val">{formatCurrency(d.value)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="monthly-comparison">
        <h3>Monthly Comparison</h3>
        <p>Income vs Expenses and net savings per month</p>

        {monthlyData.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No data available.</p>
        ) : (
          <div className="comparison-months">
            {monthlyData.map(m => {
              const net = m.income - m.expenses;
              return (
                <div className="month-block" key={m.month}>
                  <h4>{new Date(m.month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h4>
                  <div className="month-row">
                    <span className="label">Income</span>
                    <span className="val income">+{formatCurrency(m.income)}</span>
                  </div>
                  <div className="month-row">
                    <span className="label">Expenses</span>
                    <span className="val expense">−{formatCurrency(m.expenses)}</span>
                  </div>
                  <div className="month-row">
                    <span className="label">Net</span>
                    <span className={`val ${net >= 0 ? "positive" : "negative"}`}>
                      {net >= 0 ? "+" : "−"}{formatCurrency(Math.abs(net))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}