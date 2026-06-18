import { Icon } from '@iconify/react';
import { estimateReadingTime } from '@theme/utils/reading-utils';
import { labels } from '@theme/constants/labels';
import type { BlogPost } from '../hooks/useBlogData';
import { PostMeta } from './PostMeta';
import { ImageWrapper } from './ImageWrapper';

interface Props {
  post: BlogPost;
  style?: React.CSSProperties;
}

export function PostCard({ post, style }: Props) {
  const { frontmatter, routePath } = post;
  const hasCover = !!frontmatter.image;
  const coverWidth = '28%';
  const stats = estimateReadingTime(frontmatter.description || frontmatter.title);

  return (
    <>
      <div
        className="card-base flex flex-col-reverse md:flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative onload-animation"
        style={{ ...style, '--coverWidth': coverWidth } as React.CSSProperties}
      >
        <div
          className={`pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative ${
            hasCover
              ? 'w-full md:w-[calc(100%_-_var(--coverWidth)_-_12px)]'
              : 'w-full md:w-[calc(100%_-_52px_-_12px)]'
          }`}
        >
          <a
            href={routePath}
            className="transition group w-full block font-bold mb-3 text-3xl text-90 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] active:text-[var(--title-active)] dark:active:text-[var(--title-active)] before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block"
          >
            {frontmatter.title}
            <Icon
              icon="material-symbols:chevron-right-rounded"
              className="inline text-[2rem] text-[var(--primary)] md:hidden translate-y-0.5 absolute"
            />
            <Icon
              icon="material-symbols:chevron-right-rounded"
              className="text-[var(--primary)] text-[2rem] transition hidden md:inline absolute translate-y-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
            />
          </a>

          <PostMeta
            published={new Date(frontmatter.published)}
            updated={frontmatter.updated ? new Date(frontmatter.updated) : undefined}
            tags={frontmatter.tags || []}
            category={frontmatter.category || ''}
            hideTagsForMobile
            hideUpdateDate
            className="mb-4"
          />

          <div className={`transition text-75 mb-3.5 pr-4 ${!frontmatter.description ? 'line-clamp-2 md:line-clamp-1' : ''}`}>
            {frontmatter.description}
          </div>

          <div className="text-sm text-black/30 dark:text-white/30 flex gap-4 transition">
            <div>{stats.words} {labels.wordsCount}</div>
            <div>|</div>
            <div>{stats.minutes} {labels.minutesCount}</div>
          </div>
        </div>

        {hasCover ? (
          <a
            href={routePath}
            aria-label={frontmatter.title}
            className="group max-h-[20vh] md:max-h-none mx-4 mt-4 -mb-2 md:mb-0 md:mx-0 md:mt-0 md:w-[var(--coverWidth)] relative md:absolute md:top-3 md:bottom-3 md:right-3 rounded-xl overflow-hidden active:scale-95"
          >
            <div className="absolute pointer-events-none z-10 w-full h-full group-hover:bg-black/30 group-active:bg-black/50 transition" />
            <div className="absolute pointer-events-none z-20 w-full h-full flex items-center justify-center">
              <Icon
                icon="material-symbols:chevron-right-rounded"
                className="transition opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 text-white text-5xl"
              />
            </div>
            <ImageWrapper
              src={frontmatter.image!}
              alt="Cover Image of the Post"
              className="w-full h-full"
            />
          </a>
        ) : (
          <a
            href={routePath}
            aria-label={frontmatter.title}
            className="!hidden md:!flex btn-regular w-[3.25rem] absolute right-3 top-3 bottom-3 rounded-xl bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95"
          >
            <Icon
              icon="material-symbols:chevron-right-rounded"
              className="transition text-[var(--primary)] text-4xl mx-auto"
            />
          </a>
        )}
      </div>
      <div className="transition border-t-[1px] border-dashed mx-6 border-black/10 dark:border-white/[0.15] last:border-t-0 md:hidden" />
    </>
  );
}
