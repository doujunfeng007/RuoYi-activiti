<template>
    <div class="c-model">
        <div class="c-model__bar">
            <el-row>
                <el-col :span="2">
                    模型标志：
                </el-col>
                <el-col :span="4" >
                    <el-input v-model="searchParams.key"></el-input>
                </el-col>
                <el-col :span="2">
                    模型名称：
                </el-col>
                <el-col :span="4">
                    <el-input v-model="searchParams.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" @click="search">确定</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="c-model__content">
            <table-template :data="tableData">
                <template #toolbar>
                    <el-button type="warning" @click="showAddDialog = true">新建模型</el-button>
                </template>
                <template #columns>
                    <el-table-column
                    prop="key"
                    label="模型标识"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="模型名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="分类">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本">
                </el-table-column>
                <el-table-column
                    width="320"
                    prop="lastUpdateTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="address"
                    width="320"
                    label="操作">
                    <template slot-scope="scope">
                        <!--primary / success / warning / danger / info / text-->
                        <el-button
                        size="mini"
                        type="warning"
                        @click="handleDesign(scope.$index, scope.row)">设计</el-button>
                        <el-button
                        v-if="!scope.row.deploymentId"
                        size="mini"
                        type="primary"
                        @click="handlePublish(scope.$index, scope.row)">发布</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        @click="handleExport(scope.$index, scope.row)">导出</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                </template>
            </table-template>
        </div>
        <el-dialog
            title="新建模型"
            :visible.sync="showAddDialog"
            width="30%"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标识模型">
                    <el-input v-model="form.key"></el-input>
                </el-form-item>
                <el-form-item label="模型名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleAddModel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getModelLists, addModel, publishModelById, deleteModelById} from "./api/model.js";
import commonHelper from "@/utils/common.js"
import TableTemplate from "@/components/TableTemplate";
export default {
    name: "ModelManagement",
    components: {
        TableTemplate
    },
    data() {
        return {
            responseData: {},
            showAddDialog: false,
            form: {
                key: "",
                name: "",
                category: "",
                description: "",
            },
            searchParams: {
                name: "",
                key: "",
                pageSize: 10,
                pageNum: 1,
                orderByColumn: "modelSort",
                isAsc: "asc",
            },
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
    created() {
        this.getModelByParams(this.searchParams);
    },
    methods: {
        getModelByParams(params) {
            getModelLists(params).then(res => {
                this.responseData = res;
            });
        },
        handleAddModel() {
            const formData = commonHelper.objectToFormData(this.form);
            addModel(formData).then(res => {
                console.log(res);
                this.showAddDialog = false;
                this.getModelByParams(this.searchParams)
                this.$message.success("添加成功!");
                ["key", "name", "category", "description"].forEach(key => {
                    this.form[key] = "";
                });
            });
        },
        handleDesign(index, row) {
            const path = "/editor?modelId=" + row.id;
            commonHelper.openWindow(path);
        },
        handlePublish(index, row) {
            const id = row.id;
            publishModelById(id).then(res => {
                this.$message.success("部署成功!");
            });
        },
        handleExport(index, row) {
            const {key ,id} = row;
            const a = document.createElement("a");
            a.href="/model/manage/export/" + id
            a.download = key + ".bpmn.xml";
            a.click();
        },
        handleDelete(index, row) {

            this.$confirm('确定删除该条模型信息吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const id = row.id;
                deleteModelById(id).then(res => {
                    this.$message.success("删除成功!");
                    this.getModelByParams(this.searchParams);
                 });
            });
           
        },
        search() {
            this.getModelByParams(this.searchParams);
        },
        reset() {
            this.searchParams.name = "";
            this.searchParams.key = "";
            this.getModelByParams(this.searchParams);
        },
        handlePageChange({pageNum, pageSize}) {
            this.searchParams.pageNum = pageNum;
            this.searchParams.pageSize = pageSize;
            this.getModelByParams(this.searchParams);
        },
    }
};
</script>

<style scoped>
.c-model {
    padding: 0 16px;
}
.c-model__bar {
    margin-bottom: 16px;
    line-height: 36px;
    margin-top: 16px;
}
.c-model__tool {
    margin-bottom: 8px;
}
</style>