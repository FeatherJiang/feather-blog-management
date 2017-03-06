/**
 * Created by feather on 2017/2/25.
 */
export function move (obj, json, fnEnd) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var bStop = true

    for (var attr in json) {
      var cur = 0

      if (attr === 'opacity') {
        cur = Math.round(parseFloat(getComputedStyle(obj, false)[attr]) * 100)
      } else if (attr === 'zIndex') {
        cur = parseInt(getComputedStyle(obj, false)[attr])
      } else {
        cur = parseInt(getComputedStyle(obj, false)[attr])
      }

      var speed = (json[attr] - cur) / 10
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

      if (cur !== json[attr]) {
        bStop = false
      }

      if (attr === 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'
        obj.style.opacity = (cur + speed) / 100
      } else if (attr === 'zIndex') {
        obj.style.zIndex = cur + speed
      } else {
        obj.style[attr] = cur + speed + 'px'
      }
    }

    if (bStop) {
      clearInterval(obj.timer)

      if (fnEnd) {
        fnEnd()
      }
    }
  }, 30)
}
