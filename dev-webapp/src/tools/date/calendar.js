// example
// calendar(0)

const Format = require('./format')

module.exports = function (from = 0, to = 1) {
  let data = []

  while (from < to) {
    data.push(monthDate(from))
    from++
  }
  return data
}

const monthDate = (from = 0, to = 1, fmt = 'YYYY-MM-DD') => {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + from

  let firstDayOfMonth = new Date(year, month, 1).getDay() // 当月第一天周几
  let lastDayOfMonth = new Date(year, month + to, 0).getDay() // 当月最后一天周几

  let startDateOfMonth = new Date(year, month, 1).getTime() // 当月1号 0 点
  let endDateOfMonth = new Date(year, month + to, 0).getTime() // 当月30号 24点

  let startDateTime = startDateOfMonth - firstDayOfMonth * 24 * 60 * 60 * 1000 // 补全上个月的日期
  let endDateTime = endDateOfMonth + (6 - lastDayOfMonth) * 24 * 60 * 60 * 1000 // 补全下个月的日期

  let rs = []

  while (startDateTime <= endDateTime) {
    let date = new Date(startDateTime)
    rs.push({
      month: date.getMonth() + 1,
      date: date.getDate(),
      value: Format(startDateTime, fmt),
      isOtherMonth: startDateTime < startDateOfMonth || startDateTime > endDateOfMonth,
      isPrevious: startDateTime + 24 * 60 * 60 * 1000 < now.getTime(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isActive: false
    })
    startDateTime += 24 * 60 * 60 * 1000
  }
  return {
    year: new Date(startDateOfMonth).getFullYear(),
    month: new Date(startDateOfMonth).getMonth(),
    isOtherYear: new Date(startDateOfMonth).getFullYear() !== year,
    dates: rs
  }
}
