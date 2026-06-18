import type { ReactNode } from 'react';

interface Props {
  url: string;
  badge?: string;
  label: string;
  children: ReactNode;
}

export function ButtonLink({ url, badge, label, children }: Props) {
  return (
    <a
      href={url}
      aria-label={label}
      className="btn-plain flex items-center justify-between rounded-lg px-2.5 py-1.5 font-medium active:scale-95 mb-0.5 w-full"
    >
      <span className="text-75">{children}</span>
      {badge && (
        <span className="text-xs text-50 bg-[var(--btn-regular-bg)] rounded-md px-1.5 py-0.5 min-w-[1.5rem] text-center">
          {badge}
        </span>
      )}
    </a>
  );
}
