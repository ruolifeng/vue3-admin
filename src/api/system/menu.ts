import request from "@/utils/request";

const baseUrl = '/system/menu'

/**
 * 查询系统菜单列表
 * @param query 查询参数
 */
export function getList(query?: SysMenuQuery) {
    return request({
        url: `${baseUrl}/search`,
        method: 'POST',
        data: query
    })
}


/**
 * 删除菜单数据
 * @param id 菜单id
 */
export function deleteMenuById(id: string) {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE',
    })
}

/**
 * 查询类型为菜单的所有数据
 */
export function getMenuSelectAll() {
    return request({
        url: `${baseUrl}/select`,
        method: 'GET',
    })
}


/**
 * 新增菜单
 */
export function addMenu(data:SysMenuType) {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: data
    })
}

/**
 * 修改菜单
 */
export function updateMenu(data:SysMenuType) {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: data
    })
}


// 查询登录的用户信息以及所拥有的权限
export function getMenuUserInfo(){
    return request({
        url: `${baseUrl}/user`,
        method:'GET'
    })
}
