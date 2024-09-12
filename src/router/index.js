import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/HomeComponent.vue' 
import vista1 from '../components/VistaOneComponent.vue';
import vista2 from '../components/VistaTwoComponent.vue'

Vue.use(Router);

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/vista1',
      name: 'Vista1',
      component: vista1
    },
    {
      path: '/vista2',
      name: 'Vista2',
      component: vista2
    }
  ]
});
