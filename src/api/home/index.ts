import request from "@/utils/request";

/**
 * 查询营业数据
 */
export function getStatistics() {
    return request({
        url: '/home/statistics',
        method: 'GET',
    });
}

/**
 * 查询分类销售数据
 */
export function getCategoryData() {
    return request({
        url: '/home/categoryData',
        method: 'GET'
    })
}
