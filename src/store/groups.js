import Groups from './actors/groups';

export default {
    state: {
        groups: []
    },
    getters: {
        getGroups: state => state.groups
    },
    mutations: {
        setGroups(state, object) {
            state.groups = object.data;
        }
    },
    actions: {
        async setAllGroups({commit, state}) {
            commit('setGroups', await Groups.getAllGroup());
        },
        async addGroup({commit, state}, obj) {
            await Groups.addGroup(obj)
        },
        async deleteGroup({commit, state}, value) {
            await Groups.deleteGroup(value);
        },

    }
}
