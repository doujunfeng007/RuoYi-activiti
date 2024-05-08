<template>
    <div>
        <div class="search-bar">
            <div>
                <label>流程标识:</label>
                <el-input v-model="searchParams.key"></el-input>
            </div>
            <div>
                <label>流程名称:</label>
                <el-input v-model="searchParams.name"></el-input>
            </div>
            <div>
                <label>版本:</label>
                <el-select v-model="searchParams.latest">
                    <el-option label="只看新版本" value="true"></el-option>
                    <el-option label="全部版本" value="false"></el-option>
                </el-select>
            </div>
            <div>
                <el-button type="success" @click="search">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </div>
        </div>
        <table-template :data="tableData" :total="total" @page-change="handlePageChange">
            <template #toolbar>
                <el-button type="primary" @click="showAddDialog = true">部署</el-button>
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
                <el-table-column
                    prop="version"
                    width="200"
                    label="详情">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="warning"
                        @click="handleDefinition(scope.$index, scope.row)">查看定义</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleProcess(scope.$index, scope.row)">流程图</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="操作"
                    width="320"
                >
                    <template slot-scope="scope">
                        <el-button
                        v-if="scope.row.suspended"
                        size="mini"
                        type="success"
                        @click="handleDesign(scope.$index, scope.row)">激活</el-button>
                        <el-button
                        v-if="!scope.row.suspended"
                        size="mini"
                        type="primary"
                        @click="handleDesign(scope.$index, scope.row)">挂起</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleExchange(scope.$index, scope.row)">转为模型</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </template>
        </table-template>
        <el-dialog
             title="上传部署文件"
            :visible.sync="showAddDialog"
            width="30%"
        >
            <el-upload
                class="upload-demo"
                action="/dev-api/flow/manage/uploadworkflow"
                name="uploadfile"
                :file-list="fileList"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">提示：仅允许导入“bpmn”、“xml”或“zip”格式文件！</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="showAddDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import {getProcesslists, exchangeById, deleteProcessByDeployId} from "./api/deployService";
import commonHelper from "@/utils/common.js"

export default {
    name: "deployManagement",
    components: {
        TableTemplate
    },
    data() {
        return {
            responseData: {},
            searchParams: {
                key: "",
                name: "",
                latest: "true",
                orderByColumn: "processSort",
                isAsc: "asc",
                pageNum: 1,
                pageSize: 10
            },
            showAddDialog: false,
            fileList: []
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
        this.getListAndRenderByParams(this.searchParams)
    },
    methods: {
        handlePageChange({pageNum, pageSize}) {
            this.searchParams.pageNum = pageNum;
            this.searchParams.pageSize = pageSize;
            this.getListAndRenderByParams(this.searchParams);
        },
        getListAndRenderByParams(params) {
            getProcesslists(params).then(res => {
                console.log("拿到processList", res);
                this.responseData = res;
            });
        },
        search() {
            getProcesslists(this.searchParams).then(res => {
                console.log("拿到processList", res);
                this.responseData = res;
            });
        },
        reset() {
            this.searchParams.key = "";
            this.searchParams.name = "";
            this.searchParams.latest = "true";
            getProcesslists(this.searchParams).then(res => {
                console.log("拿到processList", res);
                this.responseData = res;
            });
        },
        handleDefinition(index, row) {
            const {deploymentId, key} = row;
            const path = `/flow/manage/showProcessDefinition/${deploymentId}/${key}.bpmn20.xml`
            commonHelper.openWindow(path);
        },
        handleProcess(index, row) {
            const {id} = row;
            const path = `/flow/manage/showresource?pdid=${id}`;
            commonHelper.openWindow(path);
        },
        handleExchange(index, row) {
            const {id} = row;
            exchangeById(id).then(res => {
                this.$message.success("转化成功!")
            });
        },
        handleDelete(index, row) {
            this.$confirm('确定删除该条流程信息吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const {deploymentId} = row;
                deleteProcessByDeployId(deploymentId).then(res => {
                    this.$message.success("删除成功!");
                    this.getProcesslists(this.searchParams);
                 });
            });
        }
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
