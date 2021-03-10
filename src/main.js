// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
import momentLib from './config/moment'
import vuetify from './config/vuetify'
Vue.use(momentLib)

VTooltip.options.autoHide = false
VTooltip.options.defaultTrigger = 'click hover focus'
Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('VPopover', VPopover)

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: "#app",
  router,
  vuetify,
  components: { App },
  template: "<App/>"
});
