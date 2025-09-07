const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Dummy user data
const users = [{ username: 'admin', password: 'admin123', role: 'admin' }];

// Dummy KPI data
const kpis = {
  totalSales: 150000,
  activeCustomers: 1200,
  dailyRevenue: 5000,
  liquidityRatio: 2.4,
  totalVolume: 2500000,
  activePositions: 850
};

// Dummy sales data (for chart)
const salesData = [
  { date: '2025-01-01', sales: 4000, volume: 45000 },
  { date: '2025-01-02', sales: 4500, volume: 48000 },
  { date: '2025-01-03', sales: 4700, volume: 52000 },
  { date: '2025-01-04', sales: 5200, volume: 58000 },
  { date: '2025-01-05', sales: 4800, volume: 55000 },
  { date: '2025-01-06', sales: 5500, volume: 62000 },
  { date: '2025-01-07', sales: 6200, volume: 68000 }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, user: { username: user.username, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// KPIs endpoint
app.get('/api/kpis', (req, res) => {
  res.json(kpis);
});

// Sales data endpoint
app.get('/api/sales', (req, res) => {
  res.json(salesData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});