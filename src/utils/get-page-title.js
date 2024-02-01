import defaultSettings from '@/settings'

const title = defaultSettings.title || '岚图'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
