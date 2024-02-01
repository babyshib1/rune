window.onload = function () {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    let flag
    let myFunction
    let scrollTop
    document.body.addEventListener('focusin', function (e) {
      scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      flag = true
      clearTimeout(myFunction)
    })
    document.body.addEventListener('focusout', function () {
      flag = false
      if (!flag) {
        myFunction = setTimeout(function () {
          window.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' })
        }, 300)
      } else {
        return false
      }
    })
  }
}

