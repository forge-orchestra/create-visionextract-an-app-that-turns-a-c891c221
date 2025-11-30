import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-gray-800 mt-4" role="alert">
          An Error Occurred
        </h2>
        <p className="text-gray-600 mt-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Retry"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;