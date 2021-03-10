<template>
    <div
        ref="event"
        v-tooltip="tooltip"
        :class="data.class"
        @contextmenu="show"
    >
        <template v-for="(breakItem, index) in data.breaks">
            <div
                :key="index"
                v-tooltip="`Break ${breakItem.from} - ${breakItem.to}`"
                class="break"
                :style="breakStyles[index]"
            />
        </template>
        <div
            v-if="data.Subject !== 'Empty Shift' && (!data.class || !data.class.includes('availability'))"
            v-tooltip="shiftTooltip"
            class="template-wrap"
            :style="style"
        >
            <div class="details elevation-1">
                <span
                    class="time"
                >
                    {{ start }} - {{ end }}
                </span>
                <span
                    class="department"
                >
                    <small v-if="data.department"> / {{ data.department.department_shortname }}</small>
                    <!-- Uncomment to show break time -->
                    <!-- <span v-if="data.shift.breaks.length">
                        / <coffee
                            :size="14"
                            class="break-icon"
                        />
                        {{ data.shift.breaks[0].duration }}
                    </span> -->
                </span>
            </div>
        </div>
        <div
            v-else-if="!data.class || !data.class.includes('availability')"
            class="empty"
        >
            Not assigned
        </div>
        <div v-else>
            availability
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'SchedulerEvent',
    data () {
        return {
            data: {},
            eventBorder: 0,
            breakStyles: [],
        }
    },
    computed: {
        style () {
            return {
                // padding: '3px',
                borderLeft: `${this.eventBorder}px solid ${this.data.mainColor}`,
                position: 'absolute',
                height: '100%',
            }
        },
        start () {
            return this.$moment(this.data.StartTime).shortTime()
        },
        end () {
            return this.$moment(this.data.EndTime).shortTime()
        },
        tooltip () {
            if (this.data.class === 'availability-preferred') {
                return `Employee Preferred Availability ${this.start} - ${this.end}`
            }
            if (this.data.class === 'availability-school') {
                return `Employee School Availability ${this.start} - ${this.end}`
            }
            return ''
        },
        shiftTooltip () {
            return `${this.data.Subject}` // / ${this.data.department.department_name}`
        },
        eventMinutes () {
            return this.$moment.duration(this.$moment(this.data.EndTime).diff(this.$moment(this.data.StartTime))).asMinutes()
        },
        eventPixelsPerMinute () {
            let eventPositionn = this.$el.getBoundingClientRect()
            return eventPositionn.width / this.eventMinutes
        },
        getBreakStyle () {
            return breakItem => {
                this.$nextTick(() => {
                    let breakDuration = this.breakDuration(breakItem)
                    let result = {
                        width: (this.eventPixelsPerMinute * breakDuration) + 'px',
                        left: (this.eventPixelsPerMinute * this.breakOffsetMinutesFromEventStart(breakItem) + (this.eventBorder + 5)) + 'px',
                    }
                    return result
                })
            }
        },
    },
    mounted () {
        this.$nextTick(() => {
            if (this.data.breaks) {
                this.data.breaks.forEach(breakItem => {
                    let breakDuration = this.breakDuration(breakItem)
                    let result = {
                        width: (this.eventPixelsPerMinute * breakDuration) + 'px',
                        left: (this.eventPixelsPerMinute * this.breakOffsetMinutesFromEventStart(breakItem) + (5)) + 'px',
                    }
                    this.breakStyles.push(result)
                    return result
                })
            }
            if (this.$refs.event) {
                this.$refs.event.parentNode.parentNode.firstChild.style.backgroundColor = this.data.mainColor
                this.$refs.event.parentNode.parentNode.firstChild.style.width = '5px'
                // console.log(this.$refs.event.parentNode.parentNode.firstChild.style.backgroundColor = this.data.mainColor)
            }
        })
    },
    methods: {
        ...mapMutations('scheduler', ['SET_ACTIVE_CONTEXT_MENU']),
        breakDuration (breakItem) {
            return this.$moment.duration(this.$moment().setTime(breakItem.to).diff(this.$moment().setTime(breakItem.from))).asMinutes()
        },
        breakOffsetMinutesFromEventStart (breakItem) {
            let start = this.$moment(this.data.StartTime)
            let end = start.clone().setTime(breakItem.from)
            return this.$moment.duration(end.diff(start)).asMinutes()
        },
        getTimeString (value) {
            return this.$moment(value).shortTime()
        },
        show (e) {
            e.preventDefault()
            this.SET_ACTIVE_CONTEXT_MENU(null)
            this.SET_ACTIVE_CONTEXT_MENU({ data: this.data, x: e.clientX, y: e.clientY })
            // this.$nextTick(() => {
            //     this.SET_ACTIVE_CONTEXT_MENU({ data: this.data, x: e.clientX, y: e.clientY })
            // })
        },
    },
}
</script>

<style lang="scss" scoped>
    .break {
        // width: 55px;
        background-color: red;
        height: 100%;
        position: absolute;
        //left: 287px;
        background: repeating-linear-gradient(
            0deg,
            #ffffff,
            #ffffff 5px,
            #a5a3a3  5px,
            #a5a3a3  9px
        );
    }
    .break-icon {
        vertical-align: 1px !important;
    }
    .empty {
        color: #667780;
    }
    .details {
        // background-color: white;
        // color: #667780;
        // border-radius: 3px;
        // padding: 0px 12px;
        // margin-left: 16px;
        background-color: white;
        color: #667780;
        font-weight: 600;
        border-radius: 2px;
        padding: 3px 12px 3px 12px;
        margin-left: 16px;
        height: 20px;
        margin-top: 9px;
        margin-bottom: 9px;
        line-height: initial;
        .department {
            font-weight: 400;
        }
    }
</style>
