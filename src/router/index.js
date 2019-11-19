import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue'
import Questionnaire from '../views/Questionnaire.vue'
import Resultat from '../views/Resultat.vue'
import Administration from '../views/Administration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: Questionnaire
  },
  {
    path: '/resultat',
    name: 'resultat',
    component: Resultat
  },
  {
    path: '/administration',
    name: 'administration',
    component: Administration
  }
]

const router = new VueRouter({
  routes
})

export default router
