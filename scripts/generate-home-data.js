import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

execSync('node scripts/generate-recent-posts.js', { stdio: 'inherit', cwd: path.join(dir, '..') });
execSync('node scripts/generate-contributions.js', { stdio: 'inherit', cwd: path.join(dir, '..') });
