import Vue from 'vue'
import router from './router'
import store from './store'

import './public/bootstrap/bootstrap.css'

import { initFirebase } from "./config/firebase.js";
import { initDBListener } from "./js/db";
import { initAuthListener } from './js/auth.js';
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

        initDBListener('settings')
        /*
        addDocsToDB('settings', DEFAULT_SETTINGS)
            .then(() => console.log('setting добавлены'))
            */
    },

}).$mount('#app');
