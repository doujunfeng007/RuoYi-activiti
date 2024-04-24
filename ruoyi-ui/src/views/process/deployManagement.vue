<template>
    <div>
        <table-template :data="tableData" :total="total">
            <template #toolbar>
                <el-button type="primary">部署</el-button>
            </template>
            <template #columns>
                <el-table-column
                    prop="id"
                    label="流程定义ID">
                </el-table-column>
                <el-table-column
                    prop="deploymentId"
                    label="流程部署ID">
                </el-table-column>
                <el-table-column
                    prop="key"
                    label="流程定义key">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="流程名称">
                </el-table-column>
                <el-table-column
                    prop="resourceName"
                    label="流程资源定义">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本号">
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getProcesslists} from "./api/deployService";

export default {
    name: "deployManagement",
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
        getProcesslists({
            pageSize: 10,
            pageNum: 1,
            orderByColumn: "processSort",
            isAsc: "asc",
            key: "",
            name: "",
            latest: true
        }).then(res => {
            console.log("拿到processList", res);
            this.responseData = res;
        });
    },
};
</script>
