import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginRss } from '@rspress/plugin-rss';
import { pluginSitemap } from '@rspress/plugin-sitemap';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',
  title: '阿猛的日常',
  description: '阿猛的日常 — 前端开发工程师 Ameng 的个人站点，记录 JavaScript、CSS、网络等技术笔记与项目思考。',
  icon: '/favicon/favicon-light-32.png',
  logo: {
    light: '/assets/avatar.png',
    dark: '/assets/avatar.png',
  },
  outDir: 'dist',
  markdown: {
    checkDeadLinks: false,
    showLineNumbers: false,
  },
  route: {
    cleanUrls: true,
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/ameng1024',
      },
    ],
    search: true,
  },
  plugins: [
    pluginSitemap({
      siteUrl: 'https://iameng.cn',
    }),
    pluginRss({
      siteUrl: 'https://iameng.cn',
      feed: {
        id: 'posts',
        title: '阿猛的日常',
        description:
          '前端开发工程师 Ameng 的技术博客，记录 JavaScript、CSS、网络等主题的学习笔记。',
        copyright: `Copyright © ${new Date().getFullYear()} Ameng`,
        test: '/posts/',
        output: {
          type: 'rss',
          filename: 'rss.xml',
          dir: '.',
        },
      },
    }),
  ],
});
