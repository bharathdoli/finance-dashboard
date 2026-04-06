import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/transactions";
import { formatCurrency, formatDate, applyFilters } from "../../utils/helpers";
import TransactionModal from "./TransactionModal";
import "../../styles/transactions.css";

export default function Transactions() {
  const { state, dispatch } = useApp();
  const { transactions, filters, role } = state;
  const isAdmin = role === "admin";

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const filtered = applyFilters(transactions, filters);
  const categories = ["All", ...Object.keys(CATEGORIES)];

  function setFilter(obj) {
    dispatch({ type: "SET_FILTER", payload: obj });
  }

  function toggleSort(field) {
    if (filters.sortBy === field) {
      setFilter({ sortDir: filters.sortDir === "desc" ? "asc" : "desc" });
    } else {
      setFilter({ sortBy: field, sortDir: "desc" });
    }
  }

  function openEdit(tx) {
    setEditTx(tx);
    setModalOpen(true);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this transaction?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  }

  function closeModal() {
    setModalOpen(false);
    setEditTx(null);
  }

  const sortIcon = (field) => {
    if (filters.sortBy !== field) return "↕";
    return filters.sortDir === "desc" ? "↓" : "↑";
  };

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h2>Transactions</h2>
          <p>{transactions.length} total transactions</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className="filters-bar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilter({ search: e.target.value })}
          />
        </div>

        <div className="filter-divider" />

        <select
          className="filter-select"
          value={filters.category}
          onChange={e => setFilter({ category: e.target.value })}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filters.type}
          onChange={e => setFilter({ type: e.target.value })}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="filter-divider" />

        <button className="sort-btn" onClick={() => toggleSort("date")}>
          Date {sortIcon("date")}
        </button>

        <button className="sort-btn" onClick={() => toggleSort("amount")}>
          Amount {sortIcon("amount")}
        </button>

        {(filters.search || filters.category !== "All" || filters.type !== "All") && (
          <button
            className="btn btn-ghost"
            onClick={() => dispatch({ type: "RESET_FILTERS" })}
            style={{ fontSize: "0.775rem" }}
          >
            ✕ Clear
          </button>
        )}

        <span className="results-count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="transactions-table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => {
                  const cat = CATEGORIES[tx.category] || CATEGORIES.Other;
                  return (
                    <tr key={tx.id}>
                      <td className="t-desc">{tx.description}</td>
                      <td className="t-date">{formatDate(tx.date)}</td>
                      <td>
                        <span className="category-badge">
                          <span>{cat.icon}</span>
                          {tx.category}
                        </span>
                      </td>
                      <td>
                        <span className={`type-chip ${tx.type}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td>
                        <span className={`amount-cell ${tx.type}`}>
                          {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td>
                          <div className="row-actions">
                            <button className="btn btn-ghost" onClick={() => openEdit(tx)} title="Edit">✎</button>
                            <button className="btn btn-ghost" onClick={() => handleDelete(tx.id)} title="Delete" style={{ color: "var(--expense-color)" }}>✕</button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <TransactionModal transaction={editTx} onClose={closeModal} />
      )}
    </div>
  );
}