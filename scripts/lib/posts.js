import fs from 'node:fs';
import path from 'node:path';

export const postsDir = path.join(process.cwd(), 'docs/posts');

export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (raw === 'true') meta[key] = true;
    else if (raw === 'false') meta[key] = false;
    else meta[key] = raw.replace(/^['"]|['"]$/g, '');
  }
  return meta;
}

export function getPostFiles(dir, base = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.posix.join(base, entry.name);
    if (entry.isDirectory()) {
      results.push(...getPostFiles(path.join(dir, entry.name), rel));
    } else if (/\.mdx?$/.test(entry.name)) {
      results.push(rel);
    }
  }
  return results;
}

export function parsePublishedDate(value) {
  if (!value) return null;
  const normalized = String(value).trim().slice(0, 10);
  const date = new Date(`${normalized}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

export function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function loadPublishedPosts() {
  return getPostFiles(postsDir)
    .map(file => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const meta = parseFrontmatter(content);
      if (meta.draft === true) return null;

      const published = parsePublishedDate(meta.published);
      if (!published) return null;

      return {
        title: meta.title || file,
        description: meta.description || '',
        published: formatDateKey(published),
        category: meta.category || '',
        link: `/posts/${file.replace(/\.(md|mdx)$/, '')}`,
      };
    })
    .filter(Boolean);
}

export function countToLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

/** GitHub 风格：52 列（周）× 7 行（周日到周六） */
export function buildContributionWeeks(publishedDates) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endSunday = new Date(today);
  endSunday.setDate(endSunday.getDate() - endSunday.getDay());

  const startSunday = new Date(endSunday);
  startSunday.setDate(startSunday.getDate() - (52 - 1) * 7);

  const counts = {};
  for (const dateStr of publishedDates) {
    counts[dateStr] = (counts[dateStr] || 0) + 1;
  }

  const weeks = [];
  let totalInRange = 0;
  const cursor = new Date(startSunday);

  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateKey = formatDateKey(cursor);
      const count = cursor <= today ? counts[dateKey] || 0 : 0;
      if (count > 0 && cursor <= today) totalInRange += count;

      week.push({
        date: dateKey,
        count,
        level: countToLevel(count),
      });

      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks, totalInRange, startDate: formatDateKey(startSunday), endDate: formatDateKey(today) };
}
