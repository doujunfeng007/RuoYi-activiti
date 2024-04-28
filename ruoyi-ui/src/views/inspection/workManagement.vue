<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="定时作业" name="1"></el-tab-pane>
            <el-tab-pane label="异步作业" name="2"></el-tab-pane>
            <el-tab-pane label="挂起作业" name="3"></el-tab-pane>
            <el-tab-pane label="死亡作业" name="4"></el-tab-pane>
        </el-tabs>
        <table-template :data="tableData" :total="total">
            <template #columns>
                <el-table-column
                    prop="processInstanceId"
                    label="流程定义编号">
                </el-table-column>
                <el-table-column
                    prop="businessKey"
                    label="作业类型">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="计划执行时间">
                </el-table-column>
                <el-table-column
                    prop="currentTask"
                    label="流程实例编号">
                </el-table-column>
                <el-table-column
                    prop="assignee"
                    label="剩余重试次数">
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getListJobs} from "./api";

export default {
    name: "RunHistory",
    components: {
        TableTemplate
    },
    data() {
        return {
            responseData: {},
            activeName: "1"
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
        getListJobs(1, {
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            processDefinitionId: "",
            startDate: "",
            endDate: ""
            // "params[beginApplyTime]": "",
            // "params[endApplyTime]": ""
        }).then(res => {
            this.responseData = res;
        });
    },
    methods: {
        handleTabClick(tab) {
            console.log(tab.index);
            getListJobs(Number(tab.index) + 1, {
                pageSize: 10,
                pageNum: 1,
                isAsc: "asc",
                processDefinitionId: "",
                startDate: "",
                endDate: ""
                // "params[beginApplyTime]": "",
                // "params[endApplyTime]": ""
            }).then(res => {
                this.responseData = res;
            });
        },
    },
};
</script>