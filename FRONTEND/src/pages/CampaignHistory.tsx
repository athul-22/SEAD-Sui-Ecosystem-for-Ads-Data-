import React from 'react';
import { Calendar, BarChart2, ExternalLink } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Q4 Token Launch',
    status: 'completed',
    duration: 'Oct 1 - Dec 31, 2023',
    spent: '4.8 ETH',
    impressions: '128.5K',
    clicks: '3.2K',
    ctr: '2.49%',
  },
  {
    id: 2,
    name: 'Community Growth',
    status: 'completed',
    duration: 'Aug 15 - Sep 30, 2023',
    spent: '2.6 ETH',
    impressions: '82.3K',
    clicks: '2.1K',
    ctr: '2.55%',
  },
];

const CampaignHistory = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Campaign History</h1>
          <p className="mt-2 text-sm text-gray-700">
            View performance metrics for your past campaigns
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="h-5 w-5 mr-2" />
            Filter by Date
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Campaign</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Spent</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Impressions</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Clicks</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CTR</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{campaign.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.duration}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.spent}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.impressions}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.clicks}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{campaign.ctr}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-400 hover:text-gray-500">
                            <BarChart2 className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            <ExternalLink className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHistory;