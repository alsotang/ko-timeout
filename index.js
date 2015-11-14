var ms = require('ms')
var co = require('co')

var timeout = function (gen, time) {
  time = isNaN(time) ? ms(time) : time
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout: exceed ' + time + 'ms'))
    }, time)

    co(gen).then(resolve).catch(reject);
  })
}

module.exports = exports = timeout;
