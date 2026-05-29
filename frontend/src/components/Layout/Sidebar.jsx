'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import { getAuth, hasRole, clearAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const auth = getAuth();
  const isAdmin = hasRole('admin');

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const menuItems = isAdmin
    ? [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/applications', label: 'Applications', icon: FileText },
        { href: '/admin/districts', label: 'Districts', icon: BarChart3 },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
      ]
    : [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/apply', label: 'Apply for Benefit', icon: FileText },
        { href: '/dashboard/applications', label: 'My Applications', icon: BarChart3 },
        { href: '/dashboard/profile', label: 'Profile', icon: Users },
      ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
