import Vue from 'vue';
import Vuex from 'vuex';
import users from "@/store/users";
import lots from "@/store/lots";
import statistics from "@/store/statistics";
import rates from "@/store/rates";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        users,
        lots,
        statistics,
        rates
    }
});

export default store;