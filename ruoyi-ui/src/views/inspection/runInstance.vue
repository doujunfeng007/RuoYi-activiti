<template>
    <div>
        <table-template :data="tableData" :total="total">
            <template #columns>
                <el-table-column
                    prop="executionId"
                    label="执行实例编号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="流程名称">
                </el-table-column>
                <el-table-column
                    prop="currentTask"
                    label="当前节点">
                </el-table-column>
                <el-table-column
                    prop="active"
                    label="是否激活">
                </el-table-column>
                <el-table-column
                    prop="suspended"
                    label="是否挂起">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="startUserId"
                    label="发起人">
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getListExecutions} from "./api";

export default {
    name: "RunInstance",
    components: {
        TableTemplate
    },
    data() {
        return {
            tableData: []
        };
    },
    mounted() {
        getListExecutions({
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            name: "",
            businessKey: ""
            // "params[beginApplyTime]": "",
            // "params[endApplyTime]": ""
        }).then(res => {
            this.tableData = res.map(item => {
                return {
                    ...item,
                    active: item.active ? "是" : "否",
                    suspended: item.suspended ? "是" : "否"
                };
            });
        });
    },
};
</script>