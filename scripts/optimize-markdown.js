import fs from 'node:fs';
import path from 'node:path';

const postsDir = path.join(process.cwd(), 'docs/posts');

function getMarkdownFiles(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'guide') continue;
      results.push(...getMarkdownFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.md')) {
      results.push(rel);
    }
  }
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: '', body: content, meta: {} };

  const frontmatter = match[0];
  const body = content.slice(match[0].length);
  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return { frontmatter, body, meta };
}

function normalizeFrontmatter(frontmatter) {
  return frontmatter
    .replace(/^lang:\s*.+\n/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}

function removeDuplicateTitle(body) {
  const lines = body.split('\n');
  let index = 0;
  while (index < lines.length && lines[index].trim() === '') index++;

  const first = lines[index]?.trim() ?? '';
  const h1Match = first.match(/^#\s+(.+)$/);
  if (!h1Match) return body;

  index++;
  while (index < lines.length && lines[index].trim() === '') index++;
  return lines.slice(index).join('\n');
}

function normalizeAdmonitions(body) {
  return body
    .replace(/^:::important\b/gm, ':::info')
    .replace(/^:::github\{[^}]+\}\s*$/gm, '');
}

function normalizeCodeFenceLanguages(body) {
  return body.replace(/```([a-zA-Z0-9+#.-]*)\s*\n/g, (match, lang) => {
    const normalized = lang.trim().toLowerCase();
    if (!normalized) return '```\n';
    const aliases = {
      'js': 'javascript',
      'ts': 'typescript',
      'sh': 'bash',
      'shell': 'bash',
      'yml': 'yaml',
    };
    return `\`\`\`${aliases[normalized] || normalized}\n`;
  });
}

function optimizeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body, meta } = parseFrontmatter(raw);

  let nextBody = body;
  nextBody = removeDuplicateTitle(nextBody);
  nextBody = normalizeAdmonitions(nextBody);
  nextBody = normalizeCodeFenceLanguages(nextBody);
  nextBody = nextBody.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

  const nextFrontmatter = normalizeFrontmatter(frontmatter);
  const next = `${nextFrontmatter}\n${nextBody}`;

  if (next !== raw) {
    fs.writeFileSync(filePath, next);
    return true;
  }
  return false;
}

const files = getMarkdownFiles(postsDir);
let changed = 0;
for (const file of files) {
  const fullPath = path.join(postsDir, file);
  if (optimizeFile(fullPath)) {
    changed++;
    console.log(`optimized: ${file}`);
  }
}
console.log(`Done. Updated ${changed}/${files.length} files.`);
