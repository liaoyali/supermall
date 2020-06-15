import axios from 'axios'

// config就是home.js传过来的url
export function request(config) {
    const instance = axios.create({
        baseURL: 'xxx',
        time: 5000
    })

    // 拦截器
    // 1. 请求拦截的作用
    instance.interceptors.request.use(config => {

        return config;
        // 拦截了config(发送请求的信息)，又还回去了
    }, err => {

    });
    // 2. 响应拦截
    instance.interceptors.response.use(res => {

        return res.data;
        // 请求响应后，拦截响应后的结果，然后再还回去
    }, err => {

    })

    // 3. 发送真正的网络请求
    return instance(config);
    // 此处返回的就是一个promise，然后home获取到这个promise之后就.then处理获得的结果
}