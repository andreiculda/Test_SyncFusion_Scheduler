<template>
  <div id="app">
    <!-- <div>
      <v-btn
        :color="selectedDate.format('dddd') === $moment('2021-02-15').format('dddd') ? 'primary' : ''"
        elevation="2"
        outlined
        raised
        text
        @click="selectedDate = $moment('2021-02-15')"
      >
        {{$moment('2021-02-15').format('dddd')}}
      </v-btn>
      <v-btn
        :color="selectedDate.format('dddd') === $moment('2021-02-16').format('dddd') ? 'primary' : ''"
        elevation="2"
        outlined
        raised
        text
        @click="selectedDate = $moment('2021-02-16')"
      >
        {{$moment('2021-02-16').format('dddd')}}
      </v-btn>
    </div> -->
    <Scheduler
      :employees="employees"
      :departments="departments"
      :events="events"
      group-by="employees"
    />
  </div>
</template>

<script>
import Scheduler from "./components/Scheduler";
import employees from "./components/employees";
import departments from "./components/departments";
import events from "./components/events";

export default {
  name: "App",
  components: {
    Scheduler,
  },
  data() {
    return {
      selectedDate: this.$moment("2021-02-15"),
    };
  },
  computed: {
    employees() {
      return employees;
    },
    departments() {
      return departments;
    },
    events() {
      return events;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/tooltip.scss";
</style>
