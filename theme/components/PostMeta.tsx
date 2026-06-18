import { Icon } from '@iconify/react';
import { formatDateToYYYYMMDD } from '@theme/utils/date-utils';
import { labels } from '@theme/constants/labels';
import { url } from '@theme/utils/url-utils';

interface Props {
  published: Date;
  updated?: Date;
  tags: string[];
  category: string;
  hideTagsForMobile?: boolean;
  hideUpdateDate?: boolean;
  className?: string;
}

export function PostMeta({
  published,
  updated,
  tags,
  category,
  hideTagsForMobile = false,
  hideUpdateDate = false,
  className = '',
}: Props) {
  return (
    <div className={`flex flex-wrap text-neutral-500 dark:text-neutral-400 items-center gap-4 gap-x-4 gap-y-2 max-w-full min-w-0 ${className}`}>
      <div className="flex items-center">
        <div className="meta-icon">
          <Icon icon="material-symbols:calendar-today-outline-rounded" className="text-xl" />
        </div>
        <span className="text-50 text-sm font-medium">{formatDateToYYYYMMDD(published)}</span>
      </div>

      {!hideUpdateDate && updated && updated.getTime() !== published.getTime() && (
        <div className="flex items-center">
          <div className="meta-icon">
            <Icon icon="material-symbols:edit-calendar-outline-rounded" className="text-xl" />
          </div>
          <span className="text-50 text-sm font-medium">{formatDateToYYYYMMDD(updated)}</span>
        </div>
      )}

      <div className="flex items-start min-w-0 max-w-full">
        <div className="meta-icon shrink-0">
          <Icon icon="material-symbols:book-2-outline-rounded" className="text-xl" />
        </div>
        <div className="flex flex-row flex-wrap items-center min-w-0">
          <a
            href={url(`/archive/category/${encodeURIComponent(category || 'uncategorized')}/`)}
            aria-label={`View all posts in the ${category} category`}
            className="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] break-words"
          >
            {category || labels.uncategorized}
          </a>
        </div>
      </div>

      <div className={`items-start min-w-0 max-w-full ${hideTagsForMobile ? 'hidden md:flex' : 'flex'}`}>
        <div className="meta-icon shrink-0">
          <Icon icon="material-symbols:tag-rounded" className="text-xl" />
        </div>
        <div className="flex flex-row flex-wrap items-center min-w-0 flex-1 gap-y-0.5">
          {tags.length > 0 ? (
            tags.map((tag, i) => (
              <span key={tag} className="inline-flex items-center max-w-full">
                {i > 0 && <span className="mx-1.5 text-[var(--meta-divider)] text-sm shrink-0">/</span>}
                <a
                  href={url(`/archive/tag/${encodeURIComponent(tag)}/`)}
                  aria-label={`View all posts with the ${tag} tag`}
                  className="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] break-words"
                >
                  {tag}
                </a>
              </span>
            ))
          ) : (
            <div className="transition text-50 text-sm font-medium">{labels.noTags}</div>
          )}
        </div>
      </div>
    </div>
  );
}
