import Lots from './actors/lots';

export default {
    state: {
        lots: []
    },
    getters: {
        getLots: state => state.lots
    },
    mutations: {
        setLots(state, object) {
            state.lots = object.data;
        }
    },
    actions: {
        async setActiveLots({commit, state}) {
            commit('setLots', await Lots.getActiveLots());
        },
        async addLot({commit, state}, obj) {
            await Lots.addLot(obj)
        }
    }
}