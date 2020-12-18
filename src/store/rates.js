import Rates from "@/store/actors/rates";

export default {
    state: {
        activeUserRates: [],
        closedUserRates: []
    },
    getters: {
        getActiveUserRates: state => state.activeUserRates,
        getClosedUserRates: state => state.closedUserRates
    },
    mutations: {
        setActiveUserRates(state, obj) {
            state.activeUserRates = obj.data;
        },
        setClosedUserRates(state, obj) {
            state.closedUserRates = obj.data;
        }
    },
    actions: {
        async addRate({commit, state}, obj) {
            await Rates.addRate(obj)
        },
        async setRates({commit, state}, value) {
            commit('setActiveUserRates', await Rates.getActiveUserRates(value));
            commit('setClosedUserRates', await Rates.getClosedUserRates(value));
        }
    }
}