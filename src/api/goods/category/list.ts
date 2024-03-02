import request from "@/utils/request";
// 商品分类
const baseUrl = '/goods/category';
// 列表分页查询接口
export function getPageList(query: SysRoleQuery, current = 1, size = 20) {
    return request({
        url: `${baseUrl}/search`,
        method: 'POST',
        data: {...query, current, size} // 合并为一个对象
    });
}
// 删除
export function deleteRoleById(id:string) {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE',
    });
}

// 新增
export function addUser(data: GoodsType) {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data
    });
}
// 更新
export function updateUser(data: GoodsType) {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data,
    });
}
