import request from '@/utils/request'
import commonUtil from "@/utils/common";

// 获取请假列表

export const getLeaveApplyList = data => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa1");
    const queryString = commonUtil.objectToQueryStr(data);
    console.log("aaaaaaaaaaaaaaaaaaaaaaa2", queryString);
    return request({
        url: '/leaveapply/list',
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

// 添加请假
// http://101.43.32.218:8020/leaveapply/add
export const addLeave = data => {
    const fd = commonUtil.objectToFormData(data)
    return request({
        url: '/leaveapply/add',
        method: 'post',
        data: fd
    });
}