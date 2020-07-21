import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import messagePlugin from '@/common/message.plugin';
import titlePlugin from '@/common/title.plugin';
import tooltipDirective from '@/directives/tooltip.directive';
import Loader from '@/components/app/Loader';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);

Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

const firebaseConfig = {
  apiKey: 'AIzaSyAYekETSqpqmle8sA0oR2PG885SbZDtHro',
  authDomain: 'vue-crm-vscode.firebaseapp.com',
  databaseURL: 'https://vue-crm-vscode.firebaseio.com',
  projectId: 'vue-crm-vscode',
  storageBucket: 'vue-crm-vscode.appspot.com',
  messagingSenderId: '64573314535',
  appId: '1:64573314535:web:14fb25511ac7cea26ad942',
  measurementId: 'G-QR8DDEV0PG',
};
let app;
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
