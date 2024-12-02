import React, { useEffect, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';

const UserWalletConnect = () => {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (connectionStatus === 'connected' && currentWallet?.accounts.length > 0) {
      const walletId = currentWallet.accounts[0].address;
      setWalletAddress(walletId);
      localStorage.setItem('suiwid', walletId); 
    }
  }, [connectionStatus, currentWallet]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #4F46E5, #6D28D9)',
      color: 'white',
      textAlign: 'center',
    }}>
      {connectionStatus !== 'connected' ? (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}>
          <h1 style={{
            color: '#4F46E5',
            fontSize: '28px',
            marginBottom: '20px',
            fontWeight: '700',
          }}>Connect Your Wallet</h1>
          <p style={{
            color: 'grey',
            fontSize: '16px',
            marginBottom: '20px',
          }}>
            By continuing, you agree to our Terms and Conditions.
          </p>
          <ConnectButton
            style={{
              width: 'auto',
              color: 'white',
              border: '1px solid grey',
              borderRadius: '5px',
              padding: '10px 20px',
              backgroundColor: '#4F46E5',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Connect Wallet
          </ConnectButton>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}>
          <BadgeCheck
            size={100}
            color="#4F46E5"
            strokeWidth={1.5}
            style={{ marginBottom: '20px' }}
          />
          <h1 style={{
            color: '#4F46E5',
            fontSize: '28px',
            marginBottom: '20px',
            fontWeight: '700',
          }}>Wallet Connected</h1>
          <p style={{
            color: 'grey',
            fontSize: '16px',
            marginBottom: '20px',
          }}>
            Success! Your wallet is connected. Start earning now!
          </p>
          <p style={{
            color: '#4F46E5',
            fontSize: '16px',
            fontWeight: '600',
          }}>
            Wallet Address: {walletAddress}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserWalletConnect;
