'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { fetchData } from '@/lib/api'; // Assume this is a function to fetch data
import { DashboardData, UserStats } from '@/types'; // Assume these are the correct types

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashboardData, stats] = await Promise.all([
          fetchData('/api/dashboard'),
          fetchData('/api/user-stats')
        ]);
        setData(dashboardData);
        setUserStats(stats);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Extracted Data</h2>
          {data ? (
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <div>No data available</div>
          )}
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">User Statistics</h2>
          {userStats ? (
            <pre className="text-sm">{JSON.stringify(userStats, null, 2)}</pre>
          ) : (
            <div>No statistics available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;