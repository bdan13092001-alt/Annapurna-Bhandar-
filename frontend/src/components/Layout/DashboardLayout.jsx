'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from '@/lib/auth';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!auth.token) {
      router.push('/login');
    }
  }, [auth.token, router]);

  if (!auth.token) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-4 md:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
