const Format = require('./format')

module.exports = function (d = 0, fmt = 'YYYY-MM-DD') {
  let date = new Date().getTime()

  if (typeof d === 'number') date += d * 24 * 60 * 60 * 1000

  return Format(date, fmt)
}
