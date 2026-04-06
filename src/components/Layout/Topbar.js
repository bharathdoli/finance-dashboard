import React from "react";
import { useApp } from "../../context/AppContext";

const TITLES = {
  dashboard: { title: "Dashboard", sub: "Your financial overview" },
  transactions: { title: "Transactions", sub: "All your income and expenses" },
  insights: { title: "Insights", sub: "Understand your spending patterns" },
};

export default function Topbar({ onMenuClick }) {
  const { state } = useApp();
  const { title, sub } = TITLES[state.activeTab] || TITLES.dashboard;

  return (
    <header className="topbar">
      <div className="topbar-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Open menu">
          ☰
        </button>
        <div className="topbar-title">
          <h2>{title}</h2>
          <p>{sub}</p>
        </div>
      </div>

      <div className="topbar-actions">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-surface-2)",
            border: "1px solid var(--border)",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
          }}
        >
          <span style={{ fontSize: "0.85rem" }}>
            {state.role === "admin" ? "⚙" : "👁"}
          </span>
          <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{state.role}</span>
        </div>
      </div>
    </header>
  );
}