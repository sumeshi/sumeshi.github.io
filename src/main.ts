import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import VueRx from 'vue-rx';

Vue.use(VueRx);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
