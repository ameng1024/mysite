import { Icon } from '@iconify/react';
import { url } from '@theme/utils/url-utils';

interface Props {
  currentPage: number;
  totalPages: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Pagination({ currentPage, totalPages, className = '', style }: Props) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => (page === 1 ? url('/') : url(`/${page}/`));

  return (
    <div className={`flex items-center justify-center gap-2 mx-auto onload-animation ${className}`} style={style}>
      {currentPage > 1 && (
        <a href={getPageUrl(currentPage - 1)} className="btn-regular rounded-lg h-10 w-10 active:scale-90">
          <Icon icon="material-symbols:chevron-left-rounded" className="text-2xl" />
        </a>
      )}
      <span className="text-50 text-sm font-medium px-2">
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <a href={getPageUrl(currentPage + 1)} className="btn-regular rounded-lg h-10 w-10 active:scale-90">
          <Icon icon="material-symbols:chevron-right-rounded" className="text-2xl" />
        </a>
      )}
    </div>
  );
}
