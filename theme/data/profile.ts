export const profile = {
  name: '尹猛',
  displayName: '阿猛',
  username: 'ameng1024',
  github: 'https://github.com/ameng1024',
  bio: '这里收纳我成长中的感悟与复盘，平复焦虑，沉淀自我，充盈内心。学业之外，不可丢失生活节奏，善待自身身心，才能在钻研学识、自我提升的道路上长久坚持。',
  location: '浙江杭州',
  website: 'https://iameng.cn',
  email: 'ameng1024@foxmail.com',
  tagline: '科技改变世界，技术成就未来！',
};

export interface PinnedRepo {
  name: string;
  visibility: 'Public' | 'Private';
  description: string;
  language: string;
  languageColor: string;
  stars?: number;
  link: string;
}

export const pinnedRepos: PinnedRepo[] = [
  {
    name: 'mysite',
    visibility: 'Public',
    description:
      '个人站点「阿猛的日常」，基于 Rspress 构建，集成文章、作品与面试笔记。',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 3,
    link: 'https://github.com/ameng1024/mysite',
  },
  {
    name: 'liteview',
    visibility: 'Public',
    description:
      '轻阅 (LiteView) 是一款 Windows 桌面文件预览工具，支持多种格式快速预览。',
    language: 'TypeScript',
    languageColor: '#3178c6',
    link: 'https://github.com/ameng1024/liteview',
  },
  {
    name: 'iameng.cn',
    visibility: 'Public',
    description: '个人网站源码，前端技术博客与作品展示。',
    language: 'TypeScript',
    languageColor: '#3178c6',
    link: 'https://iameng.cn',
  },
  {
    name: 'sinic',
    visibility: 'Public',
    description: '汉字转拼音工具库，支持多音字与声调处理。',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 3,
    link: 'https://github.com/ameng1024/sinic',
  },
];
