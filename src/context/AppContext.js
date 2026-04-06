import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialTransactions } from "../data/transactions";

const AppContext = createContext(null);

const STORAGE_KEY = "finio_state";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

const defaultState = {
  transactions: initialTransactions,
  role: "viewer",
  darkMode: false,
  filters: {
    search: "",
    category: "All",
    type: "All",
    sortBy: "date",
    sortDir: "desc",
  },
  activeTab: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };

    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case "RESET_FILTERS":
      return { ...state, filters: defaultState.filters };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [
          { ...action.payload, id: Date.now() },
          ...state.transactions,
        ],
      };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case "SET_TAB":
      return { ...state, activeTab: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const saved = loadState();
  const [state, dispatch] = useReducer(reducer, saved || defaultState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}