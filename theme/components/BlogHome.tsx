import { useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE } from '@theme/constants/constants';
import { useBlogPosts } from '../hooks/useBlogData';
import { PostCard } from './PostCard';
import { Pagination } from './Pagination';

export function BlogHome() {
  const posts = useBlogPosts();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const match = window.location.pathname.match(/^\/(\d+)\/?$/);
    setCurrentPage(match ? Number.parseInt(match[1]) : 1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pagePosts = useMemo(
    () => posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [posts, currentPage],
  );

  return (
    <>
      <div className="transition flex flex-col rounded-[var(--radius-large)] bg-[var(--card-bg)] py-1 md:py-0 md:bg-transparent md:gap-4 mb-4">
        {pagePosts.map((post, i) => (
          <PostCard
            key={post.slug}
            post={post}
            style={{ animationDelay: `calc(var(--content-delay) + ${i * 50}ms)` }}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
