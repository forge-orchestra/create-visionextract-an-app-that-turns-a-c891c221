import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UploadFormProps {
  onUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      onUpload(file);
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
        <Upload className="w-8 h-8 text-gray-500" aria-hidden="true" />
        <span className="mt-2 text-sm text-gray-600">Upload Screenshot</span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="File upload"
        />
      </label>
      <button
        type="submit"
        disabled={!file}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Extract Data
      </button>
    </form>
  );
};

export default UploadForm;