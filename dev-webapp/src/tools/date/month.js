const Format = require('./format')

module.exports = function (m = 0, fmt = 'YYYY-MM') {
  let now = new Date()

  let year = now.getFullYear()
  let month = now.getMonth()

  if (typeof m === 'number') month += m

  return Format(new Date(year, month), fmt)
}
