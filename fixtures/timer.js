'use strict'

module.exports = timer

function timer (duration) {
  setTimeout(() => console.log(duration), duration)
}
