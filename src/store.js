import Vue from 'vue';
import Vuex from 'vuex';

import memberRSO from "@/store/memberRSO";
import groups from "@/store/groups";
import staffs from "@/store/staffs";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        memberRSO,
        groups,
        staffs
    }
});

export default store;
