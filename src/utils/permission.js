import router from '@/router'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  next()
})
