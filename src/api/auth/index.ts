import request from "@/utils/request";
const baseUrl = "/auth";
// 退出系统
export function logout() {
    return request({
        url: `${baseUrl}/logout`,
        method: 'POST',
    });
}
