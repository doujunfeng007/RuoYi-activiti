<template>
    <div>
        <div class="search-bar">
            <div>
                <label>流程名称:</label>
                <el-input type="text" v-model="searchParams.name" />
            </div>
            <div>
                <el-button type="success" @click="search">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </div>
        </div>
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
            tableData: [],
            searchParams: {
                name: "",
                bussinesskey: "",
                pageSize: 10,
                pageNum: 1
            }
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

<style scoped>
.search-bar {
    display: flex;
    margin-top: 8px;
    margin-left: 8px;
}
.el-input {
    display: inline-block;
    width: 300px;
    margin-right: 10px;
}
</style>