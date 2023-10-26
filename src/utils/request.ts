import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如设置token
        config.headers = config.headers || {};
        config.headers.Authorization = localStorage.getItem('userToken') || '';
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // 处理响应数据
        return response;
    },
    error => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default instance;
