import request from '@/utils/request'
import commonUtil from "@/utils/common";

// 获取请假列表

export const getMeetingList = data => {
    const queryString = commonUtil.objectToQueryStr(data);
    return request({
        url: '/meeting/list',
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

// 添加请假
// http://101.43.32.218:8020/leaveapply/add
export const addMeeting = data => {
    const fd = commonUtil.objectToFormData(data)
    return request({
        url: '/meeting/add',
        method: 'post',
        data: fd
    });
}