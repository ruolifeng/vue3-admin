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

/**
 * 删除角色数据
 * @param id 角色id
 */
export function deleteRoleById(id: string) {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE',
    })
}

/**
 * 新增角色数据
 * @param data 角色数据
 */
export function addRole(data: SysRoleType) {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: data
    })
}

/**
 * 修改角色
 */
export function updateRole(data: SysRoleType) {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: data
    })
}

/**
 * 根据角色id查询次角色所拥有的菜单ids
 */
export function getMenuIdsByRoleId(roleId:string){
    return request({
        url:`${baseUrl}/${roleId}/menu/ids`,
        method:'GET'
    })
}

/**
 * 保存角色权限数据
 * @param roleId
 * @param menuIds
 */
export function saveRoleMenu(roleId: string,menuIds: string[]){
    return request({
        url:`${baseUrl}/{roleId}/menu/ids`,
        method:"POST",
        data: menuIds
    })
}


/**
 * 查询所有角色用于分配下拉框
 */
export function getRoleList(){
    return request({
        url: `${baseUrl}/list`,
        method:"GET"
    })
}
