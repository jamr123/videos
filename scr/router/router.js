
import Vue    from 'vue'
import Router from 'vue-router'

import api from '../app_vue/aplicacion/componentes/api.vue';


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'api',
            path: '/',
            component: api
          }
    ],
    linkActiveClass: "active",
    mode: "history"
})

