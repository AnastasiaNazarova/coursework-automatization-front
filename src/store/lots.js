import Lots from './actors/lots';

export default {
    state: {
        lots: [],
        activeUserLots: [],
        closedUserLots: []
    },
    getters: {
        getLots: state => state.lots,
        getActiveUserLots: state => state.activeUserLots,
        getClosedUserLots: state => state.closedUserLots
    },
    mutations: {
        setLots(state, object) {
            state.lots = object.data;
        },
        setActiveUserLots(state, value) {
            state.activeUserLots = value;
        },
        setClosedUserLots(state, value) {
            state.closedUserLots = value;
        }
    },
    actions: {
        async setActiveLots({commit, state}) {
            commit('setLots', await Lots.getActiveLots());
        },
        addLot({commit, state}, value) {
            state.lots.unshift(value);
        },
        addActiveUserLot({commit, state}, value) {
            const val = state.activeUserLots.find(item => item.name === value.name);
            if (val) {
                state.activeUserLots[state.activeUserLots.indexOf(val)].count = value.count
            } else {
                state.activeUserLots.push(value);
            }
        },
        deleteActiveUserLot({commit, state}, value) {
            const val = state.activeUserLots.find(item => item.name === value.name);
            if (val && val.count === 0) {
                state.activeUserLots.splice(state.activeUserLots.indexOf(val), 1);
            } else if (val) {
                state.activeUserLots[state.activeUserLots.indexOf(val)].count = value.count;
            }
        }
    }
}