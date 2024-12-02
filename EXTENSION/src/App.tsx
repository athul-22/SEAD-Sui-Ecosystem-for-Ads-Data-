import React, { useEffect, useState } from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import '@mysten/dapp-kit/dist/index.css';
import './styles/popup.css';

declare const chrome: any;

const queryClient = new QueryClient();
const networks = {
  testnet: { url: getFullnodeUrl('testnet') }
};

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletId, setWalletId] = useState<string | null>(null);

  // Initial load of wallet ID from storage
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        chrome.storage.local.get(['suiwid'], (result: { suiwid: string | null }) => {
          console.log('Initial wallet check:', result.suiwid);
          if (result.suiwid) {
            setWalletId(result.suiwid);
            setIsConnected(true);
          }
        });
      } catch (error) {
        console.error('Error checking wallet:', error);
      }
    };

    initializeWallet();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (changes: any, namespace: string) => {
      if (namespace === 'local' && changes.suiwid) {
        console.log('Storage changed:', changes.suiwid.newValue);
        setWalletId(changes.suiwid.newValue);
        setIsConnected(!!changes.suiwid.newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Listen for runtime messages
  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'WALLET_UPDATE') {
        console.log('Received wallet update:', message.walletId);
        setWalletId(message.walletId);
        setIsConnected(!!message.walletId);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider autoConnect={false}>
          <div className="popup-container">
            {isConnected && walletId ? (
              <HomePage suiwid={walletId} />
            ) : (
              <WelcomePage />
            )}
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;