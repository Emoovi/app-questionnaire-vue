import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PouchDB from 'pouchdb/dist/pouchdb'

Vue.use(BootstrapVue)
Vue.use(PouchDB('app_questionnaire'))
Vue.config.silent = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

var db = new PouchDB('app_questionnaire')
// db.destroy()

db.get('2').then(function (doc) {
  console.log(doc)
}).catch(function (err) {
  db.put({
    _id: '2',
    username: 'bapt',
    password: 'papa'
  })
  console.log(err)
})
db.replicate.to('http://127.0.0.1:3306/useradmin')
