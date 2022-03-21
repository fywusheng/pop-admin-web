// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function sex(type) {
  switch(type) {
    case 0:
      return '女'
    case 1:
      return '男' 
    case 2:
      return '不限' 
  }
}

export function orgStatus(status) {
  switch(status) {
      case 0: 
        return '停用'
      case 1: 
        return '审核中'
      case 2: 
        return '正常'
      case 3: 
        return '审核不通过'
      case 4: 
        return '待支付'
  }
}

export function money(value) {
  if(!value){
    return '0';
  }
  if(value % 100 == 0){
    return value/100;
  }
  const fixedValue = parseFloat(value/100).toFixed(2) + '';
  return fixedValue.replace(/0+$/g, '');
}

export function partnerStatus(status) {
  switch(status) {
      case 0: 
        return '停用'
      case 1: 
        return '审核中'
      case 2: 
        return '正常'
      case 3: 
        return '审核不通过'
      case 4: 
        return '待支付'
      case 5: 
        return '撤回申请'
  }
}

export function cashFreezeStatus(status) {
  switch(status) {
      case 0: 
        return '待解冻'
      case 1: 
        return '已退款不能解冻'
      case 2: 
        return '已解冻'
  }
}

export function educationType(type) {
  switch(type) {
    case 0:
      return '中专及以下'
    case 1:
      return '高中'
    case 2:
      return '大专'
    case 3:
      return '本科'
    case 4:
      return '研究生及以上'
  }
}

export function orderStatus(status) {
  switch (status) {
    case 0:
      return '待支付'
    case 1:
      return '已成单'
    case 2:
      return '已取消'
  }
}