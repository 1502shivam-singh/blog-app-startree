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
    import('gsap').then(({ gsap }) => {
      import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        revealRefs.current.forEach((el, index) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            {
              duration: 1,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                markers: true,
                id: `section-${index + 1}`,
                trigger: el,
                start: 'top center+=50',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    });
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
        <div key={post.id} className={styles.post} ref={addToRefs}>
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
