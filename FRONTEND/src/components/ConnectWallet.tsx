import React from 'react';
// import { ConnectButton } from '@suiet/wallet-kit';
import { ConnectButton } from '@mysten/dapp-kit';

const ConnectWallet = () => {
  return (
    <div className="inline-flex items-center">
      <ConnectButton 
        style={{width:'auto',color:'white',border:'1px solid grey',borderRadius:'5px',padding:'5px 10px',backgroundColor:'#4F46E5'}}
        className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default ConnectWallet;