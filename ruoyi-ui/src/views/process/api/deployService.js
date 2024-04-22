

import request from '@/utils/request'

// 获取模型数据
export const getModelLists = (data) => {
    return request({
      url: '/flow/manage/getprocesslists?pageNum=1&pageSize=10',
      method: 'post',
      data
    })
}
