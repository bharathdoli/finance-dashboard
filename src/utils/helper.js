export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getMonthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export function groupByMonth(transactions) {
  const map = {};
  transactions.forEach(t => {
    const key = t.date.slice(0, 7);
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += Math.abs(t.amount);
  });
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month)).map(m => ({
    ...m,
    label: new Date(m.month + "-01").toLocaleDateString("en-US", { month: "short" }),
  }));
}

export function groupByCategory(transactions) {
  const map = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    if (!map[t.category]) map[t.category] = 0;
    map[t.category] += Math.abs(t.amount);
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getBalanceTrend(transactions) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  let balance = 0;
  return sorted.map(t => {
    balance += t.amount;
    return { date: formatShortDate(t.date), balance: parseFloat(balance.toFixed(2)) };
  });
}

export function applyFilters(transactions, filters) {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  if (filters.category !== "All") {
    result = result.filter(t => t.category === filters.category);
  }

  if (filters.type !== "All") {
    result = result.filter(t => t.type === filters.type);
  }

  result.sort((a, b) => {
    if (filters.sortBy === "date") {
      return filters.sortDir === "desc"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    }
    if (filters.sortBy === "amount") {
      return filters.sortDir === "desc"
        ? Math.abs(b.amount) - Math.abs(a.amount)
        : Math.abs(a.amount) - Math.abs(b.amount);
    }
    return 0;
  });

  return result;
}