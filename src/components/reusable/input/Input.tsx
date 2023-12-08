import React from 'react';

interface RoundedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RoundedInput: React.FC<RoundedInputProps> = ({ placeholder, value, onChange, }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg shadow-sm p-2"
    />
  );
};

export default RoundedInput;
