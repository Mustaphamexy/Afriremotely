import React from 'react';
import { Logo } from '../UI/Details'

const LoaderSize = ({ size = 'medium' }) => {
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
          <Logo  className={`${logoSizes[size]} text-teal-600`} 
          />
            
        </div>
      </div>
    </div>
  );
};

// Demo component to show different sizes
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">African Loader Component</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        <div className="text-center">
          <Loader size="small" />
          <p className="mt-2 text-sm text-gray-600">Small</p>
        </div>
        
        <div className="text-center">
          <Loader size="medium" />
          <p className="mt-2 text-sm text-gray-600">Medium</p>
        </div>
        
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-2 text-sm text-gray-600">Large</p>
        </div>
        
        <div className="text-center">
          <Loader size="xlarge" />
          <p className="mt-2 text-sm text-gray-600">X-Large</p>
        </div>
      </div>

      {/* Usage Examples */}
      {/* <div className="mt-12 p-6 bg-white rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Usage Examples:</h2>
        <div className="space-y-2 text-sm">
          <code className="block bg-gray-100 p-2 rounded">{'<Loader size="small" />'}</code>
          <code className="block bg-gray-100 p-2 rounded">{'<Loader size="medium" />'}</code>
          <code className="block bg-gray-100 p-2 rounded">{'<Loader size="large" />'}</code>
          <code className="block bg-gray-100 p-2 rounded">{'<Loader size="xlarge" />'}</code>
        </div>
      </div>

      {/* Loading States Demo */}
      {/* <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Loading States Demo:</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Loader size="small" />
            <span>Loading user data...</span>
          </div>
          <div className="flex items-center space-x-3">
            <Loader size="medium" />
            <span>Processing job applications...</span>
          </div>
        </div>
      </div> */} 
    </div>
  );
};

export default LoadingSpinner;