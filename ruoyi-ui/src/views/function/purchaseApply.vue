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
                    prop="itemlist"
                    label="采购清单">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="总价">
                </el-table-column>
                <el-table-column
                    prop="applytime"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="applyer"
                    label="申请人">
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