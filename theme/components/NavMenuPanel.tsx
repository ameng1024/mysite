import type { NavBarLink } from '@theme/types/config';
import { url } from '@theme/utils/url-utils';
import { Icon } from '@iconify/react';

interface Props {
  links: NavBarLink[];
}

export function NavMenuPanel({ links }: Props) {
  return (
    <div
      id="nav-menu-panel"
      className="float-panel float-panel-closed md:hidden absolute top-20 left-4 right-4 shadow-2xl rounded-2xl p-2"
    >
      {links.map(l => (
        <a
          key={l.name}
          aria-label={l.name}
          href={l.external ? l.url : url(l.url)}
          target={l.external ? '_blank' : undefined}
          rel={l.external ? 'noopener noreferrer' : undefined}
          className="transition flex items-center justify-between rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
        >
          <span>{l.name}</span>
          {l.external && (
            <Icon icon="fa6-solid:arrow-up-right-from-square" className="text-[0.875rem] text-black/[0.2] dark:text-white/[0.2]" />
          )}
        </a>
      ))}
    </div>
  );
}
