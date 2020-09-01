import Vue from 'vue'
import router from './router'
import store from './store'

import './public/bootstrap/bootstrap.css'
import './public/css/index.css';

import { initFirebase } from "./config/firebase.js";
import { initAuthListener } from './js/auth.js';
import { getAllDataFromDB } from './js/db.js';

import App from './App.vue'


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

    },

}).$mount('#app');
