import * as http from 'utils/http'

export default {

    list(params) {
        return http.get(`${process.env.VUE_APP_CMS_API}/operation`, params)
    },
    get(id) {
        return http.get(
            `${process.env.VUE_APP_CMS_API}/operation/${id}`
        )
    },
    add(params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operation/add`, params
        )
    },
    remove(id) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operation/${id}/remove`
        )
    },
    update(params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operation/${params.id}/update`, params
        )
    },
}
