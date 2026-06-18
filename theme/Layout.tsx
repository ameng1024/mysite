import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import {
  DocContent,
  useScrollReset,
  useWatchToc,
} from '@rspress/core/theme-original';
import { usePageData } from '@rspress/core/runtime';
import { siteConfig } from '@theme/config';
import {
  BANNER_HEIGHT,
  MAIN_PANEL_OVERLAPS_BANNER_HEIGHT,
} from '@theme/constants/constants';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { TOC } from './components/TOC';
import { Banner } from './components/Banner';
import { ConfigCarrier } from './components/ConfigCarrier';
import { ContentWrapper } from './components/ContentWrapper';
import { useSiteInit } from './hooks/useSiteInit';

export function Layout(_props: PropsWithChildren) {
  const { page } = usePageData();
  const isHomePage = page.routePath === '/' || /^\/\d+\/?$/.test(page.routePath);
  const enableBanner = siteConfig.banner.enable;
  const mainPanelTop = enableBanner
    ? `calc(${BANNER_HEIGHT}vh - ${MAIN_PANEL_OVERLAPS_BANNER_HEIGHT}rem)`
    : '5.5rem';

  const { rspressDocRef } = useWatchToc();

  useSiteInit();
  useScrollReset();

  useEffect(() => {
    document.body.classList.toggle('is-home', isHomePage);
    document.body.classList.toggle('lg:is-home', isHomePage);
    document.body.classList.toggle('enable-banner', enableBanner);
  }, [isHomePage, enableBanner]);

  return (
    <>
      <ConfigCarrier />
      <div
        id="top-row"
        className="z-50 pointer-events-none relative transition-all duration-700 max-w-[var(--page-width)] px-0 md:px-4 mx-auto"
      >
        <div id="navbar-wrapper" className="pointer-events-auto sticky top-0 transition-all">
          <Navbar />
        </div>
      </div>

      {enableBanner && <Banner />}

      <div
        className="absolute w-full z-30 pointer-events-none"
        style={{ top: mainPanelTop }}
      >
        <div className="relative max-w-[var(--page-width)] mx-auto pointer-events-auto">
          <div
            id="main-grid"
            className="transition duration-700 w-full left-0 right-0 grid grid-cols-[17.5rem_auto] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto] mx-auto gap-4 px-0 md:px-4"
          >
            <SideBar />

            <main id="swup-container" className="transition-swup-fade col-span-2 lg:col-span-1 overflow-hidden">
              <div id="content-wrapper" className="onload-animation">
                <ContentWrapper docRef={rspressDocRef}>
                  <DocContent />
                </ContentWrapper>
                <div className="footer col-span-2 onload-animation hidden lg:block">
                  <Footer />
                </div>
              </div>
            </main>

            <div className="footer col-span-2 onload-animation block lg:hidden">
              <Footer />
            </div>
          </div>

          <BackToTop />
        </div>
      </div>

      <div className="absolute w-full z-0 hidden 2xl:block">
        <div className="relative max-w-[var(--page-width)] mx-auto">
          {siteConfig.toc.enable ? (
            <div
              id="toc-wrapper"
              className={`hidden lg:block transition absolute top-0 -right-[var(--toc-width)] w-[var(--toc-width)] flex items-center ${enableBanner ? 'toc-hide' : ''}`}
            >
              <div
                id="toc-inner-wrapper"
                className="fixed top-14 w-[var(--toc-width)] h-[calc(100vh_-_20rem)] overflow-y-scroll overflow-x-hidden hide-scrollbar"
              >
                <div id="toc" className="w-full h-full transition-swup-fade">
                  <div className="h-8 w-full" />
                  <TOC />
                  <div className="h-8 w-full" />
                </div>
              </div>
            </div>
          ) : (
            <div id="toc" />
          )}
        </div>
      </div>

      <div id="page-height-extend" className="hidden h-[300vh]" />
    </>
  );
}
