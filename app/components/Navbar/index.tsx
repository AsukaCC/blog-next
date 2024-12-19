'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

const Navbar: React.FC = () => {
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
      <div className={styles.logo}>
        <Link href="/">My Blog</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">首页</Link>
        </li>
        <li>
          <Link href="/about">关于</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
