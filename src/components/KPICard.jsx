import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
        </div>
        <div className={`flex items-center text-xs sm:text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;