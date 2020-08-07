import Vue from 'vue'
import router from './router'
import store from './store'

import './public/bootstrap/bootstrap.css'

import { initFirebase } from "./config/firebase.js";
import { initAuthListener } from './js/auth.js';
import { getAllDataFromDB } from './js/db.js';

import App from './App.vue'

/*
import { addDocsToDB } from './js/db.js';
import { DEFAULT_SETTINGS } from './js/constants.js'
*/

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        initFirebase();
        initAuthListener();

        getAllDataFromDB('settings')
            .then((res) => {
                store.commit('setSettings', res)
            })

        /* addDocsToDB('settings', DEFAULT_SETTINGS)
            .then(() => console.log('setting добавлены'))
        */
    },

}).$mount('#app');
