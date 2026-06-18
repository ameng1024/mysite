import { defineConfig } from '@rspress/core';
import path from 'node:path';
import { siteConfig } from './theme/config';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { pluginRss } from '@rspress/plugin-rss';
import { blogPlugin } from './plugins/blog';
import { getThemeNav } from './theme/utils/theme-nav';

export default defineConfig({
  root: 'docs',
  title: siteConfig.title,
  description: siteConfig.subtitle,
  icon: '/favicon/favicon-light-32.png',
  lang: 'zh',
  outDir: 'dist',
  markdown: {
    checkDeadLinks: false,
    showLineNumbers: false,
  },
  route: {
    cleanUrls: true,
    exclude: ['posts/guide/**', 'posts/**/draft.md'],
  },
  themeConfig: {
    nav: getThemeNav(),
    socialLinks: [],
    darkMode: false,
    search: true,
    localeRedirect: 'never',
    fallbackHeadingTitle: false,
    enableScrollToTop: false,
  },
  search: {
    codeBlocks: false,
  },
  builderConfig: {
    source: {
      alias: {
        '@theme': path.join(__dirname, 'theme'),
      },
    },
    tools: {
      postcss: {
        postcssOptions: {
          plugins: ['@tailwindcss/postcss'],
        },
      },
    },
  },
  plugins: [
    blogPlugin(),
    pluginSitemap({
      siteUrl: 'https://ameng404.com',
    }),
    pluginRss({
      siteUrl: 'https://ameng404.com',
      feed: {
        title: siteConfig.title,
        description: siteConfig.subtitle,
        copyright: `Copyright © ${new Date().getFullYear()} Ameng`,
      },
      rss: {
        filename: 'rss.xml',
        test: page => page.routePath.startsWith('/posts/'),
      },
    }),
  ],
});
