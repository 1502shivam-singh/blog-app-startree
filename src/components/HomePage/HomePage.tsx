import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../types';
import posts from '../../data/data.json';
import styles from './homepage.module.css';

const HomePage: React.FC = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  revealRefs.current = [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const isIntersecting = entry.isIntersecting || entry.intersectionRatio > 0;

          if (isIntersecting) {
            el.style.transition = 'opacity 1s';
            el.style.opacity = '1';
          } else {
            el.style.transition = 'opacity 1s';
            el.style.opacity = '0';
          }
        }),
      {
        threshold: 0.1,
      }
    );

    revealRefs.current.forEach((el) => observer.observe(el));

    return function cleanup() {
      revealRefs.current.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles['header-text']}>Journey through time</h2>
      </header>
      {posts.map((post: Post, index) => (
        <div key={post.id} className={styles.post} ref={addToRefs} style={{ opacity: 0 }}>
          <div className={styles['post-content']}>
            <h1 className={styles['post-title']}>
              <Link href={`/${post.id}`}>
                <span className={styles['title-link']}>{post.title}</span>
              </Link>
            </h1>
            <p className={styles['post-excerpt']}>{post.content.substring(0, 180)}...</p>
          </div>
          <div className={styles['post-image']}>
            <Image width={350} height={350} src={post.image} alt="blog-image" />
          </div>
        </div>
      ))}
      <style jsx>{`
        .title-link:hover {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
