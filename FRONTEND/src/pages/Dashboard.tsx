import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Target, TrendingUp } from 'lucide-react';
import axios from 'axios';

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
  interface Stats {
    totalCampaigns: number;
    activeAds: number;
    totalReach: number;
    totalSpent: number;
    recentCampaigns: { _id: string; campaignName: string; totalBudget: number }[];
  }

  const [stats, setStats] = useState<Stats | null>(null);
  const suiwid = localStorage.getItem('suiwid');

  useEffect(() => {
    if (!suiwid) return;

    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/dashboard/${suiwid}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, [suiwid]);

  if (!suiwid) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {stats && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Campaigns"
            value={stats.totalCampaigns.toString()}
            icon={Target}
          />
          <StatCard
            title="Active Ads"
            value={stats.activeAds.toString()}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Reach"
            value={`${(stats.totalReach/1000000).toFixed(1)}M`}
            icon={Users}
          />
          <StatCard
            title="Total Spent"
            value={`${stats.totalSpent.toFixed(1)} SUI`}
            icon={BarChart3}
          />
        </div>
      )}
      
      {/* Recent Campaigns section */}
      <div className="mt-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium">Recent Campaigns</h3>
          </div>
          <div className="px-6 py-5">
            {stats && stats.recentCampaigns.length > 0 ? (
              <div className="space-y-4">
                {stats.recentCampaigns.map((campaign) => (
                  <div key={campaign._id} className="flex justify-between items-center">
                    <span>{campaign.campaignName}</span>
                    <span>{campaign.totalBudget} SUI</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No campaigns found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;