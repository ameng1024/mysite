import fs from 'node:fs';
import path from 'node:path';
import {
  buildContributionWeeks,
  loadPublishedPosts,
} from './lib/posts.js';

const outputPath = path.join(process.cwd(), 'theme/data/contributions.json');

const posts = loadPublishedPosts();
const publishedDates = posts.map(post => post.published);
const { weeks, totalInRange, startDate, endDate } = buildContributionWeeks(publishedDates);

const payload = {
  totalInRange,
  startDate,
  endDate,
  weeks,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

console.log(
  `Generated contributions: ${totalInRange} posts in range (${startDate} ~ ${endDate}) -> theme/data/contributions.json`,
);
