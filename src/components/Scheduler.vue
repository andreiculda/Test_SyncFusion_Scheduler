<template>
  <div class="">
    <ejs-schedule
      id="Schedule"
      ref="scheduler"
      height="750px"
      width="auto"
      :allow-virtual-scrolling="true"
      :enable-load-on-demand="false"
      :selected-date="new Date(2021, 1, 15)"
      :current-view="currentView"
      :show-header-bar="true"
      :show-date-header="true"
      :event-settings="eventSettings"
      :quick-info-templates="quickInfoTemplates"
      :date-header-template="dateHeaderTemplate"
      :resource-header-template="resourceTemplate"
      :cell-template="cellTemplate"
      :resize-start="onResizeStart"
      :drag-start="onDragStart"
      :event-rendered="onEventRendered"
      :time-scale="timeScale"
      :work-hours="workHours"
      :action-begin="onActionBegin"
      :popup-open="onPopupOpen"
      :first-day-of-week="1"
      :row-auto-height="true"
      :start-hour="startTime"
      :end-hour="endTime"
      :group="group"
    >
      <e-views>
        <e-view v-for="(view, index) in views" :key="index" :option="view" />
      </e-views>
      <e-resources>
        <e-resource
          field="DepartmentId"
          title="Choose Project"
          name="Departments"
          :data-source="departmentList"
          :allow-multiple="false"
          text-field="text"
          id-field="id"
          color-field="color"
        />
        <e-resource
          field="EmployeeId"
          title="Employee"
          name="Employees"
          :data-source="employees"
          :allow-multiple="false"
          text-field="text"
          id-field="id"
          group-i-d-field="departmentId"
          color-field="color"
        />
      </e-resources>
    </ejs-schedule>
  </div>
</template>
<script>
// https://ej2.syncfusion.com/vue/documentation/schedule/getting-started/
// https://ej2.syncfusion.com/vue/demos/?_ga=2.183521254.1967771876.1613479136-518740739.1611842766#/material/schedule/dateheader-template.html
// https://codesandbox.io/s/vue-template-forked-jtbik?file=/src/App.vue
import Vue from "vue";
import {
  SchedulePlugin,
  TimelineViews,
  Resize,
  DragAndDrop,
  // eslint-disable-next-line no-unused-vars
  TimeScaleModel, // do not remove this
} from "@syncfusion/ej2-vue-schedule";
import QuickActionsHeader from "./QuickActionsHeader";
import QuickActionsBody from "./QuickActionsBody";
import QuickActionsFooter from "./QuickActionsFooter";
import EditorTemplate from "./EditorTemplate";
import EventTemplate from "./EventTemplate";
import MinorTemplate from "./MinorTemplate";
import MajorTemplate from "./MajorTemplate";
import DateHeaderTemplate from "./DateHeaderTemplate";
import ResourceTemplate from "./ResourceTemplate";
import CellTemplate from "./CellTemplate";
Vue.use(SchedulePlugin);
export default {
  name: "Scheduler",
  provide: {
    schedule: [TimelineViews, Resize, DragAndDrop],
  },
  props: {
    selectedDate: {
      type: Date,
      default: () => new Date(),
    },
    events: {
      type: Array,
      default: () => [],
    },
    departments: {
      type: Array,
      default: () => [],
    },
    employees: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: "timeline",
    },
    resizeStep: {
      type: Number,
      default: 15,
    },
    timeIntervalStep: {
      // the hour columns (where applicable) division. 60 means no division of time cells. 30 means 2 divisions, 15 means 4 divisions
      type: Number,
      default: 60,
    },
    timeIntervalSlotCount: {
      // how to divide the timeIntervalStep
      type: Number,
      default: 1,
    },
    startTime: {
      type: String,
      default: "00:00",
    },
    endTime: {
      type: String,
      default: "24:00",
    },
    groupBy: {
      type: String,
      default: "employees",
      validator: (value) => {
        return ["employees", "departments"].indexOf(value) !== -1;
      },
    },
  },
  data: function () {
    return {
      views: ["TimelineDay"],
      majorSlotTemplate: function (e) {
        return { template: MajorTemplate };
      },
      minorSlotTemplate: function (e) {
        return { template: MinorTemplate };
      },
      timeScale: {
        enable: true,
        interval: this.timeIntervalStep,
        slotCount: this.timeIntervalSlotCount,
      },
      workHours: {
        highlight: false,
        start: this.startTime,
        end: this.endTime,
      },
      disabledAddButton: false,
      disabledAddBreakButton: false,
      dateHeaderTemplate: function (e) {
        return { template: DateHeaderTemplate };
      },
      resourceTemplate: function (e) {
        return { template: ResourceTemplate };
      },
      cellTemplate: function (e) {
        return { template: CellTemplate };
      },
      eventSettings: {
        dataSource: this.events,
        template: function (e) {
          return {
            template: EventTemplate,
            props: {
              currentView: "TimelineDay",
            },
          };
        },
      },
    };
  },
  computed: {
    group() {
      // if (this.mode === 'week' || this.mode === 'month') return []
      let resources = [];
      if (this.groupBy === "departments") {
        resources.push("Departments");
        resources.push("Employees");
      }
      if (this.groupBy === "employees") {
        resources.push("Employees");
      }
      return {
        enableCompactView: true, // allows multiple events on the same resource to be displayed (removes the +n more element)
        resources,
      };
    },
    editorTemplate(e) {
      return {
        template: EditorTemplate,
      };
    },
    departmentList() {
      return this.departments.map((department) => {
        return {
          text: department.department_name,
          id: department.department_id,
          color: department.color,
        };
      });
    },
    currentView() {
      return `TimelineDay`;
    },
    quickInfoTemplates(e) {
      return {
        header: function () {
          return { template: QuickActionsHeader };
        },
        content: function () {
          return { template: QuickActionsBody };
        },
        footer: function () {
          return { template: QuickActionsFooter };
        },
      };
    },
    scheduler() {
      return this.$refs.scheduler.ej2Instances;
    },
  },
  mounted() {
    this.scheduler.timeScale.majorSlotTemplate = this.majorSlotTemplate;
    this.scheduler.timeScale.minorSlotTemplate = this.minorSlotTemplate;
    this.scheduler.dataBind();
  },
  unmounted() {
    this.scheduler.destroy();
  },
  methods: {
    /**
     * bellow can be used to horizontally scroll the grid into the desired day
     * this can be used to only load the week timeline view and then when day nuttons are clicked,
     * scroll the grid to the desired day
     */
    scrollToDay(day) {
      let id = `${day.apiFormat()} 00:00:00_0_cell`; // CellTemplate.vue first cell of provided day
      let cellElement = document.getElementById(id);
      let grid = document.getElementsByClassName("e-content-wrap")[0];
      grid.scrollLeft =
        cellElement.parentNode.getBoundingClientRect().left - 200;
    },
    addAvailability(availabilities) {
      // let template = [
      //     {
      //         Id: 71621,
      //         Subject: 'Availability',
      //         StartTime: new Date(2021, 1, 21, 9, 0, 0),
      //         EndTime: new Date(2021, 1, 21, 16, 0, 0),
      //         IsAllDay: false,
      //         DepartmentId: 107,
      //         EmployeeId: 71621,
      //         class: 'availability-preferred',
      //     },
      //     {
      //         Id: 71621,
      //         Subject: 'Availability',
      //         StartTime: new Date(2021, 1, 21, 16, 0, 0),
      //         EndTime: new Date(2021, 1, 21, 17, 0, 0),
      //         IsAllDay: false,
      //         DepartmentId: 107,
      //         EmployeeId: 71621,
      //         class: 'availability-school',
      //     },
      // ]
      this.$refs.scheduler.addEvent(availabilities);
    },
    onResizeStart(args) {
      // how resizing an event increments by minutes
      args.interval = this.resizeStep;
    },
    onDragStart(args) {
      // how resizing an event increments by minutes
      args.interval = this.resizeStep;
    },
    onEventRendered(args) {
      if (
        this.currentView.includes("Week") ||
        this.currentView.includes("Day")
      ) {
        if (args.data.class.includes("availability")) {
          args.element.style.minHeight = "8px";
          args.element.style.height = "8px";
          args.element.style.top =
            parseInt(args.element.style.top.replace("px", "")) + 50 + "px";
          args.element.pointerEvents = "none";
        }
        if (args.data.class === "availability-preferred") {
          args.element.style.backgroundColor = "rgb(0 148 50)";
        }
        if (args.data.class === "availability-school") {
          args.element.style.backgroundColor = "#ED4C67";
        }
      }
    },
    onActionBegin(args) {
      console.log(args.requestType);
      console.log(this.scheduler);
      if (args.requestType === "eventCreate") {
        let data =
          args.requestType === "eventChange" ? args.data : args.data[0];
        let employee = this.employees.find(
          (employee) => employee.account_id === parseInt(data.EmployeeId)
        );
        let department = this.departments.find(
          (dep) =>
            dep.department_id ===
            employee.departments.find((empDep) => empDep.is_default).id
        );
        let newEvent = [
          {
            Id: parseInt(data.EmployeeId),
            Subject: employee.name,
            StartTime: this.$moment(data.StartTime).toDate(),
            EndTime: this.$moment(data.EndTime).toDate(),
            IsAllDay: false,
            DepartmentId: parseInt(department.department_id),
            EmployeeId: parseInt(data.EmployeeId),
            color: "#E2E4E9",
            mainColor: department ? department.color : "#E2E4E9",
            class: "",
            department,
            employee,
          },
        ];
        args.addedRecords = newEvent;
        args.data = newEvent;
      }
    },
    onPopupOpen(args) {
      let employee = this.employees.find(
        (employee) => employee.account_id === parseInt(args.data.EmployeeId)
      );
      if (employee) {
        let department = this.departments.find(
          (dep) =>
            dep.department_id ===
            employee.departments.find((empDep) => empDep.is_default).id
        );
        if (args.type === "QuickInfo") {
          // this is just a hack
          // need to research how to pass employee and department to the new event action
          var currentAction = args.target.classList.contains("e-work-cells")
            ? "Add"
            : "Save";
          let event = JSON.stringify({
            data: args.data,
            department,
            employee,
          }).replaceAll('"', "'");
          if (currentAction === "Add") {
            let eventNode = document.getElementById("new-event-details");
            if (!eventNode) {
              eventNode = document.createElement("span");
            }
            eventNode.style.display = "none";
            eventNode.setAttribute("id", "new-event-details");
            eventNode.setAttribute("data-event", event);
            document.body.appendChild(eventNode);
          }
        }
      }
    },
    deleteEvent(event) {
      this.scheduler.deleteEvent(event.Id);
    },
    editEvent(event) {
      this.scheduler.openEditor(event, "Save");
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/_colors.scss";
.schedule-vue-sample
  .e-schedule:not(.e-device)
  .e-agenda-view
  .e-content-wrap
  table
  td:first-child {
  width: 120px;
}

.schedule-vue-sample .e-schedule .e-agenda-view .e-resource-column {
  width: 100px;
}
.e-schedule .e-timeline-view .e-appointment,
.e-schedule .e-timeline-month-view .e-appointment {
  min-height: 40px;
}

.e-appointment:not(:focus) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.e-appointment-details {
  display: block !important;
}

.e-schedule .e-timeline-view .e-date-header-wrap table td.e-current-day,
.e-schedule .e-timeline-month-view .e-date-header-wrap table td.e-current-day,
.e-schedule .e-timeline-view .e-clone-time-indicator,
.e-schedule .e-timeline-view .e-current-time {
  color: $primary-color !important;
}
.e-current-timeline {
  border-left: 1px solid $primary-color !important;
}
.e-control,
.e-css {
  font-family: inherit !important;
}
.e-quick-popup-wrapper {
  color: inherit;
}
.e-quick-popup-wrapper .e-cell-popup .e-popup-content {
  padding: 0;
}
.e-schedule .e-timeline-view .e-resource-tree-icon,
.e-schedule .e-timeline-month-view .e-resource-tree-icon {
  padding: 7px 7px;
  line-height: normal;
}
.disabled-time {
  background-color: lighten($border-color, 2.5%) !important;
  pointer-events: none;
}
</style>
