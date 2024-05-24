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
                    prop="taskName"
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="processInstanceId"
                    label="流程实例编号">
                </el-table-column>
                <el-table-column
                    prop="executionId"
                    label="执行实例编号">
                </el-table-column>
                <el-table-column
                    prop="businessKey"
                    label="业务号">
                </el-table-column>
                <el-table-column
                    prop="processName"
                    label="流程名称">
                </el-table-column>
                <el-table-column
                    prop="starter"
                    label="发起人">
                </el-table-column>
                <el-table-column
                    prop="assignee"
                    label="办理人">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="任务创建时间">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="流程启动时间">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleTodo(scope.$index, scope.row)">办理</el-button>
                    </template>
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getMyTodoList, getProcessByTaskid} from "./api/myTodoList";

export default {
    name: "myTodoList",
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
        getMyTodoList({
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            processName: "",
            taskName: ""
        }).then(res => {
            this.responseData = res;
        });
    },
    methods: {
        handleTodo(index, row) {
            console.log("todo", row);
            const {formKey, taskId, businessKey} = row;
            this.$router.push({
                path: `/process/${formKey}/${taskId}?id=${businessKey}`,
                meta: { title: "测试" },
                params: {row}
            })
        }
    },
};
</script>