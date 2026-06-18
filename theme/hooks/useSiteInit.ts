import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import { siteConfig } from '@theme/config';
import {
  BANNER_HEIGHT,
  BANNER_HEIGHT_EXTEND,
  BANNER_HEIGHT_HOME,
  MAIN_PANEL_OVERLAPS_BANNER_HEIGHT,
  DEFAULT_THEME,
  LIGHT_MODE,
  DARK_MODE,
  AUTO_MODE,
  PAGE_WIDTH,
} from '@theme/constants/constants';
import { getHue, getStoredTheme, setHue, setTheme } from '@theme/utils/setting-utils';

function setClickOutsideToClose(panel: string, ignores: string[]) {
  const handler = (event: MouseEvent) => {
    const panelDom = document.getElementById(panel);
    const tDom = event.target;
    if (!(tDom instanceof Node)) return;
    for (const ig of ignores) {
      const ie = document.getElementById(ig);
      if (ie === tDom || ie?.contains(tDom)) return;
    }
    panelDom?.classList.add('float-panel-closed');
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

function initCustomScrollbar() {
  const bodyElement = document.querySelector('body');
  if (!bodyElement) return;
  OverlayScrollbars(
    { target: bodyElement, cancel: { nativeScrollbarsOverlaid: true } },
    {
      scrollbars: {
        theme: 'scrollbar-base scrollbar-auto py-1',
        autoHide: 'move',
        autoHideDelay: 500,
        autoHideSuspend: false,
      },
    },
  );
  document.querySelectorAll('pre').forEach(ele => {
    if (ele.closest('.rp-codeblock')) return;
    OverlayScrollbars(ele, {
      scrollbars: {
        theme: 'scrollbar-base scrollbar-dark px-2',
        autoHide: 'leave',
        autoHideDelay: 500,
        autoHideSuspend: false,
      },
    });
  });
}

function showBanner() {
  const banner = document.getElementById('banner');
  banner?.classList.remove('opacity-0', 'scale-105');
}

function scrollFunction() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const toc = document.getElementById('toc-wrapper');
  const navbar = document.getElementById('navbar-wrapper');
  const bannerEnabled = !!document.getElementById('banner-wrapper');
  const bannerHeight = window.innerHeight * (BANNER_HEIGHT / 100);

  if (backToTopBtn) {
    if (document.body.scrollTop > bannerHeight || document.documentElement.scrollTop > bannerHeight) {
      backToTopBtn.classList.remove('hide');
    } else {
      backToTopBtn.classList.add('hide');
    }
  }

  if (bannerEnabled && toc) {
    if (document.body.scrollTop > bannerHeight || document.documentElement.scrollTop > bannerHeight) {
      toc.classList.remove('toc-hide');
    } else {
      toc.classList.add('toc-hide');
    }
  }

  if (!bannerEnabled || !navbar) return;

  const NAVBAR_HEIGHT = 72;
  const MAIN_PANEL_EXCESS_HEIGHT = MAIN_PANEL_OVERLAPS_BANNER_HEIGHT * 16;
  let bh = BANNER_HEIGHT;
  if (document.body.classList.contains('lg:is-home') && window.innerWidth >= 1024) {
    bh = BANNER_HEIGHT_HOME;
  }
  const threshold = window.innerHeight * (bh / 100) - NAVBAR_HEIGHT - MAIN_PANEL_EXCESS_HEIGHT - 16;
  if (document.body.scrollTop >= threshold || document.documentElement.scrollTop >= threshold) {
    navbar.classList.add('navbar-hidden');
  } else {
    navbar.classList.remove('navbar-hidden');
  }
}

export function useSiteInit() {
  useEffect(() => {
    const configHue = siteConfig.themeColor.hue;
    document.documentElement.style.setProperty('--page-width', `${PAGE_WIDTH}rem`);
    document.documentElement.style.setProperty('--banner-height-home', `${BANNER_HEIGHT_HOME}vh`);
    document.documentElement.style.setProperty('--banner-height', `${BANNER_HEIGHT}vh`);

    const theme = localStorage.getItem('theme') || DEFAULT_THEME;
    switch (theme) {
      case LIGHT_MODE:
        document.documentElement.classList.remove('dark');
        break;
      case DARK_MODE:
        document.documentElement.classList.add('dark');
        break;
      case AUTO_MODE:
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
    }

    const hue = localStorage.getItem('hue') || String(configHue);
    document.documentElement.style.setProperty('--hue', hue);

    let offset = Math.floor(window.innerHeight * (BANNER_HEIGHT_EXTEND / 100));
    offset = offset - (offset % 4);
    document.documentElement.style.setProperty('--banner-height-extend', `${offset}px`);

    setTheme(getStoredTheme());
    setHue(getHue());
    initCustomScrollbar();
    showBanner();

    const cleanups = [
      setClickOutsideToClose('display-setting', ['display-setting', 'display-settings-switch']),
      setClickOutsideToClose('nav-menu-panel', ['nav-menu-panel', 'nav-menu-switch']),
      setClickOutsideToClose('search-panel', ['search-panel', 'search-bar', 'search-switch']),
    ];

    window.onscroll = scrollFunction;
    window.onresize = () => {
      let off = Math.floor(window.innerHeight * (BANNER_HEIGHT_EXTEND / 100));
      off = off - (off % 4);
      document.documentElement.style.setProperty('--banner-height-extend', `${off}px`);
    };

    const hmScript = document.createElement('script');
    hmScript.src = 'https://hm.baidu.com/hm.js?9aa230c791da8854c768e68be53f9e7e';
    document.body.appendChild(hmScript);

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, []);
}
