export const CATEGORIES = {
  Food: { color: "#f97316", icon: "🍔" },
  Transport: { color: "#3b82f6", icon: "🚗" },
  Shopping: { color: "#a855f7", icon: "🛍️" },
  Entertainment: { color: "#ec4899", icon: "🎬" },
  Health: { color: "#22c55e", icon: "💊" },
  Utilities: { color: "#eab308", icon: "⚡" },
  Salary: { color: "#10b981", icon: "💼" },
  Freelance: { color: "#06b6d4", icon: "💻" },
  Investment: { color: "#8b5cf6", icon: "📈" },
  Other: { color: "#94a3b8", icon: "📦" },
};

const raw = [
  { id: 1, date: "2024-01-03", description: "Netflix Subscription", amount: -15.99, category: "Entertainment", type: "expense" },
  { id: 2, date: "2024-01-05", description: "Grocery Store", amount: -84.50, category: "Food", type: "expense" },
  { id: 3, date: "2024-01-07", description: "Monthly Salary", amount: 4500.00, category: "Salary", type: "income" },
  { id: 4, date: "2024-01-10", description: "Uber Ride", amount: -12.30, category: "Transport", type: "expense" },
  { id: 5, date: "2024-01-12", description: "Freelance Project", amount: 850.00, category: "Freelance", type: "income" },
  { id: 6, date: "2024-01-15", description: "Electricity Bill", amount: -95.00, category: "Utilities", type: "expense" },
  { id: 7, date: "2024-01-18", description: "Amazon Order", amount: -67.40, category: "Shopping", type: "expense" },
  { id: 8, date: "2024-01-20", description: "Doctor Visit", amount: -120.00, category: "Health", type: "expense" },
  { id: 9, date: "2024-01-22", description: "Restaurant Dinner", amount: -48.00, category: "Food", type: "expense" },
  { id: 10, date: "2024-01-25", description: "Dividend Income", amount: 230.00, category: "Investment", type: "income" },
  { id: 11, date: "2024-01-28", description: "Spotify", amount: -9.99, category: "Entertainment", type: "expense" },
  { id: 12, date: "2024-01-30", description: "Fuel", amount: -55.00, category: "Transport", type: "expense" },

  { id: 13, date: "2024-02-02", description: "Coffee Shop", amount: -18.60, category: "Food", type: "expense" },
  { id: 14, date: "2024-02-05", description: "Monthly Salary", amount: 4500.00, category: "Salary", type: "income" },
  { id: 15, date: "2024-02-07", description: "Gym Membership", amount: -40.00, category: "Health", type: "expense" },
  { id: 16, date: "2024-02-10", description: "Online Course", amount: -129.00, category: "Other", type: "expense" },
  { id: 17, date: "2024-02-12", description: "Freelance Project", amount: 1200.00, category: "Freelance", type: "income" },
  { id: 18, date: "2024-02-14", description: "Valentine's Gift", amount: -89.90, category: "Shopping", type: "expense" },
  { id: 19, date: "2024-02-16", description: "Internet Bill", amount: -59.00, category: "Utilities", type: "expense" },
  { id: 20, date: "2024-02-19", description: "Movie Tickets", amount: -32.00, category: "Entertainment", type: "expense" },
  { id: 21, date: "2024-02-22", description: "Grocery Store", amount: -91.20, category: "Food", type: "expense" },
  { id: 22, date: "2024-02-24", description: "Bus Pass", amount: -45.00, category: "Transport", type: "expense" },
  { id: 23, date: "2024-02-27", description: "Investment Return", amount: 340.00, category: "Investment", type: "income" },

  { id: 24, date: "2024-03-01", description: "Water Bill", amount: -28.00, category: "Utilities", type: "expense" },
  { id: 25, date: "2024-03-04", description: "Pharmacy", amount: -35.50, category: "Health", type: "expense" },
  { id: 26, date: "2024-03-06", description: "Monthly Salary", amount: 4500.00, category: "Salary", type: "income" },
  { id: 27, date: "2024-03-08", description: "New Shoes", amount: -110.00, category: "Shopping", type: "expense" },
  { id: 28, date: "2024-03-11", description: "Freelance Project", amount: 600.00, category: "Freelance", type: "income" },
  { id: 29, date: "2024-03-14", description: "Restaurant Lunch", amount: -38.00, category: "Food", type: "expense" },
  { id: 30, date: "2024-03-17", description: "Concert Ticket", amount: -75.00, category: "Entertainment", type: "expense" },
  { id: 31, date: "2024-03-19", description: "Grocery Store", amount: -77.30, category: "Food", type: "expense" },
  { id: 32, date: "2024-03-21", description: "Car Service", amount: -180.00, category: "Transport", type: "expense" },
  { id: 33, date: "2024-03-25", description: "Dividend Income", amount: 190.00, category: "Investment", type: "income" },
  { id: 34, date: "2024-03-28", description: "Cloud Storage", amount: -2.99, category: "Other", type: "expense" },
];

export const initialTransactions = raw.map(t => ({ ...t }));

//dummy data taken from Claude.ai
