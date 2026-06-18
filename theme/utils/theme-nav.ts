import { navBarConfig } from '../config';
import { LinkPresets } from '../constants/link-presets';
import type { NavBarLink } from '../types/config';
import { LinkPreset } from '../types/config';

/** 将博客导航配置转为 Rspress themeConfig.nav 格式 */
export function getThemeNav() {
  return navBarConfig.links.map((item: NavBarLink | LinkPreset) => {
    const link: NavBarLink = typeof item === 'number' ? LinkPresets[item] : item;
    const isExternal = link.external || /^https?:\/\//.test(link.url);
    return {
      text: link.name,
      link: link.url,
      ...(isExternal ? {} : {}),
    };
  });
}
