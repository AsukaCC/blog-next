'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';
import { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const routes = [
    { name: '首页', href: '/' },
    { name: '关于', href: '/about' },
  ];

  const targetRef = useRef<HTMLDivElement | null>(null); // 明确声明类型
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const scrollPosition = window.scrollY;
        setIsVisible(!(scrollPosition === 0));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filterRoutes = ['/admin']; // 定义需要隐藏 Navbar 的路径
  const pathname = usePathname(); // 获取当前路由路径

  // 判断当前路径是否需要隐藏 Navbar
  const shouldHideNavbar = filterRoutes.includes(pathname);

  // 如果路径在过滤列表中，不渲染 Navbar
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div ref={targetRef} className={`${styles.navbarContainer}`}>
        <div
          className={`${styles.content} ${
            isVisible ? styles.scroll : styles.top
          }`}>
          <ul className={styles.navLinks}>
            {routes.map((route) => (
              <li key={route.name}>
                <Link href={route.href}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
