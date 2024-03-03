import axios from "axios";
import type {AxiosInstance} from "axios";
import {ElMessage} from "element-plus";
import {useAuthStore} from "@/stores/auth";

/**
 * 手动创建一个axios实例
 */
const request: AxiosInstance = axios.create({
    // 使用easymock创建基础服务路径，可以将baseURL配置在.env.xxx配置文件中
    // baseURL: 'https://mock.mengxuegu.com/mock/65d57e8d351bbd02cf339ca9/vue3-admin',
    // baseURL: import.meta.env.BASE_URL,
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间
    timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求的时候加上token
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    // 解决访问天气信息跨域问题
    if (config.url == 'https://restapi.amap.com/v3/weather/weatherInfo?key=ef088e63e91de87233b59453cf87d32a&city=330000'){
        return config
    }else {
        if (accessToken) {
            // 请求头带上令牌
            config.headers.Authorization = accessToken;
        }
        return config;
    }
}, (error) => {
    // 发现异常则捕获处理
    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use((response) => {
    const res = response.data;
    return res;
    // 响应正常返回响应结果给接口调用方
    // if (res.code === 20000 || res.infocode === 10000) {
    //     return res;
    // }
    // 处理天气
    // 响应错误弹出错误提示
    ElMessage.error(res.message);
}, (error) => {
    // 处理响应错误
    const {message, response} = error;
    if (message.indexOf('timeout') != -1) {
        ElMessage.error('网络超时！');
    } else if (message === 'Network error') {
        ElMessage.error('网络连接错误！');
    } else if (response.data) ElMessage.error(response.statusText)
    else ElMessage.error('接口请求错误！')
    return Promise.reject(error)
});

export default request;
