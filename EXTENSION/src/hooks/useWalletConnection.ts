import { useState, useEffect } from 'react';

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletId, setWalletId] = useState<string>('');

  useEffect(() => {
    const checkWalletConnection = () => {
      const storedWalletId = localStorage.getItem('suiWid');
      setIsConnected(!!storedWalletId);
      setWalletId(storedWalletId || '');
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    
    return () => {
      window.removeEventListener('storage', checkWalletConnection);
    };
  }, []);

  return { isConnected, walletId };
};