<template>
    <div>
        <table-template>
            <template slot="toolbar">
                <el-button type="primary">部署</el-button>
            </template>
            <template slot="clomns">
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </template>
        </table-template>
    </div>
</template>

<script>
import TableTemplate from "@/components/TableTemplate";
import deployService from "./api/deployService";

export default {
    name: "deployManagement",
    components: {
        TableTemplate
    }
};
</script>
