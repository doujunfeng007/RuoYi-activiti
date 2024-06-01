<template>
    <div style="padding-left: 8px;">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="定时作业" name="1"></el-tab-pane>
            <el-tab-pane label="异步作业" name="2"></el-tab-pane>
            <el-tab-pane label="挂起作业" name="3"></el-tab-pane>
            <el-tab-pane label="死亡作业" name="4"></el-tab-pane>
        </el-tabs>
        <div class="search-bar">
            <div>
                <label>流程定义ID:</label>
                <el-input type="text" v-model="searchParams.processDefinitionId" size="small"/>
            </div>
            <div v-if="activeName !== '3'">
                <label>计划执行时间:</label>
                <el-date-picker
                    v-model="searchParams.range"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="small"
                >
                </el-date-picker>
            </div>
            <div>
                <el-button type="primary" @click="search" size="mini" icon="el-icon-search">搜索</el-button>
                <el-button type="default" @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
            </div>
        </div>
        <table-template :data="tableData" :total="total">
            <template #columns>
                <el-table-column
                    prop="processDefinitionId"
                    label="流程定义编号">
                </el-table-column>
                <el-table-column
                    prop="jobType"
                    label="作业类型">
                </el-table-column>
                <el-table-column
                    prop="duedate"
                    label="计划执行时间">
                </el-table-column>
                <el-table-column
                    prop="processInstanceId"
                    label="流程实例编号">
                </el-table-column>
                <el-table-column
                    prop="revision"
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
            activeName: "1",
            searchParams: {
                processDefinitionId: "",
                range: null,
                pageNum: 1,
                pageSize: 10

            }
        };
    },
    computed: {
        tableData() {
            return this.responseData.rows || []
        },
        total() {
            return this.responseData.total || 0
        },
        transferedSearchParams() {
            return {
                processDefinitionId: this.searchParams.processDefinitionId,
                pageNum: this.searchParams.pageNum,
                pageSize: this.searchParams.pageSize,
                startDate: (this.searchParams.range && this.searchParams.range[0]) || "",
                endDate: (this.searchParams.range && this.searchParams.range[1]) || "",
                isAsc: "asc",
                type: this.activeName
            };
        }
    },
    mounted() {
        // getListJobs(1, {
        //     pageSize: 10,
        //     pageNum: 1,
        //     isAsc: "asc",
        //     processDefinitionId: "",
        //     startDate: "",
        //     endDate: ""
        //     // "params[beginApplyTime]": "",
        //     // "params[endApplyTime]": ""
        // }).then(res => {
        //     this.responseData = res;
        // });
        this.getListJobByParamsAndRender(this.transferedSearchParams);
    },
    methods: {
        search() {
            this.getListJobByParamsAndRender(this.transferedSearchParams);
        },
        reset() {
            this.searchParams.processDefinitionId = "";
            this.searchParams.range = null;
            this.getListJobByParamsAndRender(this.transferedSearchParams);

        },
        getListJobByParamsAndRender(params) {
            const {
                processDefinitionId = "",
                pageNum = 1,
                pageSize = 10,
                endDate = "",
                startDate = "",
                isAsc,
                type = "1"
            } = params;
            getListJobs(type, {
                pageSize,
                pageNum,
                isAsc,
                processDefinitionId,
                startDate,
                endDate
            }).then(res => {
                this.responseData = res;
            });
        },
        handleTabClick(tab) {
            this.getListJobByParamsAndRender(this.transferedSearchParams);
        },
    },
};
</script>
<style scoped>
.search-bar {
    display: flex;
    margin-top: 8px;
    margin-left: 8px;
}
.search-bar > *{
    margin-right: 8px;
}
.search-bar .el-input {
    display: inline-block;
    width: 300px;
    margin-right: 10px;
}
.search-bar label {
    font-size: 14px;
    color: #606266;
    margin-right: 8px;
}
</style>