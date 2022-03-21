import * as http from 'utils/http'

export default {
    list(params) {
        return http.get(
            `${process.env.VUE_APP_CMS_API}/topic`, params
        )
    },
    get(id) {
        return http.get(
          `${process.env.VUE_APP_CMS_API}/topic/${id}`
        )
    },
    copy(id, params) {
        return http.post(
          `${process.env.VUE_APP_CMS_API}/topic/${id}/copy`, params
        )
    },
    add(params) {
        return http.post(
          `${process.env.VUE_APP_CMS_API}/topic/add`, params
        )
    },
    update(id, params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/topic/${id}/update`, params
        )
    },
    rollback(id, params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/topic/${id}/rollback`, params
        )
    },
    publish(id) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/topic/${id}/publish`
        )
    },
    fetch(id) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/topic/${id}/fetch`
        )
    },
    remove(id) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/topic/${id}/remove`
        )
    },
}
