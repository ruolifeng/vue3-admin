import request from "@/utils/request";

const baseUrl = '/system/user'

/**
 * 分页查询系用户列表
 * @param query 查询参数
 * @param current 当前页
 * @param size 每页显示条数
 */
export function getPageList(query: SysUserQuery, current = 1, size = 20){
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

/**
 * 根据用户id删除用户
 * @param id 用户id
 */
export function deleteUserById(id:string){
    return request({
        url:`${baseUrl}/${id}`,
        method:'DELETE'
    })
}
