import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/transactions";
import "../../styles/modal.css";

const DEFAULT = {
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
};

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(DEFAULT);

  useEffect(() => {
    if (transaction) {
      setForm({
        ...transaction,
        amount: Math.abs(transaction.amount).toString(),
      });
    }
  }, [transaction]);

  const isEdit = Boolean(transaction);

  function handleSubmit() {
    if (!form.description.trim() || !form.amount || !form.date) return;
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) return;

    const payload = {
      ...form,
      amount: form.type === "expense" ? -amount : amount,
    };

    if (isEdit) {
      dispatch({ type: "EDIT_TRANSACTION", payload: { ...payload, id: transaction.id } });
    } else {
      dispatch({ type: "ADD_TRANSACTION", payload });
    }
    onClose();
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? "Edit Transaction" : "Add Transaction"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label>Description</label>
            <input
              className="form-input"
              placeholder="e.g. Grocery Store"
              value={form.description}
              onChange={e => set("description", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Amount (USD)</label>
              <input
                className="form-input"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={e => set("amount", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Date</label>
              <input
                className="form-input"
                type="date"
                value={form.date}
                onChange={e => set("date", e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Type</label>
            <div className="type-toggle">
              <button
                className={`type-toggle-btn ${form.type === "expense" ? "active expense" : ""}`}
                onClick={() => set("type", "expense")}
              >
                ↑ Expense
              </button>
              <button
                className={`type-toggle-btn ${form.type === "income" ? "active income" : ""}`}
                onClick={() => set("type", "income")}
              >
                ↓ Income
              </button>
            </div>
          </div>

          <div className="form-field">
            <label>Category</label>
            <select
              className="form-input filter-select"
              style={{ width: "100%", paddingRight: "32px" }}
              value={form.category}
              onChange={e => set("category", e.target.value)}
            >
              {Object.keys(CATEGORIES).map(c => (
                <option key={c} value={c}>
                  {CATEGORIES[c].icon} {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}