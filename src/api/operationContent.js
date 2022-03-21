import * as http from 'utils/http'

export default {

    list(params) {
        return http.get(`${process.env.VUE_APP_CMS_API}/operationContent`, params)
    },
    get(id) {
        return http.get(
            `${process.env.VUE_APP_CMS_API}/operationContent/${id}`
        )
    },
    add(params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operationContent/add`, params
        )
    },
    remove(id) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operationContent/${id}/remove`
        )
    },
    update(params) {
        return http.post(
            `${process.env.VUE_APP_CMS_API}/operationContent/${params.id}/update`, params
        )
    },
}
