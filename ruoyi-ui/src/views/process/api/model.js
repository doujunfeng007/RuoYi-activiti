

import request from '@/utils/request'

// 获取模型数据
export const getModelLists = (data) => {
    return request({
      url: '/model/manage/modelLists?pageNum=1&pageSize=10',
      method: 'post',
      data
    })
}

// 添加模型数据

export const addModel = (data) => {
    return request({
      url: '/model/manage/add',
      method: 'post',
      data
    })
}