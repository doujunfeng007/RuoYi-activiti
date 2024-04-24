

import request from '@/utils/request'
import commonUtil from "@/utils/common";

// 获取模型数据
export const getProcesslists = (data) => {
    const fd = commonUtil.objectToFormData(data);
    return request({
      url: '/flow/manage/getprocesslists?pageNum=1&pageSize=10',
      method: 'post',
      data: fd
    })
}
