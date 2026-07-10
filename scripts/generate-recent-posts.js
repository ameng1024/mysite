import fs from 'node:fs';
import path from 'node:path';
import { loadPublishedPosts } from './lib/posts.js';

const outputPath = path.join(process.cwd(), 'theme/data/recent-posts.json');

const posts = loadPublishedPosts()
  .sort((a, b) => String(b.published).localeCompare(String(a.published)))
  .slice(0, 5);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Generated ${posts.length} recent posts -> theme/data/recent-posts.json`);
