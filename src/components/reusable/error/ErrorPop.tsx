import React, { useState } from 'react';

interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = () => {
    setIsVisible(false);
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline mb-4">{errorMessage}</span>
        <button onClick={handleClose} className="block text-red-500 hover:text-red-700 mt-2">
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
