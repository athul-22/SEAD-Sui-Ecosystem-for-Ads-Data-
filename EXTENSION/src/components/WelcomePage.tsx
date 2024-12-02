import React from 'react';
import { Wallet } from 'lucide-react';

const WelcomePage = () => {
  const handleConnectClick = () => {
    // Open the web page in a new tab
    window.open('http://localhost:5173/suiconnect', '_blank');
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
        <div className="text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to SEAD</h1>
          <p className="text-gray-600 mb-6">Connect your Sui wallet to start earning rewards</p>
          
          <button
            onClick={handleConnectClick}
            className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;