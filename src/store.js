import Vue from 'vue';
import Vuex from 'vuex';
import users from "@/store/users";
import lots from "@/store/lots";
import statistics from "@/store/statistics";
import rates from "@/store/rates";
import memberRSO from "@/store/memberRSO";
import groups from "@/store/groups";
import staffs from "@/store/staffs";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        users,
        lots,
        statistics,
        rates,
        memberRSO,
        groups,
        staffs
    }
});

export default store;
