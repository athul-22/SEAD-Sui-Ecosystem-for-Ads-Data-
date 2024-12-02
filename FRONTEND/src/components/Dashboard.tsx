import React from 'react';
import { BarChart3, Users, Target, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change }: { title: string; value: string; icon: any; change?: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {change && (
          <p className="text-sm mt-1">
            <span className="text-green-500">↑ {change}</span> vs last month
          </p>
        )}
      </div>
      <div className="p-3 bg-indigo-50 rounded-full">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Campaigns"
          value="24"
          icon={Target}
          change="12%"
        />
        <StatCard
          title="Active Ads"
          value="156"
          icon={TrendingUp}
          change="8%"
        />
        <StatCard
          title="Total Reach"
          value="2.4M"
          icon={Users}
          change="24%"
        />
        <StatCard
          title="Total Spent"
          value="12.8 ETH"
          icon={BarChart3}
          change="18%"
        />
      </div>

      <div className="mt-8">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Campaigns
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="text-center text-gray-500 py-8">
              Connect your wallet to view campaign history
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;