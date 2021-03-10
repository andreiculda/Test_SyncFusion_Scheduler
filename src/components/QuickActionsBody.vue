<template>
    <v-card
        elevation="0"
    >
        <v-card-text>
            <v-list>
                <!-- <v-subheader>Employee</v-subheader> -->
                <!-- <v-divider /> -->
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon
                            :size="18"
                            v-text="'mdi-account'"
                        />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ details.employee.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon
                            :size="18"
                            v-text="'mdi-cart'"
                        />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ details.department.department_name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <!-- <v-subheader>Shift Duration</v-subheader> -->
                <!-- <v-divider /> -->
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon
                            :size="18"
                            v-text="'mdi-clock-outline'"
                        />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ details.start }} - {{ details.end }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <template v-if="data.shift && data.shift.breaks.length">
                    <!-- <v-subheader>Breaks</v-subheader> -->
                    <!-- <v-divider /> -->
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon
                                :size="18"
                                v-text="'mdi-coffee'"
                            />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ data.shift.breaks[0].duration }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            data: {},
            eventData: null,
        }
    },
    computed: {
        scheduler () {
            return this.$parent.ej2Instances
        },
        isNew () {
            return this.data.elementType === 'cell'
        },
        style () {
            if (this.isNew && this.eventData) {
                return { 'background': this.eventData.department.color, 'color': '#FFFFFF' }
            } else if (!this.isNew) {
                return { 'background': this.data.department.color, 'color': '#FFFFFF' }
            }
            return {}
        },
        details () {
            if (this.isNew && this.eventData) {
                let { StartTime, EndTime } = this.eventData.data
                let { employee, department } = this.eventData
                let date = this.$moment(StartTime).longDayFormat()
                let start = this.$moment(StartTime).shortTime()
                let end = this.$moment(EndTime).shortTime()
                return { date, start, end, employee, department }
            } else if (!this.isNew) {
                let data = this.data
                let date = this.$moment(data.StartTime).longDayFormat()
                let start = this.$moment(data.StartTime).shortTime()
                let end = this.$moment(data.EndTime).shortTime()
                return { date, start, end, employee: data.employee, department: data.department }
            }
            return { start: null, end: null, date: null, employee: {}, department: {} }
        },
    },
    created () {
        this.$nextTick(() => {
            const eventData = document.querySelector('[data-event]')
            let dataString = eventData.getAttribute('data-event')
            this.eventData = JSON.parse(dataString.replaceAll('\'', '"'))
        })
    },
}
</script>

<style lang="scss" scoped>
.break-icon {
    vertical-align: 1px !important;
}
</style>
