import Vue from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'

import './public/bootstrap/bootstrap.css'

import initFirebase from "./config/firebase.js";
import { initAuthListener } from './js/auth.js';
/*
import { addDocsToDB } from './js/db.js';
import { DEFAULT_SETTINGS } from './js/constants.js'
*/

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        initFirebase();
        initAuthListener();

        /*
        addDocsToDB('settings', DEFAULT_SETTINGS)
            .then(() => console.log('setting добавлены'))
            */
    },
    render: h => h(App),
}).$mount('#app');
