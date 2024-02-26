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
