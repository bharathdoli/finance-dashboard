import React from "react";
import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Overview", icon: "◻" },
  { id: "transactions", label: "Transactions", icon: "↕" },
  { id: "insights", label: "Insights", icon: "◈" },
];

export default function Sidebar({ open, onClose }) {
  const { state, dispatch } = useApp();

  return (
    <>
      <div className={`mobile-overlay ${open ? "visible" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h1>Fin<span>io</span></h1>
          <small>Personal Finance</small>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              className={`nav-item ${state.activeTab === item.id ? "active" : ""}`}
              onClick={() => {
                dispatch({ type: "SET_TAB", payload: item.id });
                onClose();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="role-selector-wrap">
            <label>Role</label>
            <select
              className="role-selector"
              value={state.role}
              onChange={e => dispatch({ type: "SET_ROLE", payload: e.target.value })}
            >
              <option value="viewer">👁 Viewer</option>
              <option value="admin">⚙ Admin</option>
            </select>
          </div>

          <button className="theme-toggle" onClick={() => dispatch({ type: "TOGGLE_DARK" })}>
            <span>{state.darkMode ? "☀ Light mode" : "☾ Dark mode"}</span>
            <div className={`toggle-track ${state.darkMode ? "on" : ""}`}>
              <div className="toggle-thumb" />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}