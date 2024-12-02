// import React from 'react';
// import { Info } from 'lucide-react';
// import { Toggle } from '../ui/Toggle';

// interface SettingsCardProps {
//   onShowAdsInfo: () => void;
//   onShowDataInfo: () => void;
// }

// export const SettingsCard: React.FC<SettingsCardProps> = ({
//   onShowAdsInfo,
//   onShowDataInfo,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
      
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-sm">Show Ads</span>
//             <button
//               onClick={onShowAdsInfo}
//               className="text-gray-500 hover:text-indigo-600"
//             >
//               <Info size={16} />
//             </button>
//           </div>
//           <Toggle />
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-sm">Share Data</span>
//             <button
//               onClick={onShowDataInfo}
//               className="text-gray-500 hover:text-indigo-600"
//             >
//               <Info size={16} />
//             </button>
//           </div>
//           <Toggle />
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useState } from 'react';
import { ChevronLeft, Settings, Clock, Globe, InfoIcon } from 'lucide-react';

interface SettingsCardProps {
  onShowAdsInfo: () => void;
  onShowDataInfo: () => void;
  interval: number;
  setInterval: (value: number) => void;
  websites: string[];
  onAddSite: (site: string) => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  onShowAdsInfo,
  onShowDataInfo,
  interval,
  setInterval,
  websites,
  onAddSite
}) => {
  const [site, setSite] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddSite = () => {
    if (site) {
      onAddSite(site);
      setSite('');
    }
  };

  if (!isExpanded) {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsExpanded(false)} 
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <Settings className="w-6 h-6 text-indigo-600" />
          <span>Settings</span>
        </h2>
      </div>

      <div className="space-y-6">
        {/* Ads Interval Setting */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-indigo-600" />
            <label className="text-gray-700 font-semibold">
              Push Ads Interval
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="w-20 border border-gray-300 p-2 rounded-md text-center"
            />
            <span className="text-gray-500">minutes</span>
            <button 
              onClick={onShowAdsInfo}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <InfoIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Web Scraping Setting */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="text-gray-700 font-semibold">Web Scraping</h3>
            <button 
              onClick={onShowDataInfo}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <InfoIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="url"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="flex-grow border border-gray-300 p-2 rounded-md"
                placeholder="Enter site URL"
              />
              <button
                onClick={handleAddSite}
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Sites List */}
            {websites.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Sites to Scrape</h4>
                <ul className="space-y-2">
                  {websites.map((site, index) => (
                    <li 
                      key={index} 
                      className="flex items-center space-x-3 bg-white p-2 rounded-md shadow-sm"
                    >
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${site}`}
                        alt="site favicon"
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{site}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};