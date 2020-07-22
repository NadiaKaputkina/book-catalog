import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './public/bootstrap/bootstrap.css'

import { initFirebase } from "./config/firebase.js";
//import { initFirebase, setSettingsDataFormFirebase } from "./config/firebase.js";

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
    created() {
        initFirebase();

        //setSettingsDataFormFirebase();
    }
}).$mount('#app');
