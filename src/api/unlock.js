import request from '@/utils/request'

export function getInfo(id) {
  return request({
    url: `admin/freezeCash/unlock/detail?id=${id}`,
    method: 'get'
  })
}

export function unlockList(query) {   // 列表
  return request({
    url: 'admin/freezeCash/unlock/list',
    method: 'get',
    params: query
  })
}

export function doUnlock(data) {   // 解冻
  return request({
    url: 'admin/freezeCash/unlock',
    method: 'post',
    data
  })
}

