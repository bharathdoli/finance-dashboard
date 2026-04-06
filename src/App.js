import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Insights from "./components/Insights/Insights";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";

function Shell() {
  const { state } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    insights: <Insights />,
  };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-body">
          {pages[state.activeTab] || <Dashboard />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}