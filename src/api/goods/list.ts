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
