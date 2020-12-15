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
        },
        setUserInfo(state, value) {
            state.userInfo = value
        }
    },
    actions: {}
}