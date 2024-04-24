import request from '@/utils/request'
import commonUtil from "@/utils/common";

// 获取我的待办
export const getMyTodoList = data => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa1");
    const queryString = commonUtil.objectToQueryStr(data);
    console.log("aaaaaaaaaaaaaaaaaaaaaaa2", queryString);
    return request({
        url: '/task/manage/mylist',
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}