<template>
    <div>
        <div class="search-bar">
            <div>
                <label>流程名称:</label>
                <el-input type="text" v-model="searchParams.name" />
            </div>
            <div>
                <label>业务号:</label>
                <el-input type="text" v-model="searchParams.bussinesskey" />
            </div>
            <div>
                <el-button type="success" @click="search">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </div>
        </div>
        <table-template
            :data="tableData"
            :total="total"
            selection
            @page-change="handlePageChange">
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
            responseData: {},
            searchParams: {
                name: "",
                bussinesskey: "",
                pageSize: 10,
                pageNum: 1
            }
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
        this.getListProcessByParamsAndRender(this.searchParams);
    },
    methods: {
        getListProcessByParamsAndRender(params) {
            const {name = "", businessKey = "", pageSize = 10, pageNum = 1} = params;
            return getListProcess({
                pageSize,
                pageNum,
                isAsc: "asc",
                name,
                businessKey
            }).then(res => {
                this.responseData = res;
            });
        },
        search() {
            this.getListProcessByParamsAndRender(this.searchParams);
        },
        reset() {
            this.searchParams.name = "";
            this.searchParams.businessKey = "";
            this.getListProcessByParamsAndRender(this.searchParams);
        },
        handlePageChange({pageNum, pageSize}) {
            console.log(pageNum, pageSize);
            this.searchParams.pageNum = pageNum;
            this.searchParams.pageSize = pageSize;
            this.getListProcessByParamsAndRender(this.searchParams);
        }
    }
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