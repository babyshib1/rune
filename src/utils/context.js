import { formatDate } from './format'

const NOW_DATE = formatDate(new Date().getTime()) || ''
console.log(NOW_DATE)

export default {
  NOW_DATE
}
