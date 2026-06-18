import { useActiveAnchor, useDynamicToc } from '@rspress/core/theme-original';
import { siteConfig } from '@theme/config';

const removeTailingHash = (text: string) => {
  const lastIndexOfHash = text.lastIndexOf('#');
  if (lastIndexOfHash !== text.length - 1) return text;
  return text.substring(0, lastIndexOfHash);
};

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');

export function TOC() {
  const headers = useDynamicToc();
  const { activeAnchorId } = useActiveAnchor(headers);

  if (!headers.length) return null;

  let minDepth = 10;
  for (const heading of headers) {
    minDepth = Math.min(minDepth, heading.depth);
  }

  const maxLevel = siteConfig.toc.depth;
  const filtered = headers.filter(h => h.depth < minDepth + maxLevel);

  let heading1Count = 1;

  return (
    <nav className="group">
      {filtered.map(heading => {
        const text = stripHtml(removeTailingHash(heading.text));
        const isActive = activeAnchorId === heading.id;

        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`px-2 flex gap-2 relative transition w-full min-h-9 rounded-xl hover:bg-[var(--toc-btn-hover)] active:bg-[var(--toc-btn-active)] py-2 ${
              isActive ? 'bg-[var(--toc-btn-hover)]' : ''
            }`}
          >
            <div
              className={`transition w-5 h-5 shrink-0 rounded-lg text-xs flex items-center justify-center font-bold ${
                heading.depth === minDepth
                  ? 'bg-[var(--toc-badge-bg)] text-[var(--btn-content)]'
                  : heading.depth === minDepth + 1
                    ? 'ml-4'
                    : 'ml-8'
              }`}
            >
              {heading.depth === minDepth && heading1Count++}
              {heading.depth === minDepth + 1 && (
                <div className="transition w-2 h-2 rounded-[0.1875rem] bg-[var(--toc-badge-bg)]" />
              )}
              {heading.depth === minDepth + 2 && (
                <div className="transition w-1.5 h-1.5 rounded-sm bg-black/5 dark:bg-white/10" />
              )}
            </div>
            <div
              className={`transition text-sm ${
                heading.depth === minDepth || heading.depth === minDepth + 1
                  ? 'text-50'
                  : 'text-30'
              }`}
            >
              {text}
            </div>
          </a>
        );
      })}
      <div
        id="active-indicator"
        className="-z-10 absolute bg-[var(--toc-btn-hover)] left-0 right-0 rounded-xl transition-all group-hover:bg-transparent border-2 border-[var(--toc-btn-hover)] group-hover:border-[var(--toc-btn-active)] border-dashed hidden"
      />
    </nav>
  );
}
