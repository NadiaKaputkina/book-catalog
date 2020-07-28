import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAdmin: false,
        user: null
    },

    mutations: {
        setUserAsAdmin (state) {
            state.isAdmin = true
        },

        setUser(state, user) {
            state.isAdmin = false
            if (!user) {
                state.user = null
            } else {
                state.user = user
            }
        }
    }
});

export default store;