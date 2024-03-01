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

/**
 * 新增用户数据
 * @param data 角色数据
 */
export function addUser(data: SysUserType) {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: data
    })
}

/**
 * 修改用户
 */
export function updateUser(data: SysUserType) {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: data
    })
}

/**
 * 校验用户手机号或者账号是否存在
 * @param params 接收两种参数
 */
export function checkExist(params: {username: string} | {mobile: string}){
    return request({
        url:`${baseUrl}/exist`,
        method:"GET",
        params: params // 会将传递的参数转换成key=value的形式
    })
}
