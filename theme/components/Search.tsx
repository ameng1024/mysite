import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFullTextSearch } from '@rspress/core/theme-original';
import type { DefaultMatchResultItem } from '@rspress/core/theme-original';
import { labels } from '@theme/constants/labels';
import { url } from '@theme/utils/url-utils';

interface SearchResult {
  url: string;
  meta: { title: string };
  excerpt: string;
}

function flattenSearchResults(
  groups: Awaited<ReturnType<NonNullable<ReturnType<typeof useFullTextSearch>['search']>>>,
): SearchResult[] {
  const results: SearchResult[] = [];
  for (const group of groups) {
    if (group.renderType !== 'default') continue;
    for (const item of group.result as DefaultMatchResultItem[]) {
      results.push({
        url: item.link,
        meta: { title: item.title || item.header },
        excerpt: 'content' === item.type ? item.statement : item.header,
      });
    }
  }
  return results;
}

export function Search() {
  const { initialized, search } = useFullTextSearch();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const desktopRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const doSearch = async (keyword: string, isDesktop: boolean) => {
    if (!keyword && isDesktop) {
      setPanelOpen(false);
      setResults([]);
      return;
    }

    let arr: SearchResult[] = [];

    if (initialized && search) {
      const ret = await search(keyword);
      arr = flattenSearchResults(ret);
    } else if (!import.meta.env.PROD) {
      arr = [
        {
          url: url('/'),
          meta: { title: 'This Is a Fake Search Result' },
          excerpt: 'Because the search cannot work in the <mark>dev</mark> environment.',
        },
      ];
    }

    if (!arr.length && isDesktop) {
      setPanelOpen(false);
      setResults([]);
      return;
    }

    if (isDesktop) setPanelOpen(true);
    setResults(arr);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const panel = document.getElementById('search-panel');
      const searchBar = document.getElementById('search-bar');
      const searchSwitch = document.getElementById('search-switch');
      if (
        panel &&
        !panel.contains(target) &&
        !searchBar?.contains(target) &&
        !searchSwitch?.contains(target)
      ) {
        panel.classList.add('float-panel-closed');
        setPanelOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInput = (value: string, isDesktop: boolean) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(value, isDesktop), 200);
  };

  return (
    <>
      <div
        id="search-bar"
        className="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
      >
        <Icon
          icon="material-symbols:search"
          className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
        />
        <input
          ref={desktopRef}
          placeholder={labels.search}
          id="search-input-desktop"
          className="transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
          onInput={e => handleInput(e.currentTarget.value, true)}
          onFocus={() => {
            if (desktopRef.current?.value) doSearch(desktopRef.current.value, true);
          }}
        />
      </div>

      <button
        aria-label="Search Panel"
        id="search-switch"
        type="button"
        className="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
        onClick={() => {
          document.getElementById('search-panel')?.classList.toggle('float-panel-closed');
        }}
      >
        <Icon icon="material-symbols:search" className="text-[1.25rem]" />
      </button>

      <div
        id="search-panel"
        className={`float-panel ${panelOpen ? '' : 'float-panel-closed'} search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2`}
      >
        <div
          id="search-bar-inside"
          className="flex relative lg:hidden transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
        >
          <Icon
            icon="material-symbols:search"
            className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
          />
          <input
            ref={mobileRef}
            placeholder={labels.search}
            id="search-input-mobile"
            className="pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50"
            onInput={e => handleInput(e.currentTarget.value, false)}
          />
        </div>

        <div id="search-results">
          {results.map(item => (
            <a
              key={item.url}
              href={item.url}
              className="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
            >
              <div className="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
                {item.meta.title}
                <Icon icon="fa6-solid:chevron-right" className="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]" />
              </div>
              <div
                className="transition text-sm text-50"
                dangerouslySetInnerHTML={{ __html: item.excerpt }}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
