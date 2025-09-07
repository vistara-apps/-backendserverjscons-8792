import React, { useState, useEffect } from 'react';
import { LogOut, TrendingUp, Users, DollarSign, Activity, BarChart3, Wallet } from 'lucide-react';
import LiquidityChart from './LiquidityChart';
import KPICard from './KPICard';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
  const [kpis, setKpis] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiResponse, salesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/kpis'),
          axios.get('http://localhost:5000/api/sales')
        ]);
        
        // Handle enhanced API response format
        setKpis(kpiResponse.data.data || kpiResponse.data);
        setSalesData(salesResponse.data.data || salesResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // You could add error state handling here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Liquidity Dashboard
          </h1>
          <p className="text-gray-300">Welcome back, {user.username}</p>
        </div>
        <button
          onClick={onLogout}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
        <KPICard
          title="Total Sales"
          value={`$${kpis.totalSales?.toLocaleString()}`}
          icon={DollarSign}
          trend="+12.5%"
          trendUp={true}
        />
        <KPICard
          title="Active Customers"
          value={kpis.activeCustomers?.toLocaleString()}
          icon={Users}
          trend="+8.2%"
          trendUp={true}
        />
        <KPICard
          title="Daily Revenue"
          value={`$${kpis.dailyRevenue?.toLocaleString()}`}
          icon={TrendingUp}
          trend="+5.7%"
          trendUp={true}
        />
        <KPICard
          title="Liquidity Ratio"
          value={kpis.liquidityRatio}
          icon={Activity}
          trend="+2.1%"
          trendUp={true}
        />
        <KPICard
          title="Total Volume"
          value={`$${(kpis.totalVolume / 1000000).toFixed(1)}M`}
          icon={BarChart3}
          trend="+15.3%"
          trendUp={true}
        />
        <KPICard
          title="Active Positions"
          value={kpis.activePositions?.toLocaleString()}
          icon={Wallet}
          trend="+6.8%"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Sales Trend</h3>
          <LiquidityChart data={salesData} type="sales" />
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Volume Trend</h3>
          <LiquidityChart data={salesData} type="volume" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-gray-300">Large position opened</span>
            </div>
            <span className="text-white font-medium">$125,000</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-gray-300">Liquidity pool updated</span>
            </div>
            <span className="text-white font-medium">$85,000</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <span className="text-gray-300">New customer registered</span>
            </div>
            <span className="text-white font-medium">+1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
