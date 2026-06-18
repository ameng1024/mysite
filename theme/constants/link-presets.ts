import { LinkPreset, type NavBarLink } from '../types/config'
import { labels } from './labels'

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
  [LinkPreset.Home]: {
    name: labels.home,
    url: '/',
  },
  [LinkPreset.About]: {
    name: labels.about,
    url: '/about/',
  },
  [LinkPreset.Archive]: {
    name: labels.archive,
    url: '/archive/',
  },
}
