import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    getNewCaseId: ""
  },
  mutations: {
    fetchNames: (state, names) => {
      state.getNewCaseId = names;
    }
  },
  actions: {}
});
