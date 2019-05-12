import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify'

Vue.config.productionTip = false;

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/css/style.css'

Vue.use(Vuetify,{iconfont: 'mdi'})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');