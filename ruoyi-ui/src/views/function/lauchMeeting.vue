<template>
    <div>
        <table-template :data="tableData" :total="total">
            <template #toolbar>
                <el-button type="primary">添加</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="warning">导出</el-button>
            </template>
            <template #columns>
                <el-table-column
                    prop="topic"
                    label="会议主题">
                </el-table-column>
                <el-table-column
                    prop="host"
                    label="主持人">
                </el-table-column>
                <el-table-column
                    prop="place"
                    label="会议地址">
                </el-table-column>
                <el-table-column
                    prop="peoplelist"
                    label="参会人员">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间">
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getLeaveApplyList} from "./api/leaveApply";

export default {
    name: "leaveApply",
    components: {
        TableTemplate
    },
    data() {
        return {
            responseData: {}
        };
    },
    computed: {
        tableData() {
            return this.responseData.rows || []
        },
        total() {
            return this.responseData.total || 0
        }
    },
    mounted() {
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", getLeaveApplyList);
        getLeaveApplyList({
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            leaveType: "",
            // "params[beginApplyTime]": "",
            // "params[endApplyTime]": ""
        }).then(res => {
            this.responseData = res;
        });
    },
};
</script>