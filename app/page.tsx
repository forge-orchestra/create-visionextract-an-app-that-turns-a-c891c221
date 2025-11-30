'use client';

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Loader, AlertCircle } from 'lucide-react';
import 'tailwindcss/tailwind.css';

const Page: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AlertCircle className="text-red-500" size={48} />
        <span className="ml-2 text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">VisionExtract</h1>
          <p className="mt-2 text-lg text-gray-600">
            Transform screenshots into structured data effortlessly.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Real-time Data Extraction</h3>
              <p className="mt-2 text-gray-600">
                Extract data from screenshots in real-time using advanced algorithms.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">User Management</h3>
              <p className="mt-2 text-gray-600">
                Manage user accounts and permissions with ease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Dashboard</h3>
              <p className="mt-2 text-gray-600">
                View and manage all extracted data from a centralized dashboard.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white shadow mt-10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© 2023 VisionExtract. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;