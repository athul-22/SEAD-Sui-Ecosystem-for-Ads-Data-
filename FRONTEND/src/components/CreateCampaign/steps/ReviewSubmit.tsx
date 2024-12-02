import React from 'react';
import { Check } from 'lucide-react';

const ReviewSubmit = ({ formData }: any) => {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Review your campaign details</h3>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900">Basic Information</h4>
          <dl className="mt-2 text-sm text-gray-700">
            <div className="mt-1">
              <dt className="inline font-medium">Campaign Name:</dt>
              <dd className="inline ml-1">{formData.basicInfo.name}</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">Objective:</dt>
              <dd className="inline ml-1">{formData.basicInfo.objective}</dd>
            </div>
          </dl>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900">Targeting</h4>
          <dl className="mt-2 text-sm text-gray-700">
            <div className="mt-1">
              <dt className="inline font-medium">Blockchains:</dt>
              <dd className="inline ml-1">{formData.targeting.blockchain.join(', ')}</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">Interests:</dt>
              <dd className="inline ml-1">{formData.targeting.interests.join(', ')}</dd>
            </div>
          </dl>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900">Budget & Schedule</h4>
          <dl className="mt-2 text-sm text-gray-700">
            <div className="mt-1">
              <dt className="inline font-medium">Total Budget:</dt>
              <dd className="inline ml-1">{formData.budget.total} ETH</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">Duration:</dt>
              <dd className="inline ml-1">{formData.budget.startDate} to {formData.budget.endDate}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">
          By clicking submit, you agree to our terms of service and confirm that your wallet has sufficient funds for this campaign.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmit;