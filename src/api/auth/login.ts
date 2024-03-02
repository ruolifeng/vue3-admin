import request from "@/utils/request";


const baseurl = '/auth'
export function login(data:LoginData) {
    return request({
        url: `${baseurl}/token`,
        method:'POST',
        data
    })
}
