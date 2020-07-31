import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAdmin: false,
        user: null,
        settings: []
    },

    mutations: {
        setUserAsAdmin(state) {
            state.isAdmin = true
        },

        setUser(state, user) {
            state.isAdmin = false;
            if (!user) {
                state.user = null
            } else {
                state.user = user
            }
        },

        setSettings(state, settings) {
            state.settings = settings
        },

        updateSetting(state, index, setting) {
            state.settings.splice(index, 1, setting)
        },

        deleteSetting(state, index) {
            state.settings.splice(index, 1)
        }
    }
});

export default store;