import request from '@/utils/request'
import commonUtil from "@/utils/common";

// 流程实例
export const getListProcess = data => {
    const queryString = commonUtil.objectToQueryStr(data);
    return request({
        url: '/flow/monitor/listProcess',
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};


// 执行实例
export const getListExecutions = data => {
    const queryString = commonUtil.objectToQueryStr(data);
    return request({
        url: '/flow/monitor/listExecutions',
        method: 'post'
    });
}


// 运行历史
export const getListHistoryProcess = data => {
    const queryString = commonUtil.objectToQueryStr(data);
    return request({
        url: '/flow/monitor/listHistoryProcess',
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}


// 作业管理
export const getListJobs = (type, data) => {
    const queryString = commonUtil.objectToQueryStr(data);
    return request({
        url: `/flow/monitor/listJobs?type=${type}`,
        method: 'post',
        data: queryString,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}