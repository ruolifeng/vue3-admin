import request from "@/utils/request";

const baseUrl = '/system/media'
export function uploadImages(data:FormData){
    return request({
        url: `${baseUrl}/upload/img`,
        method:"POST",
        data
    })
}
