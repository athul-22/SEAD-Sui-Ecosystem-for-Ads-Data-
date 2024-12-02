import React from 'react';
import { Menu, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import ConnectWallet from './ConnectWallet';

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const account = useCurrentAccount();
  
  React.useEffect(() => {
    if (account?.address) {
      localStorage.setItem('suiwid', account.address);
    }
  }, [account]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={onMenuClick} className="ml-20 p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <Link to="/" className="ml-3 text-xl font-semibold text-indigo-600">Web3 Ads</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;