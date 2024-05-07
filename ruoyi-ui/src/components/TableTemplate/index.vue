<template>
    <div class="c-table-template">
        <div class="c-table-template__toolbar">
            <slot name="toolbar"></slot>
        </div>
        <div class="c-table-template__content">
            <el-table :data="data">
                <slot name="columns"></slot>
            </el-table>
        </div>
       <div class="c-table-template__footer">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :page-sizes="[10, 25, 50]"
            :total="total">
        </el-pagination>
       </div>
    </div>
</template>

<script>
export default {
    name: "TableTemplate",
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        fetchData: {
            type: Function,
            default: () => ([])
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentPageSize: 10
        };
    },
    methods: {
        handleSizeChange(pageSize) {
            this.currentPageSize = pageSize;
            this.$emit("page-change", {
                pageNum: 1,
                pageSize
            })

        },
        handleCurrentChange(pageNum) {
            this.$emit("page-change", {
                pageNum,
                pageSize: this.pageSize
            })
        }
    }
};
</script>

<style scoped>
.c-table-template {
    padding: 8px;
}
.c-table-template__toolbar {
    margin-bottom: 8px;
}
.c-table-template__footer {
    margin-top: 8px;
}
</style>
