// src/modals/InfoModal.tsx

import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{content}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded-md w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};
