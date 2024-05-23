<template>
    <div class="c-time-line">
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
            >
                <el-card>
                    <h4>开始: {{activity.startTime}}</h4>
                    <p>{{activity.assignee}}: {{activity.taskName}}</p>
                    <p>{{activity.comment}}</p>
                    <h4>结束: {{activity.endTime}}</h4>
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
