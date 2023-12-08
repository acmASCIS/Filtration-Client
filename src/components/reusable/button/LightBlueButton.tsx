import React from 'react';

interface LightBlueButtonProps {
  label: string;
  onClick?: (e?:any) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const LightBlueButton: React.FC<LightBlueButtonProps> = ({ label, onClick, className, type, style }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      style={style}
    >
      {label}
    </button>
  );
};

export default LightBlueButton;
