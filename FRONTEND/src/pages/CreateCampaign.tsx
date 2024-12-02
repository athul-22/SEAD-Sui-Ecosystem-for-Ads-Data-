import React from 'react';
import CampaignForm from '../components/CreateCampaign/CampaignForm';

const CreateCampaign = () => {
  return (
    <div className="max-w-7xl mx-auto mt-[-50px]">
      {/* <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create New Campaign</h1> */}
      <CampaignForm />
    </div>
  );
};

export default CreateCampaign;