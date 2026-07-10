import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { HomeGitHubProfile } from './components/HomeGitHubProfile';
import './nav-title.css';

const Layout = () => (
  <BasicLayout
    afterNavTitle={
      <a href="/" className="site-nav-title">
        阿猛的日常
      </a>
    }
  />
);

export { Layout };
export { DocFooter } from './components/DocFooter';
export { HomeFooter } from './components/HomeFooter';

export function HomeHero() {
  return <HomeGitHubProfile />;
}

export function HomeFeature() {
  return null;
}

export * from '@rspress/core/theme-original';
