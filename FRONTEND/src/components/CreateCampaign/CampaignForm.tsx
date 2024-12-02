/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Globe, Upload, Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';

import axios from "axios";

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Transaction } from "@mysten/sui/transactions";

const base64Key =
  "0x2734e6fbdf4a9c3d7b0c5f2079a2949083bdb29b80ed35bada2ec628f4ae84cb";



interface Location {
  name: string;
  code: string;
  flag: string;
}

interface FormData {
  suiwid: string;
  campaignName: string;
  campaignObjective: string;
  adTitle: string;
  adDescription: string;
  adImage: string | null;
  adLink: string;
  totalBudget: string;
  totalDays: string;
  cpc: string;
  interests: string[];
  locations: Location[];
  startDate: Date | null;
  endDate: Date | null;
}

const AdCampaignForm = () => {

	const [digest, setDigest] = useState('');

  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('0x2734e6fbdf4a9c3d7b0c5f2079a2949083bdb29b80ed35bada2ec628f4ae84cb');
  const [status, setStatus] = useState('');
  const account = useCurrentAccount();

  // const handlePaymentAndSubmit = async (formData: FormData) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3005/campaigns",
  //       formData
  //     );

  //     if (response.status === 201) {
  //       alert("Campaign created successfully!");
  //       console.log("Backend Response:", response.data);
  //     } else {
  //       console.error("Failed to submit campaign:", response);
  //       alert(
  //         "Something went wrong while creating the campaign. Please try again."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //     alert("An error occurred during the process. Please try again.");
  //   }
  // };


  const validateFormData = (formData: FormData): boolean => {
    if (!formData.campaignName || !formData.totalBudget) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };
  
//   const handlePaymentAndSubmit = async (formData: FormData) => {
//     if (!validateFormData(formData)) return;

//     const amountInMIST = Number(formData.totalBudget) * 1e9; 
//     const recipientWallet = '0x2734e6fbdf4a9c3d7b0c5f2079a2949083bdb29b80ed35bada2ec628f4ae84cb'; 

//     if (!account) {
//         alert("Please connect your wallet.");
//         return;
//     }

//     try {
//         const tx = new TransactionBlock();
//         const [coin] = tx.splitCoins(tx.gas, [tx.pure(amountInMIST)]);
//         tx.transferObjects([coin], tx.pure(recipientWallet));

//         const paymentResponse = await signAndExecuteTransaction.mutateAsync({
//             transaction: tx.serialize(),
//         });

//         console.log("Payment Response:", paymentResponse); // Log full response for debugging

//         // Check if effects indicate success
//         const effects = JSON.parse(paymentResponse.effects);
//         if (effects && effects.status === 'success') {
//             // Store payment response in local storage
//             localStorage.setItem('paymentResponse', JSON.stringify(paymentResponse));

//             try {
//                 const response = await axios.post("http://localhost:3005/campaigns", formData);

//                 if (response.status === 201) {
//                     alert("Campaign created successfully!");
//                     console.log("Backend Response:", response.data);
//                 } else {
//                     console.error("Failed to create campaign:", response);
//                     alert("Something went wrong while creating the campaign. Please try again.");
//                 }
//             } catch (error) {
//                 console.error("Error occurred during campaign creation:", error);
//                 alert("An error occurred during the process. Please try again.");
//             }
//         } else {
//             alert(`Payment failed: ${paymentResponse.effects || 'Unknown error'}`);
//         }
//     } catch (error) {
//         const errorMessage = (error as Error).message;
//         alert(`Payment failed: ${errorMessage}`);
//     }
// };

const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
const currentAccount = useCurrentAccount();

const handlePaymentAndSubmit = async (formData: FormData) => {
  if (!currentAccount) {
    alert("Please connect your wallet.");
    return;
  }

  const amountInMIST = Number(formData.totalBudget) * 1e9;
  const recipientWallet = "0x2734e6fbdf4a9c3d7b0c5f2079a2949083bdb29b80ed35bada2ec628f4ae84cb";

  // Create a new transaction
  const tx = new Transaction();
  const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInMIST)]);
  tx.transferObjects([coin], tx.pure.address(recipientWallet));

  // Sign and execute the transaction
  signAndExecuteTransaction(
    { transaction: tx, chain: 'sui:testnet' },
    {
      onSuccess: async (result) => {
        console.log("Transaction executed:", result);
        await storePaymentResponse(formData, result);
      },
      onError: (error) => {
        console.error("Transaction error:", error);
        alert(`Transaction failed: ${error.message || "Unknown error"}`);
      }
    }
  );
};

const storePaymentResponse = async (formData: FormData, paymentResponse: any) => {
  try {
    const response = await axios.post("http://localhost:3005/campaigns", formData);
    
    if (response.status === 201) {
      // alert("Campaign created successfully!");
      console.log("Campaign created:", response.data);
     window.location.href = '/success';
    } else {
      throw new Error("Failed to create campaign");
    }
  } catch (error) {
    console.error("Campaign creation error:", error);
    alert("Failed to create campaign. Please try again.");
  }
};

  const suiwid = localStorage.getItem('suiwid');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    suiwid: suiwid || '',
    campaignName: "",
    campaignObjective: "",
    adTitle: "",
    adDescription: "",
    adImage: "",
    adLink: "",
    totalBudget: "",
    totalDays: "",
    cpc: "",
    interests: [],
    locations: [],
    startDate: null,
    endDate: null,
  });

  const [dragActive, setDragActive] = useState(false);

  const countryList: Location[] = [
    { name: "India", code: "IN", flag: "🇮🇳" },
  ];

  const interestCategories = [
    { name: "Technology", emoji: "💻" },
    { name: "Finance", emoji: "💰" },
    { name: "Gaming", emoji: "🎮" },
    { name: "Travel", emoji: "✈️" },
    { name: "Health", emoji: "🏥" },
    { name: "Fitness", emoji: "💪" },
    { name: "Fashion", emoji: "👗" },
    { name: "Education", emoji: "📚" },
    { name: "Art", emoji: "🎨" },
    { name: "Music", emoji: "🎵" },
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (name: string, date: Date | null) =>
    setFormData({ ...formData, [name]: date });

  const handleLocationSelect = (country: Location) => {
    if (!formData.locations.find((loc) => loc.code === country.code)) {
      setFormData({
        ...formData,
        locations: [...formData.locations, country],
      });
    }
  };

  const handleInterestSelect = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const removeLocation = (locationCode: string) => {
    setFormData({
      ...formData,
      locations: formData.locations.filter((loc) => loc.code !== locationCode),
    });
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((item) => item !== interest),
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    setFormData({
      ...formData,
      adImage: URL.createObjectURL(file),
    });
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              step >= num
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={`w-12 h-1 ${
                step > num ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const CustomSelect = ({
    options,
    value,
    onChange,
    placeholder,
  }: {
    options: any[];
    value: string;
    onChange: (value: any) => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.code || option.name}>
            {option.flag || option.emoji} {option.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  const showid = () => {
    alert(localStorage.getItem('suiwid'));
  }

  return (
    <div
      className="min-h-screen  from-indigo-50 to-white flex items-center justify-center px-4 py-1"
      style={{ marginTop: "-70px" }}
    >
      {/* <button onClick={showid}> show id</button> */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8">
        <StepIndicator />

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {step === 1 && "Create Ad Campaign"}
          {step === 2 && "Ad Information"}
          {step === 3 && "Budget and Targeting"}
        </h2>

        {/* Step 1: Campaign Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="group">
              <label className="block text-gray-700 font-medium mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleChange}
                placeholder="Enter your campaign name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 ease-in-out"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">
                Campaign Objective
              </label>
              <CustomSelect
                options={[
                  { name: "Brand Awareness", emoji: "👀" },
                  { name: "Website Traffic", emoji: "🌐" },
                  { name: "Conversions", emoji: "🎯" },
                  { name: "Social Engagement", emoji: "🤝" },
                ]}
                value={formData.campaignObjective}
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                placeholder="Select an objective"
              />
            </div> */}
          </div>
        )}

        {/* Step 2: Ad Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Title
              </label>
              <input
                type="text"
                name="adTitle"
                value={formData.adTitle}
                onChange={handleChange}
                placeholder="Enter ad title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Description
              </label>
              <textarea
                name="adDescription"
                value={formData.adDescription}
                onChange={handleChange}
                placeholder="Enter ad description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Image
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                }`}
              >
                {formData.adImage ? (
                  <div className="relative">
                    <img
                      src={formData.adImage}
                      alt="Ad Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setFormData({ ...formData, adImage: null })
                      }
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <div className="text-gray-600">
                      Drag and drop your image here, or
                      <label className="ml-1 text-indigo-600 hover:text-indigo-700 cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0]);
                            }
                          }}
                        />
                        browse
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Supported formats: PNG, JPG, GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div> */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Image URL
              </label>
              <input
                type="text"
                name="adImage"
                value={formData.adImage || ""}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Click Link
              </label>
              <input
                type="url"
                name="adLink"
                value={formData.adLink}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 3: Budget and Targeting */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Start Date
                </label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleDateChange("startDate", date)}
                  placeholderText="Select start date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  End Date
                </label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleDateChange("endDate", date)}
                  placeholderText="Select end date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Target Interests
              </label>
              <CustomSelect
                options={interestCategories}
                value=""
                onChange={(e) => handleInterestSelect(e.target.value)}
                placeholder="Select interests"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.interests.map((interest) => {
                  const interestCategory = interestCategories.find(
                    (cat) => cat.name === interest
                  );
                  return (
                    <div
                      key={interest}
                      className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg"
                    >
                      <span>{interestCategory?.emoji}</span>
                      <span>{interest}</span>
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Target Locations
              </label>
              <CustomSelect
                options={countryList}
                value=""
                onChange={(e) => {
                  const country = countryList.find(
                    (c) => c.code === e.target.value
                  );
                  if (country) handleLocationSelect(country);
                }}
                placeholder="Select countries"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.locations.map((location) => (
                  <div
                    key={location.code}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg animate-fadeIn"
                  >
                    <span>{location.flag}</span>
                    <span>{location.name}</span>
                    <button
                      onClick={() => removeLocation(location.code)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Total Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="totalBudget"
                    value={formData.totalBudget}
                    onChange={handleChange}
                    placeholder="Enter budget"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cost per Click (CPC)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="cpc"
                    value={formData.cpc}
                    onChange={handleChange}
                    placeholder="Enter CPC"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          ) : (
            <button
              // onClick={() => {
              //   // Here you would typically submit the form data to your backend
              //   console.log("Form Data:", formData);
              //   alert("Campaign created successfully!");
              // }}
              onClick={() => {
                handlePaymentAndSubmit(formData);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
            >
              <span>Launch Campaign</span>
              <Globe size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCampaignForm;
