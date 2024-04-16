

import request from '@/utils/request'

// 获取模型数据
export const getModelLists = (data) => {
    return request({
      url: '/model/manage/modelLists',
      method: 'post',
      data
    })
}