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