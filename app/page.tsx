'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Articles } from '@/types';
const Home: React.FC = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('2024');

  useEffect(() => {
    const list: Articles[] = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        title: `文章标题${i}`,
        content: `文章内容${i}`,
      });
    }
    fetch(`/api/posts?tag=${tag}&date=${date}`, {
      method: 'GET', // 显式指定 GET 请求
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 打印响应数据
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setArticles(list);
  }, []);

  return (
    <>
      <div className={styles.swiper}></div>
      <div className={styles.container}>
        <div className={styles.articlesList}>
          {articles.map((article, index) => (
            <div key={index} className={`${styles.articleItem} box-shadow`}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
        <div className={styles.infoContainer}></div>
      </div>
    </>
  );
};

export default Home;
