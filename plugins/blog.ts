import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

const PAGE_SIZE = 8;

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string | string[] | boolean> = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (raw === 'true') fm[key] = true;
    else if (raw === 'false') fm[key] = false;
    else if (raw.startsWith('[')) {
      fm[key] = raw
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      fm[key] = raw.replace(/^['"]|['"]$/g, '');
    }
  }
  return fm;
}

function getPostFiles(dir: string, base = ''): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results.push(...getPostFiles(path.join(dir, entry.name), rel));
    } else if (/\.mdx?$/.test(entry.name) && entry.name !== 'draft.md') {
      results.push(rel);
    }
  }
  return results;
}

export function blogPlugin(): RspressPlugin {
  return {
    name: 'blog-plugin',
    addPages() {
      const postsDir = path.join(process.cwd(), 'docs/posts');
      const files = getPostFiles(postsDir);
      const pages: { routePath: string; filepath: string; content: string }[] = [];

      const categories = new Set<string>();
      const tags = new Set<string>();
      let postCount = 0;

      for (const file of files) {
        const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
        const fm = parseFrontmatter(content);
        if (fm.draft === true) continue;
        postCount++;

        if (fm.category && typeof fm.category === 'string') {
          categories.add(fm.category);
        }
        if (Array.isArray(fm.tags)) {
          for (const tag of fm.tags) tags.add(tag);
        }
      }

      const totalPages = Math.max(1, Math.ceil(postCount / PAGE_SIZE));
      for (let page = 2; page <= totalPages; page++) {
        pages.push({
          routePath: `/${page}/`,
          filepath: 'docs/index.mdx',
          content: fs.readFileSync(path.join(process.cwd(), 'docs/index.mdx'), 'utf-8'),
        });
      }

      for (const category of categories) {
        pages.push({
          routePath: `/archive/category/${encodeURIComponent(category)}/`,
          filepath: 'theme/pages/ArchiveFilter.tsx',
          content: '',
        });
      }

      pages.push({
        routePath: '/archive/category/uncategorized/',
        filepath: 'theme/pages/ArchiveFilter.tsx',
        content: '',
      });

      for (const tag of tags) {
        pages.push({
          routePath: `/archive/tag/${encodeURIComponent(tag)}/`,
          filepath: 'theme/pages/ArchiveFilter.tsx',
          content: '',
        });
      }

      return pages;
    },
  };
}
