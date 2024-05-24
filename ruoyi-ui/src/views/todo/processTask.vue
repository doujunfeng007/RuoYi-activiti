<template>
    <div class="c-process-task">
        <div class="c-process-task__form">
            <leave-apply-form
                v-if="taskType === 'leaveapply'"
                :step="step"
                @submit="handleSubmit"
                @cancel="handleCancel"
                @reject="handleReject"
            ></leave-apply-form>
            <purchase-form
                v-if="taskType === 'purchase'"
                :step="step"
                @submit="handleSubmit"
            ></purchase-form>
            <meeting-form
                v-if="taskType === 'meeting'"
                :step="step"
                @submit="handleSubmit"
            ></meeting-form>
        </div>
        <div>
            <time-line :activities="activities"></time-line>
        </div>
    </div>
</template>

<script>
import {
    getProcessByTaskid,
    processTask,
    fillMeetingRecord,
    checkoutLeave,
    forceEnd,
    rejectLeave,
    updatePurchase
} from "./api/myTodoList";
import TimeLine from './components/TimeLine.vue';

import leaveApplyForm from './components/leaveApplyForm.vue';
import meetingForm from './components/meetingForm.vue';
import purchaseForm from './components/purchaseForm.vue';
import LeaveApply from '../function/leaveApply.vue';

export default {
    components: {
        TimeLine,
        leaveApplyForm,
        meetingForm,
        purchaseForm,
        LeaveApply
    },
    data() {
        return {
            activities: [],
            taskType: "",
            step: "",
            taskId: ""
        };
    },
    mounted() {
        console.log("待办", this.$route.params)
        const {taskId, taskType, step} = this.$route.params;
        this.taskId = taskId;
        this.taskType = taskType;
        this.step = step;
        getProcessByTaskid(taskId).then(res => {
            console.log("拿到流程信息", res);
            this.activities = res;
        });
    },
    methods: {
        handleSubmit(data) {
            console.log(data);
            if (this.taskType === "meeting") {
                if (this.step === "input") {
                    const id = this.$route.query.id;
                    const {content} = data;
                    console.log(id);
                    fillMeetingRecord({
                        id,
                        content
                    }).then(res => {
                        console.log("审批通过!");
                    });
                }
            }
     
            if (this.taskType === "leaveapply") {
                if (
                    this.step === "destroyapply"
                    || this.step === "addLeave"
                    || this.step === "modifyapply"
                ) {
                    const {realityStartTime, realityEndTime, reapply} = data;
                    const id = this.$route.query.id;
                    const taskId = this.taskId;
                    checkoutLeave({
                        id,
                        taskId,
                        realityEndTime,
                        realityStartTime,
                        reapply
                    }).then(res => {
                        console.log("销假成功！");
                    });
                }
            }

            if (this.taskType === "purchase") {
                if ( this.step === "updateapply") {
                    updatePurchase(data).then(res => {
                        console.log("更新成功!");
                    });
                }
            }
           

            processTask({
                taskId: this.taskId,
                ...data
            }).then(res => {
                console.log("审批通过!");
            });
        },
        handleCancel() {
            forceEnd(this.taskId).then(res => {
                console.log("撤销成功");
            });
        },
        handleReject() {
            rejectLeave(this.taskId).then(res => {
                console.log("驳回成功!");
            })
        },
    }
};
</script>

<style scoped>
.c-process-task {
    padding: 16px;
    display: flex;
}
.c-process-task__form {
    width: 500px;
}
</style>
