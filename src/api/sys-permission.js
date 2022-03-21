import { fetch, post } from '@/utils/http-client'
import request from '@/utils/request'

export function addPermission(data) {
	return request({
		url: 'permission/addPermission',
		method: 'post',
		data
	})
}

export function updatePermission(data) {
	return request({
		url: 'permission/update',
		method: 'post',
		data
	})
}

export function getPermissionTree(data){
	return fetch('permission/getPermissionTree',data)
//   return request({
//       url: 'permission/getPermissionTree',
//       method: 'get',
//       data
//     })
}

export function getPermissionById(data){
	return request({
		url: 'permission/getPermissionById',
		method: 'get',
		data
	  })
  }

  export function deletePermission(data) {
	return post('permission/deletePermissionById',data)
	// return request({
	// 	url: 'permission/deletePermissionById',
	// 	method: 'get',
	// 	data
	// })
}
  