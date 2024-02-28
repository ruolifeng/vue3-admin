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

/**
 * 近三十天的销售数据
 */
export function getLast30DaysSaleData() {
    return request({
        url: '/home/30days/saleData',
        method: 'GET'
    })
}

/**
 * 获取排行前10的数据
 */
export function getTopData() {
    return request({
        url: '/home/member/top',
        method: 'GET'
    })
}

/**
 * 天气查询
 */
export function getAir() {
    return request({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=ef088e63e91de87233b59453cf87d32a&city=330000',
        method: 'GET'
    })
}
