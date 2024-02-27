import request from "@/utils/request";

export function getList(query) {
    return request({
        url: '/system/menu/search',
        method: 'POST',
        data: query
    })
}
