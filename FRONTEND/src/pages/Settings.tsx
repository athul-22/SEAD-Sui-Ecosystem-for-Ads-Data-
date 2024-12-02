import React from 'react';
import { Shield, Wallet, Bell, Globe } from 'lucide-react';
import { ConnectButton, useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, icon: Icon, children }) => (
  <div className="bg-white shadow-sm rounded-lg border border-gray-200">
    <div className="px-6 py-5 border-b border-gray-200">
      <div className="flex items-center">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const WalletDetails = () => {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        try {
          const balanceData = await suiClient.getBalance({ owner: account.address });
          setBalance(balanceData.totalBalance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [account, suiClient]);

  if (!account) {
    return <div>No wallet connected.</div>;
  }

  return (
    <div>
      <p><strong>Wallet Address:</strong> {account.address}</p>
      <p><strong>Balance:</strong> {balance !== null ? `${balance} SUI` : 'Loading...'}</p>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="mt-8 space-y-6">
        <SettingsSection
          title="Wallet Settings"
          description="Manage your connected wallets and view details"
          icon={Wallet}
        >
          <ConnectButton />
          <div className="mt-4">
            <WalletDetails />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Security Settings"
          description="Manage your account security and permissions"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="btn-primary">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Spending Limits</h4>
                <p className="text-sm text-gray-500">Set daily and per-campaign spending limits</p>
              </div>
              <button className="btn-primary">Configure</button>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notification Preferences"
          description="Choose how you want to receive updates"
          icon={Bell}
        >
          <div className="space-y-4">
            {['Campaign Performance', 'Budget Alerts', 'Security Updates'].map((item) => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">{item}</label>
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          title="Network Settings"
          description="Configure blockchain networks and gas settings"
          icon={Globe}
        >
          <div className="space-y-4">
            {['SUI'].map((network) => (
              <div key={network} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">{network}</label>
              </div>
            ))}
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings;
