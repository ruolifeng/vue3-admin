import request from '@/utils/request'


const baseUrl = '/goods';
/**
 * 分页查询商品列表
 * @param query 查询参数
 * @param current 当前页
 * @param size 每页显示条数
 */
export function getPageList(query: GoodsQuery, current = 1, size = 20){
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
 * 根据商品id删除商品
 * @param id 用户id
 */
export function deleteRoleById(id:string){
    return request({
        url:`${baseUrl}/${id}`,
        method:'DELETE'
    })
}

export function updateStatus(data: {id: number ,status: number}){
    return request({
        url:`${baseUrl}/status`,
        method:'PUT',
        data
    })
}

export function add(data: GoodsType) {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data
    });
}
// 更新
export function update(data: GoodsType) {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data,
    });
}
// 查询商品编码是否存在
export function isExist(params: {code: string}) {
    return request({
        url: `${baseUrl}/exist`,
        method: 'GET',
        params
    })
}

/**
 * 查询所有分类——新增修改商品下拉框
 * @returns 所有分类
 */
export function getCategoryList() {
    return request({
        url: `${baseUrl}/list`,
        method: 'GET'
    });
}
