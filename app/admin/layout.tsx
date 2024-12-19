'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 这里可以根据实际需求实现更复杂的鉴权逻辑
const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated() && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  return <div className="admin-layout">{children}</div>;
}
