'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';
import { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素不可见时更新状态
        setIsVisible(entry.isIntersecting);
        console.log('🚀 ~ entry.isIntersecting:', entry.isIntersecting);
      },
      {
        root: null, // 使用视口作为容器
        rootMargin: '0px', // 无额外边距
        threshold: 0, // 当元素完全不可见时触发
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const filterRoutes = ['/admin']; // 定义需要隐藏 Navbar 的路径
  const pathname = usePathname(); // 获取当前路由路径

  // 判断当前路径是否需要隐藏 Navbar
  const shouldHideNavbar = filterRoutes.includes(pathname);

  // 判断是否是根路径
  const isRootPath = pathname === '/';

  // 如果路径在过滤列表中，不渲染 Navbar
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav>
      <div ref={targetRef} className={`${styles.navbarContainer}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">首页</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
        </ul>
      </div>

      <div
        className={`${styles.navbarContainer} ${
          !isVisible ? styles.navbarFixed : styles.disVisible
        }`}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">首页</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
