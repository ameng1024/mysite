import type { ReactNode } from 'react';

interface Props {
  href: string;
  label: string;
  children: ReactNode;
}

export function ButtonTag({ href, label, children }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      className="btn-regular rounded-lg px-2 py-0.5 text-sm font-medium active:scale-95"
    >
      #{children}
    </a>
  );
}
