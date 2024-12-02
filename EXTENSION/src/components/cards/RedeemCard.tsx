import React from 'react';
import { Gift, Award } from 'lucide-react';

export const RedeemCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Redeem SEAD</h2>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
          <Gift className="text-indigo-600 w-5 h-5" />
          <span className="text-sm font-medium">Coupon Codes</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
          <Award className="text-indigo-600 w-5 h-5" />
          <span className="text-sm font-medium">Royalty Program</span>
        </button>
      </div>
    </div>
  );
};