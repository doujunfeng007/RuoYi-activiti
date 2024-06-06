<template>
    <div class="c-purchase-form">
        <el-form  ref="form" :model="form" label-width="100px">
            <el-form-item label="申请人">
                <el-input v-model="form.applyer" :disabled="canNotEdit"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-input v-model="form.applytime" :disabled="canNotEdit">></el-input>
            </el-form-item>
            <el-form-item label="采购清单">
                <el-input v-model="form.itemlist" :disabled="canNotEdit">></el-input>
            </el-form-item>
            <el-form-item label="总价">
                <el-input v-model="form.total" :disabled="canNotEdit">></el-input>
            </el-form-item>
            <template v-if="step === 'finance' || step === 'purchasemanager'">
                <el-form-item label="审批结果">
                    <el-radio-group v-model="form.result">
                        <el-radio label="true">同意</el-radio>
                        <el-radio label="false">拒绝</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审批意见">
                    <el-input type="textarea" v-model="form.comment"></el-input>
                </el-form-item>
            </template>
            <el-form-item label="是否重新申请" v-if="step==='updateapply'">
                <el-radio-group v-model="form.updateapply">
                    <el-radio label="true">是</el-radio>
                    <el-radio label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


const keyMap = {
    purchasemanager: "purchaseauditi",
    finance: "finance",
    pay: "pay",
    receiveitem: "receiveitem",
    // 拒绝后，申请人重新申请
    updateapply: "updateapply"
};
export default {
    props: {
        step: {
            type: String,
            default: ""
        },
        formInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            form: {
                updateapply: "true",
                result: "true",
                applyer: "",
                applytime: "",
                itemlist: "",
                total: ""
            }
        };
    },
    watch: {
        formInfo(newFormValue) {
            this.form.applyer = newFormValue.applyer;
            this.form.applytime = newFormValue.applytime;
            this.form.itemlist = newFormValue.itemlist;
            this.form.total = newFormValue.total;
        }
    },
    computed: {
        canNotEdit() {
            return this.step !== "updateapply";
        }
    },
    methods: {
        onSubmit() {
            this.$emit("submit", {
                comment: this.form.comment,
                [keyMap[this.step]]: this.form.result,
                updateapply: this.form.updateapply
            })
        }
    }
};
</script>
