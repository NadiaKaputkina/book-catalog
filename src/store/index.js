import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAdmin: false,
        user: null,
        settings: [],

        currentBookId: '',
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
            console.log('store => setSettings')
            state.settings = settings
        },

        updateSetting(state, index, setting) {
            state.settings.splice(index, 1, setting)
        },

        deleteSetting(state, index) {
            state.settings.splice(index, 1)
        },

        setCurrentBookId(state, id) {
            state.currentBookId = id
        }
    }
});

export default store;