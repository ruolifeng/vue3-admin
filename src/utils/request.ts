import axios from "axios";
import type {Axios} from "axios";

/**
 * 手动创建一个axios实例
 */
const request: Axios = axios.create({
    // 使用easymock创建基础服务路径
    baseURL: 'https://mock.mengxuegu.com/mock/65d57e8d351bbd02cf339ca9/vue3-admin',
    // 超时时间
    timeout: 10000,
});


// 请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求的时候加上token
    return config;
}, (error) => {
    // 发现异常则捕获处理
    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error)
});

export default request;
