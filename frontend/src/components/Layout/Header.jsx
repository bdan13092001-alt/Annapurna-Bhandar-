'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuth, clearAuth, hasRole } from '@/lib/auth';
import { t, setLanguage, getLanguage } from '@/lib/i18n';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const currentLang = getLanguage();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    window.location.reload();
  };

  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          {t('common.appName')}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {auth.token ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-200">
                {t('common.dashboard')}
              </Link>
              {hasRole('admin') && (
                <Link href="/admin" className="hover:text-gray-200">
                  Admin
                </Link>
              )}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <Globe size={20} />
                {currentLang === 'en' ? 'বাংলা' : 'English'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                <LogOut size={20} />
                {t('common.logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200">
                {t('auth.login')}
              </Link>
              <Link href="/register" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100">
                {t('auth.register')}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <Globe size={20} />
                {currentLang === 'en' ? 'বাংলা' : 'English'}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary px-4 py-4 space-y-2">
          {auth.token ? (
            <>
              <Link href="/dashboard" className="block py-2 hover:text-gray-200">
                {t('common.dashboard')}
              </Link>
              {hasRole('admin') && (
                <Link href="/admin" className="block py-2 hover:text-gray-200">
                  Admin
                </Link>
              )}
              <button
                onClick={toggleLanguage}
                className="block w-full text-left py-2 hover:text-gray-200"
              >
                {currentLang === 'en' ? 'বাংলা' : 'English'}
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 hover:text-gray-200"
              >
                {t('common.logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2 hover:text-gray-200">
                {t('auth.login')}
              </Link>
              <Link href="/register" className="block py-2 hover:text-gray-200">
                {t('auth.register')}
              </Link>
              <button
                onClick={toggleLanguage}
                className="block w-full text-left py-2 hover:text-gray-200"
              >
                {currentLang === 'en' ? 'বাংলা' : 'English'}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
