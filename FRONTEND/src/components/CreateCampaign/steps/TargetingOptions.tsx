import React from 'react';

const blockchains = [
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'polygon', label: 'Polygon' },
  { id: 'solana', label: 'Solana' },
  { id: 'arbitrum', label: 'Arbitrum' },
];

const interests = [
  { id: 'defi', label: 'DeFi' },
  { id: 'nft', label: 'NFTs' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'dao', label: 'DAOs' },
];

const TargetingOptions = ({ formData, setFormData }: any) => {
  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      targeting: {
        ...formData.targeting,
        [e.target.name]: values,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Blockchains</label>
        <select
          multiple
          name="blockchain"
          value={formData.targeting.blockchain}
          onChange={handleMultiSelect}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {blockchains.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">User Interests</label>
        <select
          multiple
          name="interests"
          value={formData.targeting.interests}
          onChange={handleMultiSelect}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {interests.map((interest) => (
            <option key={interest.id} value={interest.id}>
              {interest.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Countries</label>
        <input
          type="text"
          name="countries"
          placeholder="Enter countries (comma-separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default TargetingOptions;