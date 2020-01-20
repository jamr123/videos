import Vue from 'vue';
import app from './app.vue'
import router from '../router/router.js';

Vue.config.devtools = true;

new Vue(Vue.util.extend({
  router
}, app)).$mount('#app');

