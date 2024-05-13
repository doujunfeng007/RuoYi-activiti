<template>
    <div>
        <div class="search-bar">
            <div>
                <label>会议主题:</label>
                <el-input type="text" v-model="searchParams.topic" />
            </div>
            <div>
                <label>主持人:</label>
                <el-input type="text" v-model="searchParams.host" />
            </div>
            <div>
                <label>会议地址:</label>
                <el-input type="text" v-model="searchParams.place" />
            </div>
            <div>
                <label>参会人员:</label>
                <el-input type="text" v-model="searchParams.peoplelist" />
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
            @selection-change="handleSelectionChange"
            @page-change="handlePageChange"
        >
            <template #toolbar>
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
                <el-button type="danger" :disabled="currentSelection.length === 0" @click="handleDelelteMultiple">删除</el-button>
                <el-button type="warning" @click="handleExport">导出</el-button>
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
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
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
                <el-form-item label="会议地址">
                    <el-input v-model="form.palce"></el-input>
                </el-form-item>
                <el-form-item label="参会人员">
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
import {getMeetingList, addMeeting, deleteMeeting, exportMeeting} from "./api/meeting";

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
            },
            searchParams: {
                pageNum: 1,
                pageSize: 10,
                topic: "",
                host: "",
                place: "",
                peoplelist: "",
            },
            currentSelection: [],
        };
    },
    computed: {
        tableData() {
            return this.responseData.rows || []
        },
        total() {
            return this.responseData.total || 0
        },
        selectionIds() {
            return this.currentSelection.map(item => item.id)
        }
    },
    mounted() {
        this.getMeetingListAndRender(this.searchParams);
    },
    methods: {
        getMeetingListAndRender(params) {
            const {pageNum = 1, pageSize = 10, topic, host, place, peoplelist} = params;
            getMeetingList({
                pageNum,
                pageSize,
                topic,
                host,
                place,
                peoplelist,
                isAsc: "asc"
            }).then(res => {
                this.responseData = res;
            });
        },
        handleAdd() {
            addMeeting(this.form).then(res => {
                this.dialogVisible = false;
                this.$message.success("添加成功");
                this.getMeetingListAndRender(this.searchParams);
            });
        },
        handleDelete(index, row) {
            this.$confirm('确定删除吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const {id} = row;
                this.deleteByIdsAndRender(id)
            });
        },
        handleDelelteMultiple() {
            this.$confirm(`确定删除选中的${this.currentSelection.length}条数据吗？`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const ids = this.selectionIds.join(",");
                this.deleteByIdsAndRender(ids)
            });
        },
        handleExport() {
            this.$confirm('确定导出所有数据吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                exportMeeting(this.searchParams)
            });
        },
        search() {
            this.getMeetingListAndRender(this.searchParams);
        },
        reset() {
            this.searchParams.topic = "";
            this.searchParams.host = "";
            this.searchParams.place = "";
            this.searchParams.peoplelist = "";
            this.getMeetingListAndRender(this.searchParams);
        },
        deleteByIdsAndRender(ids) {
            deleteMeeting({
                ids
            }).then(() => {
                this.$message("删除成功!")
                this.getMeetingListAndRender(this.searchParams);
            })
        },
        handleSelectionChange(selection) {
            this.currentSelection = selection;
        },
        handlePageChange({pageNum, pageSize}) {
            this.searchParams.pageNum = pageNum;
            this.searchParams.pageSize = pageSize;
            this.getMeetingListAndRender(this.searchParams);
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