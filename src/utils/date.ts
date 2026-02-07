/**
 * 时间格式化工具函数
 */

/**
 * 格式化日期
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * 
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD') // '2026-02-07'
 * formatDate(1707292800000, 'YYYY年MM月DD日') // '2026年02月07日'
 * formatDate('2026-02-07', 'MM/DD/YYYY HH:mm') // '02/07/2026 00:00'
 */
export function formatDate(
  date: Date | number | string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date'
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()

  const formatMap: Record<string, string> = {
    YYYY: String(year),
    MM: String(month).padStart(2, '0'),
    M: String(month),
    DD: String(day).padStart(2, '0'),
    D: String(day),
    HH: String(hours).padStart(2, '0'),
    H: String(hours),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds)
  }

  return format.replace(/YYYY|MM?|DD?|HH?|mm?|ss?/g, (match) => formatMap[match])
}

/**
 * 获取相对时间描述
 * @param date 日期对象、时间戳或日期字符串
 * @returns 相对时间描述，如 '刚刚'、'3分钟前'、'2小时前'
 * 
 * @example
 * getRelativeTime(Date.now() - 30000) // '刚刚'
 * getRelativeTime(Date.now() - 180000) // '3分钟前'
 * getRelativeTime(Date.now() - 7200000) // '2小时前'
 */
export function getRelativeTime(date: Date | number | string): string {
  const d = new Date(date)
  const now = Date.now()
  const diff = now - d.getTime()

  if (diff < 0) return formatDate(d, 'YYYY-MM-DD HH:mm')

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 12 * month

  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`
  if (diff < day) return `${Math.floor(diff / hour)}小时前`
  if (diff < day * 2) return '昨天'
  if (diff < day * 7) return `${Math.floor(diff / day)}天前`
  if (diff < month) return `${Math.floor(diff / (day * 7))}周前`
  if (diff < year) return `${Math.floor(diff / month)}个月前`
  return `${Math.floor(diff / year)}年前`
}

/**
 * 判断是否为今天
 * @param date 日期对象、时间戳或日期字符串
 * @returns 是否为今天
 */
export function isToday(date: Date | number | string): boolean {
  const d = new Date(date)
  const today = new Date()
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  )
}

/**
 * 判断是否为昨天
 * @param date 日期对象、时间戳或日期字符串
 * @returns 是否为昨天
 */
export function isYesterday(date: Date | number | string): boolean {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  )
}

/**
 * 获取日期范围
 * @param type 类型：'today' | 'yesterday' | 'week' | 'month' | 'year'
 * @returns [开始时间, 结束时间]
 */
export function getDateRange(
  type: 'today' | 'yesterday' | 'week' | 'month' | 'year'
): [Date, Date] {
  const now = new Date()
  const start = new Date(now)
  const end = new Date(now)

  switch (type) {
    case 'today':
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'yesterday':
      start.setDate(start.getDate() - 1)
      start.setHours(0, 0, 0, 0)
      end.setDate(end.getDate() - 1)
      end.setHours(23, 59, 59, 999)
      break
    case 'week':
      const day = start.getDay() || 7
      start.setDate(start.getDate() - day + 1)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'month':
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'year':
      start.setMonth(0, 1)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
  }

  return [start, end]
}
