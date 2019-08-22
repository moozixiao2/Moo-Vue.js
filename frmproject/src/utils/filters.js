export const timeFormat = (time, pre, pro) => {
  let y = time.getFullYear()
  let M = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let m = time.getMinutes()
  let s = time.getSeconds()
  let timeArr = [M, d, h, m, s]
  timeArr.forEach(e => {
    return e < 10 ? '0' + e : e
  })
  return y + pre + timeArr[0] + pre + timeArr[1] + ' ' + timeArr[2] + pro + timeArr[3] + pro + timeArr[4]
}
