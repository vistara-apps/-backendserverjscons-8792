import express from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 5000;

// Dummy user data (In production, use proper database and password hashing)
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' }
];

// Enhanced KPI data with timestamps
const kpis = {
  totalSales: 150000,
  activeCustomers: 1200,
  dailyRevenue: 5000,
  liquidityRatio: 2.4,
  totalVolume: 2500000,
  activePositions: 850,
  lastUpdated: new Date().toISOString(),
  trends: {
    salesTrend: 12.5,
    customersTrend: 8.2,
    revenueTrend: 5.7,
    liquidityTrend: 2.1,
    volumeTrend: 15.3,
    positionsTrend: 6.8
  }
};

// Extended sales data with more metrics
const salesData = [
  { date: '2025-01-01', sales: 4000, volume: 45000, transactions: 120, avgOrderValue: 33.33 },
  { date: '2025-01-02', sales: 4500, volume: 48000, transactions: 135, avgOrderValue: 33.33 },
  { date: '2025-01-03', sales: 4700, volume: 52000, transactions: 141, avgOrderValue: 33.33 },
  { date: '2025-01-04', sales: 5200, volume: 58000, transactions: 156, avgOrderValue: 33.33 },
  { date: '2025-01-05', sales: 4800, volume: 55000, transactions: 144, avgOrderValue: 33.33 },
  { date: '2025-01-06', sales: 5500, volume: 62000, transactions: 165, avgOrderValue: 33.33 },
  { date: '2025-01-07', sales: 6200, volume: 68000, transactions: 186, avgOrderValue: 33.33 }
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    type: 'position_opened',
    description: 'Large position opened',
    amount: 125000,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    status: 'success'
  },
  {
    id: 2,
    type: 'liquidity_update',
    description: 'Liquidity pool updated',
    amount: 85000,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: 'info'
  },
  {
    id: 3,
    type: 'customer_registered',
    description: 'New customer registered',
    amount: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    status: 'success'
  },
  {
    id: 4,
    type: 'trade_executed',
    description: 'High-value trade executed',
    amount: 75000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    status: 'success'
  }
];

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
      code: 'MISSING_CREDENTIALS'
    });
  }
  
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Username and password must be strings',
      code: 'INVALID_INPUT_TYPE'
    });
  }
  
  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Username must be at least 3 characters and password at least 6 characters',
      code: 'INVALID_INPUT_LENGTH'
    });
  }
  
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Login endpoint with enhanced validation
app.post('/api/login', validateLoginInput, (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// KPIs endpoint with error handling
app.get('/api/kpis', (req, res) => {
  try {
    res.json({
      success: true,
      data: kpis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('KPIs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch KPIs',
      code: 'KPIS_ERROR'
    });
  }
});

// Sales data endpoint with optional date filtering
app.get('/api/sales', (req, res) => {
  try {
    const { startDate, endDate, limit } = req.query;
    let filteredData = [...salesData];
    
    // Filter by date range if provided
    if (startDate) {
      filteredData = filteredData.filter(item => new Date(item.date) >= new Date(startDate));
    }
    if (endDate) {
      filteredData = filteredData.filter(item => new Date(item.date) <= new Date(endDate));
    }
    
    // Limit results if specified
    if (limit && !isNaN(parseInt(limit))) {
      filteredData = filteredData.slice(0, parseInt(limit));
    }
    
    res.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Sales data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales data',
      code: 'SALES_DATA_ERROR'
    });
  }
});

// Recent activity endpoint
app.get('/api/activity', (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit);
    
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be a number between 1 and 100',
        code: 'INVALID_LIMIT'
      });
    }
    
    const limitedActivity = recentActivity.slice(0, limitNum);
    
    res.json({
      success: true,
      data: limitedActivity,
      total: limitedActivity.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity data',
      code: 'ACTIVITY_ERROR'
    });
  }
});

// Analytics summary endpoint
app.get('/api/analytics/summary', (req, res) => {
  try {
    const summary = {
      totalRevenue: salesData.reduce((sum, item) => sum + item.sales, 0),
      totalVolume: salesData.reduce((sum, item) => sum + item.volume, 0),
      totalTransactions: salesData.reduce((sum, item) => sum + item.transactions, 0),
      averageOrderValue: salesData.reduce((sum, item) => sum + item.avgOrderValue, 0) / salesData.length,
      growthRate: 12.5,
      conversionRate: 3.2,
      customerRetention: 85.7,
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics summary',
      code: 'ANALYTICS_ERROR'
    });
  }
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
