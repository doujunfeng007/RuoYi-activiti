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
import {getProcesslists} from "./api/deployService";

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
            showAddDialog: false
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
