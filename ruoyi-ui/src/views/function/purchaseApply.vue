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
                    prop="itemlist"
                    label="采购清单">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="总价">
                </el-table-column>
                <el-table-column
                    prop="applytime"
                    label="申请时间">
                </el-table-column>
                <el-table-column
                    prop="applyer"
                    label="申请人">
                </el-table-column>
            </template>
        </table-template>
        <el-dialog :visible.sync="dialogVisible">
            <el-form ref="form" :model="form">
                <el-form-item label="采购清单">
                    <el-input type="textarea" v-model="form.itemlist"></el-input>
                </el-form-item>
                <el-form-item label="总价">
                    <el-input type="text" v-model="form.total"></el-input>
                </el-form-item>
                <el-form-item label="申请人">
                    <el-input type="text" v-model="form.applyer" disabled></el-input>
                </el-form-item>
                <el-form-item label="采购经理">
                    <el-select v-model="form.purchasemanager">
                        <el-option label="若依" value="admin"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="财务">
                    <el-select v-model="form.finance">
                        <el-option label="若依" value="admin"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出纳">
                    <el-select v-model="form.pay">
                        <el-option label="若依" value="admin"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总经理">
                    <el-select v-model="form.manager">
                        <el-option label="若依" value="admin"></el-option>
                    </el-select>
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
import {getPurchaseApplyList, addPurchase} from "./api/purchase.js";

// itemlist: 笔
// total: 100
// applyer: admin
// purchasemanager: admin
// finance: admin
// pay: admin
// manager: admin
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
                itemlist: "笔",
                total: "100",
                applyer: this.$store.state.user.name,
                purchasemanager: "admin",
                finance: "admin",
                pay: "admin",
                manager: "admin",
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
        getPurchaseApplyList({
            pageSize: 10,
            pageNum: 1,
            isAsc: "asc",
            leaveType: "",
        }).then(res => {
            this.responseData = res;
        });
    },
    methods: {
        handleAdd() {
            addPurchase(this.form).then(res => {
                this.$message.success("添加成功!");
            });
        },
    }
};
</script>