import { useState } from 'react';
import { Icon } from '@iconify/react';
import { siteConfig } from '@theme/config';
import { navBarConfig } from '@theme/config';
import { LinkPresets } from '@theme/constants/link-presets';
import type { NavBarLink } from '@theme/types/config';
import { LinkPreset } from '@theme/types/config';
import { url } from '@theme/utils/url-utils';
import { Search } from './Search';
import { LightDarkSwitch } from './LightDarkSwitch';
import { DisplaySettings } from './DisplaySettings';
import { NavMenuPanel } from './NavMenuPanel';

export function Navbar() {
  const links: NavBarLink[] = navBarConfig.links.map((item: NavBarLink | LinkPreset) => {
    if (typeof item === 'number') return LinkPresets[item];
    return item;
  });

  return (
    <div id="navbar" className="z-50 onload-animation">
      <div className="absolute h-8 left-0 right-0 -top-8 bg-[var(--card-bg)] transition" />
      <div className="card-base !overflow-visible max-w-[var(--page-width)] h-[4.5rem] !rounded-t-none mx-auto flex items-center justify-between px-4">
        <a
          href={url('/')}
          className="btn-plain scale-animation rounded-lg h-[3.25rem] px-5 font-bold active:scale-95"
        >
          <div className="flex flex-row text-[var(--primary)] items-center text-md">
            <Icon icon="material-symbols:home-outline-rounded" className="text-[1.75rem] mb-1 mr-2" />
            {siteConfig.title}
          </div>
        </a>

        <div className="hidden md:flex">
          {links.map(l => (
            <a
              key={l.name}
              aria-label={l.name}
              href={l.external ? l.url : url(l.url)}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95"
            >
              <div className="flex items-center">
                {l.name}
                {l.external && (
                  <Icon
                    icon="fa6-solid:arrow-up-right-from-square"
                    className="text-[0.875rem] transition -translate-y-[1px] ml-1 text-black/[0.2] dark:text-white/[0.2]"
                  />
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="flex">
          <Search />
          {!siteConfig.themeColor.fixed && (
            <DisplaySettingsButton />
          )}
          <LightDarkSwitch />
          <NavMenuButton links={links} />
        </div>

        <NavMenuPanel links={links} />
        <DisplaySettings />
      </div>
    </div>
  );
}

function DisplaySettingsButton() {
  return (
    <button
      aria-label="Display Settings"
      className="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
      id="display-settings-switch"
      type="button"
      onClick={() => {
        document.getElementById('display-setting')?.classList.toggle('float-panel-closed');
      }}
    >
      <Icon icon="material-symbols:palette-outline" className="text-[1.25rem]" />
    </button>
  );
}

function NavMenuButton({ links }: { links: NavBarLink[] }) {
  return (
    <button
      aria-label="Menu"
      name="Nav Menu"
      className="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90 md:!hidden"
      id="nav-menu-switch"
      type="button"
      onClick={() => {
        document.getElementById('nav-menu-panel')?.classList.toggle('float-panel-closed');
      }}
    >
      <Icon icon="material-symbols:menu-rounded" className="text-[1.25rem]" />
    </button>
  );
}
