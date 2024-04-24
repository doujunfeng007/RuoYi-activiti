<template>
    <div>
        <table-template :data="tableData" :total="total">
            <template #columns>
                <el-table-column
                    prop="processInstanceId"
                    label="流程实例编号">
                </el-table-column>
                <el-table-column
                    prop="businessKey"
                    label="业务号">
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
                    prop="assignee"
                    label="当前处理人">
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
import {getListProcess} from "./api";

export default {
    name: "ProcessInstance",
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
        getListProcess({
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            name: "",
            businessKey: ""
            // "params[beginApplyTime]": "",
            // "params[endApplyTime]": ""
        }).then(res => {
            this.responseData = res;
        });
    },
};
</script>