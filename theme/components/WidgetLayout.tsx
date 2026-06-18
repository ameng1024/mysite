import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { labels } from '@theme/constants/labels';

interface Props {
  name: string;
  id: string;
  isCollapsed?: boolean;
  collapsedHeight?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function WidgetLayout({
  name,
  id,
  isCollapsed = false,
  collapsedHeight = '7.5rem',
  className = '',
  style,
  children,
}: Props) {
  return (
    <div className={`card-base px-4 py-4 ${className}`} style={style}>
      <div className="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 relative ml-3 mb-2 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]">
        {name}
      </div>
      <div
        id={id}
        className={isCollapsed ? 'collapsed overflow-hidden' : 'overflow-hidden'}
        style={isCollapsed ? ({ '--collapsedHeight': collapsedHeight } as CSSProperties) : undefined}
      >
        {children}
      </div>
      {isCollapsed && (
        <button
          type="button"
          className="btn-plain w-full h-7 rounded-lg mt-2 text-sm font-medium text-[var(--primary)]"
          onClick={e => {
            const parent = (e.target as HTMLElement).closest('.card-base');
            const content = parent?.querySelector(`#${id}`);
            content?.classList.toggle('collapsed');
          }}
        >
          <span className="flex items-center justify-center gap-1">
            {labels.more}
            <Icon icon="material-symbols:expand-more-rounded" />
          </span>
        </button>
      )}
    </div>
  );
}
