import React from 'react';
import { Logo } from '../UI/Details'
import { GiAfrica } from "react-icons/gi";


const Loader = ({ size = 'medium' }) => {
  // Size variants
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
    xlarge: 'w-32 h-32'
  };

  const logoSizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Spinning Circle */}
        <div className={`${sizeClasses[size]} border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin`}></div>
        
        {/* African Logo in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* African Continent SVG */}
          <GiAfrica className={`${logoSizes[size]} text-teal-600`} />
        </div>
      </div>
    </div>
  );
};

// Export the Loader component
export default Loader;