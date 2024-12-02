import React, { useState, useEffect } from 'react';
import { Activity, HardDrive, Users, ArrowUpRight, Eye, X } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const generateSuiAddress = () => {
  return '0x' + Array(8).fill(0).map(() => Math.random().toString(16)[2]).join('');
};

const websites = [
  { domain: 'google.com', title: 'Google Search' },
  { domain: 'twitter.com', title: 'X (Twitter)' },
  { domain: 'youtube.com', title: 'YouTube' },
  { domain: 'linkedin.com', title: 'LinkedIn' },
  { domain: 'github.com', title: 'GitHub' },
  { domain: 'amazon.com', title: 'Amazon' },
  { domain: 'reddit.com', title: 'Reddit' },
  { domain: 'netflix.com', title: 'Netflix' }
];

const generateWebData = () => {
  const shuffled = [...websites].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2).map(site => ({
    title: site.title,
    url: `https://www.${site.domain}`,
    content: `User visited ${site.title} and interacted with the main feed. Session duration: ${Math.floor(Math.random() * 20) + 1} minutes. Typical browsing patterns observed with focus on content consumption and user engagement metrics.`
  }));
};

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

type User = {
  id: string;
  joinedAt: string;
  webData: {
    title: string;
    url: string;
    content: string;
    }[];
  };

const dummyData: User[] = Array(8).fill(null).map(() => ({
  id: generateSuiAddress(),
  joinedAt: `Dec 1, 2024 ${generateRandomTime()}`,
  webData: generateWebData()
}));

export default function Dashboard() {
  const [totalBytes, setTotalBytes] = useState(1000);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.random() * 4 + 1;
      setTotalBytes(prev => prev + increment);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "Total Data Collected",
      value: `${totalBytes.toFixed(2)} MB`,
      icon: HardDrive,
      color: "rgb(79 70 229)",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Active Users",
      value: "8",
      icon: Users,
      color: "rgb(79 70 229)",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Average Session",
      value: "12m",
      icon: Activity,
      color: "rgb(79 70 229)",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Data Points",
      value: "847",
      icon: ArrowUpRight,
      color: "rgb(79 70 229)",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-indigo-50/30 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-none hover:shadow-md transition-shadow duration-200">
            <div className={`flex items-center p-6 ${metric.bgColor}`}>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: metric.color }}>
                  {metric.value}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/80 backdrop-blur-sm">
                <metric.icon className="h-6 w-6" style={{ color: metric.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card className="border-none">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    Wallet ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    Joined At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider w-16">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {dummyData.map((user) => (
                  <tr key={user?.id} className="hover:bg-indigo-50/30 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                      {user?.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user?.joinedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsOpen(true);
                        }}
                        className="p-2 hover:bg-indigo-100 rounded-full transition-colors duration-150"
                      >
                        <Eye className="h-4 w-4 text-indigo-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-lg border-l border-gray-100 transform transition-transform duration-200 ease-in-out">
          <div className="h-full flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">User Activity</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {selectedUser?.webData.map((data, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50/50 rounded-lg">
                  <h3 className="font-medium mb-2 text-gray-800">{data.title}</h3>
                  <p className="text-sm text-indigo-600 mb-2">{data.url}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {data.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}