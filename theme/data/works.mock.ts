export interface WorkItem {
  title: string;
  description: string;
  tags: string[];
  link: string;
  cover?: string;
  status?: string;
}

export const mockWorks: WorkItem[] = [
  {
    title: '阿猛的日常',
    description: '基于 Rspress 构建的个人站点，集成文章、作品与面试笔记。',
    tags: ['Rspress', 'React', 'TypeScript'],
    link: '/works',
    cover: '/assets/banner.jpg',
    status: '进行中',
  },
  {
    title: '组件库 Playground',
    description: '面向业务场景的 React 组件文档与在线调试环境。',
    tags: ['React', 'Storybook', 'Tailwind'],
    link: '/works',
    status: 'Mock',
  },
  {
    title: '前端监控面板',
    description: '轻量级前端异常与性能数据采集看板，支持自定义告警规则。',
    tags: ['Vue', 'ECharts', 'Node.js'],
    link: '/works',
    status: 'Mock',
  },
];
