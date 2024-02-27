import request from "@/utils/request";

const baseUrl = '/system/menu'

/**
 * 查询系统菜单列表
 * @param query 查询参数
 */
export function getList(query: SysMenuQuery) {
    return request({
        url: `${baseUrl}/search`,
        method: 'POST',
        data: query
    })
}
