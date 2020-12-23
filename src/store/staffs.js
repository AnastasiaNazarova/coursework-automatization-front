import staffs from "@/store/actors/staffs";


export default {
    state: {
        staffs: [],

    },
    getters: {
        getStaffs: state => state.staffs
    },
    mutations: {
        setStaffs(state, object) {
            state.staffs = object.data;
        }
    },
    actions: {
        async setAllStaffs({commit, state}) {
            commit('setStaffs', await staffs.getAllStaffs());
        },
        async addStaff({commit, state}, obj) {
            await staffs.addStaff(obj)
        },

        async deleteStaff({commit, state}, value) {
            await staffs.deleteStaff(value);
        },

        async updateStaff({commit, state}, obj) {
            await staffs.updateStaff(value);
        },

    }
}
