import Users from "@/store/actors/users";

export default {
    state: {
        isAuth: false,
        userInfo: null
    },
    getters: {
        getIsAuth: state => state.isAuth,
        getUserInfo: state => state.userInfo
    },
    mutations: {
        setIsAuth(state, value) {
            state.isAuth = value;
            sessionStorage.setItem('isAuth', value)
        },
        setUserInfo(state, value) {
            state.userInfo = value;
            sessionStorage.setItem('userInfo', JSON.stringify(value))
        }
    },
    actions: {
        async registrationUser({commit, state}, obj) {
            await Users.registrationUser(obj);
        },
        async loginUser({commit, state}, obj) {
            await Users.loginUser(obj).then(response => {
                console.log(response)
                if (response.status === 200 && response.data) {
                    commit('setIsAuth', true);
                    commit('setUserInfo', response.data)
                }
            })
        },
        logoutUser({commit, state}) {
            commit('setIsAuth', false);
            commit('setUserInfo', null);
        }
    }
}