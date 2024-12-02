import React from 'react';

const objectives = [
  { id: 'awareness', label: 'Brand Awareness' },
  { id: 'traffic', label: 'Website Traffic' },
  { id: 'engagement', label: 'Community Engagement' },
  { id: 'conversion', label: 'Conversions' },
];

const BasicInfo = ({ formData, setFormData }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Details</h2>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* Campaign Name */}
        <div className="space-y-2">
          <label 
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Campaign Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.basicInfo.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     placeholder:text-gray-400"
            placeholder="Enter campaign name"
          />
        </div>

        {/* Campaign Objective */}
        <div className="space-y-2">
          <label 
            htmlFor="objective"
            className="block text-sm font-medium text-gray-900"
          >
            Campaign Objective
          </label>
          <select
            id="objective"
            name="objective"
            value={formData.basicInfo.objective}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     bg-white"
          >
            <option value="" className="text-gray-500">Select an objective</option>
            {objectives.map((objective) => (
              <option 
                key={objective.id} 
                value={objective.id}
                className="text-gray-900"
              >
                {objective.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campaign Description */}
        <div className="space-y-2">
          <label 
            htmlFor="description"
            className="block text-sm font-medium text-gray-900"
          >
            Campaign Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.basicInfo.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     placeholder:text-gray-400 resize-none"
            placeholder="Describe your campaign"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;