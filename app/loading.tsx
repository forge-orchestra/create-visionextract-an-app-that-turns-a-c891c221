import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="animate-spin text-blue-500" size={48} aria-hidden="true" />
        <span className="text-lg font-medium text-gray-700" role="status" aria-live="polite">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Loading;