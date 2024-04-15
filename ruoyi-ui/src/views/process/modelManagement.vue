<template>
    <div class="c-model">
        <div class="c-model__bar">
            <el-row>
                <el-col :span="2">
                    模型标志：
                </el-col>
                <el-col :span="4">
                    <el-input></el-input>
                </el-col>
                <el-col :span="2">
                    模型名称：
                </el-col>
                <el-col :span="4">
                    <el-input></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="success">确定</el-button>
                    <el-button type="warning">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="c-model__content">
            <div class="c-model__tool">
                <el-button type="warning">新建模型</el-button>
            </div>
            <el-table
            style="width: 100%;"
            :data="tableData"
                >
                <el-table-column
                    prop="date"
                    label="模型标识"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="模型名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="分类">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="版本">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {getModelLists} from "./api/model.js";
export default {
    name: "ModelManagement",
    data() {
        return {
            tableData: []
        };
    },
    created() {
        const formData = new FormData();
        formData.set("pageSize", 10)
        formData.set("pageNum", 1)
        formData.set("orderByColumn", "modelSort")
        formData.set("isAsc", "asc")
        formData.set("key", "")
        formData.set("name", "")
        getModelLists(formData).then(res => {
            console.log("值是多少?", res);
        });
    },
};
</script>

<style scoped>
.c-model__bar {
    margin-bottom: 16px;
}
</style>