import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';

interface ConnectModalProps {
  children: ({ connected }: { connected: boolean }) => React.ReactNode;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ children }) => {
  return (
    <ConnectButton>
      {({ connected }) => children({ connected })}
    </ConnectButton>
  );
};