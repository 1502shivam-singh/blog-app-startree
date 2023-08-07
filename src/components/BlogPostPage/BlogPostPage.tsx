import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Post } from '../../types';
import posts from '../../data/data.json';
import styles from './blogpostpage.module.css';
import { gsap } from 'gsap';

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((post: Post) => post.id === id);

  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from([titleRef.current, imageRef.current, contentRef.current], {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.3,
      delay: 0.2,
      ease: 'power3.inOut',
    });
  }, []);

  return (
    <div style={{textAlign: "center"}}>
      <h2 className={styles.title} ref={titleRef}>{post?.title}</h2>
      <div ref={imageRef}>
        <Image className={styles.image} width={500} height={500} src={post?.image} alt="blog-image" />
      </div>
      <p className={styles.content} ref={contentRef}>{post?.content}</p>
    </div>
  );
};

export default BlogPostPage;
