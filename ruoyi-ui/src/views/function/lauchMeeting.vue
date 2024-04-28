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
                    prop="topic"
                    label="会议主题">
                </el-table-column>
                <el-table-column
                    prop="host"
                    label="主持人">
                </el-table-column>
                <el-table-column
                    prop="place"
                    label="会议地址">
                </el-table-column>
                <el-table-column
                    prop="peoplelist"
                    label="参会人员">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间">
                </el-table-column>
            </template>
        </table-template>
        <el-dialog :visible.sync="dialogVisible">
            <el-form ref="form" :model="form">
                <el-form-item label="会议主题">
                    <el-input v-model="form.topic"></el-input>
                </el-form-item>
                <el-form-item label="主持人">
                    <el-input v-model="form.host" disabled></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="form.peoplelist"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getMeetingList, addMeeting} from "./api/meeting";

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
                topic: "11111",
                host: this.$store.state.user.name,
                place: "111",
                peoplelist: "111111",
                startTime: "2024-04-01 01:55:14",
                endTime: "2024-04-03 05:55:14"
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
        getMeetingList({
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
        handleAdd() {
            addMeeting(this.form).then(res => {
                this.dialogVisible = false;
                this.$message.success("添加成功");
            });
        }
    }
};
</script>