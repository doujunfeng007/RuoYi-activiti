<template>
    <div class="c-time-line">
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
            >
                <el-card>
                    <div class="c-time-line__paragraph">开始: {{activity.startTime}}</div>
                    <div class="c-time-line__paragraph">{{activity.assignee}}: {{activity.taskName}}</div>
                    <div class="c-time-line__paragraph">{{activity.comment}}</div>
                    <div class="c-time-line__paragraph">结束: {{activity.endTime}}</div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>


// taskName: "采购经理审批"
// assignee: "admin"
// startTime: "2024-04-28 23:51:04"
// processInstanceId: "7529"
export default {
    name: "TimeLine",
    props: {
        activities: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>

<style>

.el-card__body {
    padding-top: 8px;
    padding-bottom: 8px;
}
.el-timeline-item {
    padding-bottom: 0px;
}
.c-time-line__paragraph {
    margin-bottom: 4px;
}
</style>
