import type { ReactNode, Ref } from 'react';
import { usePageData } from '@rspress/core/runtime';
import { Icon } from '@iconify/react';
import { estimateReadingTime } from '@theme/utils/reading-utils';
import { licenseConfig, profileConfig } from '@theme/config';
import { labels } from '@theme/constants/labels';
import { MARKDOWN_CONTENT_CLASS } from '@theme/constants/markdown';
import { formatDateToYYYYMMDD } from '@theme/utils/date-utils';
import { PostMeta } from './PostMeta';
import { ImageWrapper } from './ImageWrapper';
import { useBlogPosts } from '../hooks/useBlogData';

interface Props {
  children: ReactNode;
  docRef?: Ref<HTMLDivElement>;
}

export function ContentWrapper({ children, docRef }: Props) {
  const { page } = usePageData();
  const isPost = page.routePath.startsWith('/posts/') && page.routePath !== '/posts/';
  const isAbout = page.routePath === '/about/';

  if (isAbout) {
    return (
      <div className="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
        <div
          className={`card-base z-10 px-9 py-6 relative w-full ${MARKDOWN_CONTENT_CLASS} rspress-doc`}
          ref={docRef}
        >
          {children}
        </div>
      </div>
    );
  }

  if (!isPost) return <>{children}</>;

  const fm = page.frontmatter as {
    title: string;
    published: string;
    updated?: string;
    description?: string;
    image?: string;
    tags?: string[];
    category?: string;
  };

  const posts = useBlogPosts();
  const currentIndex = posts.findIndex(p => p.routePath === page.routePath);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const stats = estimateReadingTime(page.content || fm.description || fm.title);

  return (
    <>
      <div className="flex w-full rounded-[var(--radius-large)] overflow-hidden relative mb-4">
        <div id="post-container" className="card-base z-10 px-6 md:px-9 pt-6 pb-4 relative w-full">
          <div className="flex flex-row text-black/30 dark:text-white/30 gap-5 mb-3 transition onload-animation">
            <div className="flex flex-row items-center">
              <div className="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2">
                <Icon icon="material-symbols:notes-rounded" />
              </div>
              <div className="text-sm">{stats.words} {labels.wordsCount}</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="transition h-6 w-6 rounded-md bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 flex items-center justify-center mr-2">
                <Icon icon="material-symbols:schedule-outline-rounded" />
              </div>
              <div className="text-sm">{stats.minutes} {labels.minutesCount}</div>
            </div>
          </div>

          <div className="relative onload-animation">
            <div className="transition w-full block font-bold mb-3 text-3xl md:text-[2.25rem]/[2.75rem] text-black/90 dark:text-white/90 md:before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] before:absolute before:top-[0.75rem] before:left-[-1.125rem]">
              {fm.title}
            </div>
          </div>

          <div className="onload-animation">
            <PostMeta
              className="mb-5"
              published={new Date(fm.published)}
              updated={fm.updated ? new Date(fm.updated) : undefined}
              tags={fm.tags || []}
              category={fm.category || ''}
            />
            {!fm.image && <div className="border-[var(--line-divider)] border-dashed border-b-[1px] mb-5" />}
          </div>

          {fm.image && (
            <ImageWrapper
              id="post-cover"
              src={fm.image}
              className="mb-8 rounded-xl banner-container onload-animation w-full"
            />
          )}

          <div className={`mb-6 ${MARKDOWN_CONTENT_CLASS} rspress-doc`} ref={docRef}>
            {children}
          </div>

          {licenseConfig.enable && (
            <div className="mb-6 rounded-xl license-container onload-animation p-4 bg-[var(--license-block-bg)] text-sm text-50">
              <div className="font-bold mb-1">{labels.license}</div>
              <a
                href={licenseConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[var(--primary)]"
              >
                {licenseConfig.name}
              </a>
              {' '}&copy; {formatDateToYYYYMMDD(new Date(fm.published))} {profileConfig.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full">
        <a
          href={nextPost?.routePath || '#'}
          className={`w-full font-bold overflow-hidden active:scale-95 ${!nextPost ? 'pointer-events-none' : ''}`}
        >
          {nextPost && (
            <div className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-start gap-4">
              <Icon icon="material-symbols:chevron-left-rounded" className="text-[2rem] text-[var(--primary)]" />
              <div className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75">
                {nextPost.frontmatter.title}
              </div>
            </div>
          )}
        </a>

        <a
          href={prevPost?.routePath || '#'}
          className={`w-full font-bold overflow-hidden active:scale-95 ${!prevPost ? 'pointer-events-none' : ''}`}
        >
          {prevPost && (
            <div className="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-end gap-4">
              <div className="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75">
                {prevPost.frontmatter.title}
              </div>
              <Icon icon="material-symbols:chevron-right-rounded" className="text-[2rem] text-[var(--primary)]" />
            </div>
          )}
        </a>
      </div>
    </>
  );
}
