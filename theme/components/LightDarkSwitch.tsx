import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  AUTO_MODE,
  DARK_MODE,
  LIGHT_MODE,
  DEFAULT_THEME,
} from '@theme/constants/constants';
import { labels } from '@theme/constants/labels';
import type { LIGHT_DARK_MODE } from '@theme/types/config';
import {
  applyThemeToDocument,
  getStoredTheme,
  setTheme,
} from '@theme/utils/setting-utils';

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, AUTO_MODE];

export function LightDarkSwitch() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<LIGHT_DARK_MODE>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    modeRef.current = getStoredTheme();
    setMounted(true);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const panel = wrapper.querySelector('#light-dark-panel');
    const switchBtn = wrapper.querySelector('#scheme-switch');
    const schemeButtons = wrapper.querySelectorAll('.scheme-btn');

    const updateUI = () => {
      const mode = modeRef.current;
      wrapper.querySelector('#scheme-icon-light')?.classList.toggle('opacity-0', mode !== LIGHT_MODE);
      wrapper.querySelector('#scheme-icon-dark')?.classList.toggle('opacity-0', mode !== DARK_MODE);
      wrapper.querySelector('#scheme-icon-auto')?.classList.toggle('opacity-0', mode !== AUTO_MODE);
      schemeButtons.forEach(btn => {
        const scheme = (btn as HTMLElement).dataset.scheme;
        btn.classList.toggle('current-theme-btn', scheme === mode);
      });
    };

    const switchScheme = (newMode: LIGHT_DARK_MODE) => {
      modeRef.current = newMode;
      setTheme(newMode);
      updateUI();
    };

    const toggleScheme = () => {
      const i = seq.indexOf(modeRef.current);
      switchScheme(seq[(i + 1) % seq.length]);
    };

    const showPanel = () => panel?.classList.remove('float-panel-closed');
    const hidePanel = () => panel?.classList.add('float-panel-closed');

    updateUI();

    switchBtn?.addEventListener('click', toggleScheme);
    switchBtn?.addEventListener('mouseenter', showPanel);
    wrapper.addEventListener('mouseleave', hidePanel);

    schemeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const scheme = (btn as HTMLElement).dataset.scheme as LIGHT_DARK_MODE;
        switchScheme(scheme);
      });
    });

    const onSchemeChange = () => applyThemeToDocument(modeRef.current);
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
    darkModePreference.addEventListener('change', onSchemeChange);

    return () => {
      switchBtn?.removeEventListener('click', toggleScheme);
      switchBtn?.removeEventListener('mouseenter', showPanel);
      wrapper.removeEventListener('mouseleave', hidePanel);
      darkModePreference.removeEventListener('change', onSchemeChange);
    };
  }, []);

  return (
    <div id="light-dark-wrapper" ref={wrapperRef} className="relative z-50" role="menu" tabIndex={-1}>
      <button
        aria-label="Light/Dark Mode"
        role="menuitem"
        className="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
        id="scheme-switch"
        type="button"
      >
        <div className="absolute" id="scheme-icon-light">
          <Icon icon="material-symbols:wb-sunny-outline-rounded" className="text-[1.25rem]" />
        </div>
        <div className="absolute" id="scheme-icon-dark">
          <Icon icon="material-symbols:dark-mode-outline-rounded" className="text-[1.25rem]" />
        </div>
        <div className="absolute" id="scheme-icon-auto">
          <Icon icon="material-symbols:radio-button-partial-outline" className="text-[1.25rem]" />
        </div>
      </button>

      <div id="light-dark-panel" className="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5">
        <div className="card-base float-panel p-2">
          {[
            { mode: LIGHT_MODE, icon: 'material-symbols:wb-sunny-outline-rounded', label: labels.lightMode },
            { mode: DARK_MODE, icon: 'material-symbols:dark-mode-outline-rounded', label: labels.darkMode },
            { mode: AUTO_MODE, icon: 'material-symbols:radio-button-partial-outline', label: labels.systemMode },
          ].map(({ mode, icon, label }, i) => (
            <button
              key={mode}
              data-scheme={mode}
              type="button"
              className={`scheme-btn flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 ${i < 2 ? 'mb-0.5' : ''}`}
            >
              <Icon icon={icon} className="text-[1.25rem] mr-3" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
