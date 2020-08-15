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
            console.log('store => setUserAsAdmin')
            state.isAdmin = true
        },

        setUser(state, user) {
            console.log('store => setUser')
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
            console.log('store => updateSetting')
            state.settings.splice(index, 1, setting)
        },

        deleteSetting(state, index) {
            console.log('store => deleteSetting')
            state.settings.splice(index, 1)
        },

        setCurrentBookId(state, id) {
            console.log('store => setCurrentBookId', id)
            state.currentBookId = id
        },
    }
});

export default store;