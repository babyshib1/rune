import Cookies from 'js-cookie'

const TokenKey = 'cookie'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getcookie() {
  return Cookies.get('cookie')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookie(name, val) {
  return Cookies.set(name, val)
}

export function getCookieVal(name) {
  return Cookies.get(name)
}

export function removeCookie(name) {
  return Cookies.remove(name)
}
