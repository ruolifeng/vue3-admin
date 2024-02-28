import request from "@/utils/request";

const baseUrl = '/system/role'

/**
 * 分页查询系统角色列表
 * @param query 查询参数
 * @param current 当前页
 * @param size 每页显示条数
 */
export function getPageList(query: SysRoleQuery, current = 1, size = 20){
    return request({
        url: `${baseUrl}/search`,
        method: 'POST',
        // 合并查询参数和分页参数例如：{name: xxx, ...,  current, size}
        data: {
            ...query,
            current,
            size
        }
    })
}
