// 给首页的所有请求做封装统一管理

import { request } from './request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}