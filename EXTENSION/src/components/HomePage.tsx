
import React, { useState, useEffect } from 'react';
import { Home, Gift, Settings, Share2, ArrowUpRight, Gem, Globe, Database } from 'lucide-react';

interface HomePageProps {
  suiwid?: string;
}

interface UserBalance {
  balance: number;
  totalEarned: number;
}

interface RewardActivity {
  type: 'Ad Impression' | 'Ad Click';
  amount: number;
  timestamp: string;
  campaignId?: {
    adTitle?: string;
    adImage?: string;
    campaignName?: string;
  };
}

const HomePage: React.FC<HomePageProps> = ({ suiwid }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [adPreference, setAdPreference] = useState(3);
  const [dataSharing, setDataSharing] = useState(false);
  const [userBalance, setUserBalance] = useState<UserBalance>({ balance: 0, totalEarned: 0 });
  const [rewardActivity, setRewardActivity] = useState<RewardActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!suiwid) return;
      
  //     try {
  //       // Fetch balance
  //       const balanceResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/balance`);
  //       const balanceData = await balanceResponse.json();
  //       setUserBalance(balanceData);

  //       // Fetch activity
  //       const activityResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/activity`);
  //       const activityData = await activityResponse.json();
  //       setRewardActivity(activityData);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [suiwid]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!suiwid) {
  //       setLoading(false);
  //       return;
  //     }
      
  //     setLoading(true);
  //     try {
  //       // Add delay to prevent flash
  //       const balanceResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/balance`);
  //       if (!balanceResponse.ok) {
  //         console.error('Balance fetch failed:', await balanceResponse.text());
  //         throw new Error('Failed to fetch balance');
  //       }
  //       const balanceData = await balanceResponse.json();
  //       setUserBalance(balanceData);
  
  //       const activityResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/activity`);
  //       if (!activityResponse.ok) {
  //         console.error('Activity fetch failed:', await activityResponse.text());
  //         throw new Error('Failed to fetch activity');
  //       }
  //       const activityData = await activityResponse.json();
  //       setRewardActivity(activityData);
  
  //       // Add small delay before removing loading state
  //       await new Promise(resolve => setTimeout(resolve, 500));
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       // Keep previous data on error instead of resetting
  //       setUserBalance(prev => prev || { balance: 0, totalEarned: 0 });
  //       setRewardActivity(prev => prev || []);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchUserData();
  
  //   // Setup periodic refresh
  //   const refreshInterval = setInterval(fetchUserData, 30000); // Refresh every 30 seconds
  
  //   return () => clearInterval(refreshInterval);
  // }, [suiwid]);


  useEffect(() => {
    const fetchUserData = async () => {
      if (!suiwid) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Fetch balance with better error handling
        const balanceResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/balance`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
  
        if (balanceResponse.ok) {
          const balanceData = await balanceResponse.json();
          console.log('Balance data:', balanceData);
          if (balanceData.balance !== undefined) {
            setUserBalance({
              balance: balanceData.balance,
              totalEarned: balanceData.totalEarned
            });
          }
        } else {
          console.error('Balance fetch failed:', await balanceResponse.text());
        }
  
        // Fetch activity with better error handling
        const activityResponse = await fetch(`http://localhost:3005/api/users/${suiwid}/activity`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
  
        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          console.log('Activity data:', activityData);
          if (Array.isArray(activityData)) {
            setRewardActivity(activityData.map(activity => ({
              type: activity.type,
              amount: activity.amount,
              timestamp: activity.timestamp,
              campaignId: activity.campaignId
            })));
          }
        } else {
          console.error('Activity fetch failed:', await activityResponse.text());
        }
  
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Don't reset data on error, keep previous state
      } finally {
        setLoading(false);
      }
    };
  
    // Initial fetch
    fetchUserData();
  
    // Setup periodic refresh every 10 seconds
    const refreshInterval = setInterval(fetchUserData, 10000);
  
    // Cleanup
    return () => {
      clearInterval(refreshInterval);
    };
  }, [suiwid]);


  const getAdFrequencyText = (value: number) => {
    const frequencies = {
      1: '1 ad / 2 mins',
      2: '1 ad / 5 mins',
      3: '1 ad / 10 mins',
      4: '1 ad / 20 mins',
      5: '1 ad / 30 mins'
    };
    return frequencies[value as keyof typeof frequencies];
  };

  const HomeView = () => (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex justify-between items-center">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowUpRight className="w-5 h-5 text-indigo-600" />
        </button>
        <h1 className="text-xl font-bold">SEAD</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Share2 className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="bg-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-4xl font-bold">{userBalance.balance}</span>
          <Gem className="w-6 h-6" />
        </div>
        <div className="text-center mt-2 text-indigo-100">
          Total Earned: {userBalance.totalEarned} SEAD
        </div>
        <div className="text-center mt-1 text-xs text-indigo-200">
          {suiwid ? suiwid.slice(0, 6) + '...' + suiwid.slice(-4) : 'Wallet not connected'}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Earning Programs</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Gem className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">SEAD Rewards</h3>
                <p className="text-sm text-gray-600">Earn tokens for viewing ads while browsing</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Ad Frequency</h4>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={adPreference}
              onChange={(e) => setAdPreference(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-600">High</span>
              <span className="text-xs text-gray-600">Low</span>
            </div>
            <div className="text-center mt-1 text-xs text-gray-500">
              Current: {getAdFrequencyText(adPreference)}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Web Data Sharing</h3>
                <p className="text-sm text-gray-600">Earn by sharing anonymous browsing data</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Redeem SEAD</h2>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Coupon Codes</h3>
                  <p className="text-sm text-gray-600">Redeem special offers and discounts</p>
                </div>
              </div>
              <button className="text-indigo-600 text-sm font-medium">
                Redeem →
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Gem className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Premium NFT Card</h3>
                  <p className="text-sm text-white/80">Exclusive benefits and higher rewards</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/80">From</span>
                <span className="font-medium">1000 SEAD</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-white/80">
                Level: Silver
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-lg">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RewardsView = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rewards</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium mb-2">Available SEAD</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-indigo-600">
              {loading ? '...' : userBalance?.balance?.toFixed(2) || '0.00'}
            </span>
            <Gem className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Total Earned: {loading ? '...' : userBalance?.totalEarned?.toFixed(2) || '0.00'} SEAD
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm min-h-[200px]">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          {loading ? (
            <div className="flex items-center justify-center h-32 text-gray-400">
              <div className="animate-pulse">Loading activities...</div>
            </div>
          ) : rewardActivity.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400">
              No activity yet
            </div>
          ) : (
            <div className="space-y-3">
              {rewardActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-2 border-b last:border-0 animate-fade-in"
                >
                  <div>
                    <div className="text-sm font-medium">
                      {activity.type === 'Ad Impression' ? '👁️ View Reward' : '🎯 Click Reward'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-indigo-600">
                    +{activity.amount} SEAD
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium mb-2">Account</h3>
          <p className="text-sm text-gray-600 break-all">{suiwid}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium mb-4">Links</h3>
          <div className="space-y-4">
            <a 
              href="https://github.com/SuiSEAD/sead" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">GitHub Repository</span>
            </a>
            <a 
              href="https://docs.sead.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">Documentation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (activeTab) {
      case 'rewards':
        return <RewardsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="h-[600px] w-[360px] bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto pb-16">
        {renderView()}
      </div>
      
      <div className="bg-white border-t flex justify-around py-2 fixed bottom-0 w-[360px]">
        <button
          onClick={() => setActiveTab('home')}
          className={`p-2 rounded-lg flex flex-col items-center ${
            activeTab === 'home' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`p-2 rounded-lg flex flex-col items-center ${
            activeTab === 'rewards' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-xs mt-1">Rewards</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`p-2 rounded-lg flex flex-col items-center ${
            activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;