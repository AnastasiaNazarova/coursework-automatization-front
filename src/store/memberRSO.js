import MemberRSO from './actors/memberRSO';


export default {
    state: {
        memberRSO: []
    },
    getters: {
        getMemberRSO: state => state.memberRSO
    },
    mutations: {
        setMemberRSO(state, object) {
            state.memberRSO = object.data;
        }
    },
    actions: {
        async setAllMemberRSO({commit, state}) {
            commit('setMemberRSO', await MemberRSO.getAllMemberRSO());
        },
        async addMemberRSO({commit, state}, obj) {
            await MemberRSO.addMemberRSO(obj)
        },
        async deleteMemberRSO({commit, state}, value) {
            await MemberRSO.deleteMemberRSO(value);
        },
        async updateMemberRSO({commit, state}, obj) {
            await MemberRSO.updateMemberRSO(obj)
        },
    }

}
