import React from 'react';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Balance</h2>
      <p className="text-2xl font-bold text-indigo-600">{balance.toLocaleString()} SEAD</p>
    </div>
  );
};