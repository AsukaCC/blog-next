'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 这里可以添加实际的登录API调用
    if (formData.username === 'admin' && formData.password === 'admin') {
      // 模拟登录成功
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/admin');
    } else {
      setError('用户名或密码错误');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>后台管理登录</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="用户名"
            className={styles.input}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="密码"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.button}>
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
