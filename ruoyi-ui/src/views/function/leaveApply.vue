<template>
    <div>
        <table-template :data="tableData" :total="total">
            <template #toolbar>
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="warning">导出</el-button>
            </template>
            <template #columns>
                <el-table-column
                    prop="userId"
                    label="请假人">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="起始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="leaveType"
                    label="类型">
                </el-table-column>
                <el-table-column
                    prop="applyTime"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="实际起始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="实际结束时间">
                </el-table-column>
            </template>
        </table-template>
        <el-dialog :visible.sync="dialogVisible">
            <el-form ref="form" :model="form">
                <el-form-item label="请假人">
                    <el-input v-model="form.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.leaveType">
                        <el-option label="事假" value="事假"></el-option>
                        <el-option label="病假" value="事假"></el-option>
                        <el-option label="年假" value="事假"></el-option>
                        <el-option label="丧假" value="事假"></el-option>
                        <el-option label="产假" value="事假"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="原因">
                    <el-input type="textarea" v-model="form.reason"></el-input>
                </el-form-item>
                <el-form-item label="部门领导">
                    <el-select v-model="form.deptleader">
                        <el-option label="若依" value="admin"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddLeave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

// userId: admin
// leaveType: 事假
// startTime: 1899-11-27 06:30:00
// endTime: 2024-04-11 23:25:44
// reason: 123
// deptleader: admin
import TableTemplate from "@/components/TableTemplate";
import {getLeaveApplyList, addLeave} from "./api/leaveApply";

export default {
    name: "leaveApply",
    components: {
        TableTemplate
    },
    data() {
        return {
            responseData: {},
            dialogVisible: false,
            form: {
                userId: this.$store.state.user.name,
                leaveType: "事假",
                startTime: "",
                endTime: "",
                reason: "",
                deptleader: "admin"
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
        console.log("aaaaaaaaaaaaaaaaaaaaaaa", getLeaveApplyList);
        console.log(this.$store.state)
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
    methods: {
        handleAddLeave() {
            addLeave(this.form).then(res => {
                this.$message.success("添加成功!");
            });
        },
    }
};
</script>
