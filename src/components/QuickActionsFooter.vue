<template>
    <div
        v-if="eventData"
        class="quick-info-header"
        @keyup.enter="addEvent"
    >
        <button
            ref="addBtn"
            normal
            medium
            icon="plus"
            auto-focus
            tab-index="0"
            :style="{backgroundColor: eventData.department.color, color: 'white'}"
            @click="addEvent"
        >
            Add schedule
        </button>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            data: {},
            eventData: undefined,
        }
    },
    computed: {
        scheduler () {
            return this.$parent.ej2Instances
        },
        isNew () {
            return this.data.elementType === 'cell'
        },
    },
    created () {
        this.$nextTick(() => {
            const eventData = document.querySelector('[data-event]')
            let dataString = eventData.getAttribute('data-event')
            this.eventData = JSON.parse(dataString.replaceAll('\'', '"'))
        })
    },
    methods: {
        addEvent () {
            let employee = this.eventData.employee
            let department = this.eventData.department
            let event = {
                Id: parseInt(employee.account_id) + '_' + 1,
                Subject: employee.name,
                StartTime: this.$moment(this.data.StartTime).toDate(),
                EndTime: this.$moment(this.data.EndTime).toDate(),
                IsAllDay: false,
                DepartmentId: parseInt(department.department_id),
                EmployeeId: parseInt(employee.account_id),
                color: '#E2E4E9',
                mainColor: department ? department.color : '#E2E4E9',
                class: '',
                department,
                employee,
            }
            this.scheduler.addEvent(event)
            this.scheduler.closeQuickInfoPopup()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
