import staffs from "@/store/actors/staffs";


export default {
    state: {
        staffs: []
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
        }
    }
}
