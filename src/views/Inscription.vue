<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center">
        <div class="centrer">
        <router-link class="btn" to="/">Passer le test</router-link>
        <router-link class="btn" to="/inscription">Administration</router-link>
        </div>
        <div class="col-12 containerimg">
          <img id="logo" class="logo" src="./../assets/logo.png" />
        </div>
        <b-form-input class="inputConn col-7" v-model="identifiant" placeholder="Identifiant"></b-form-input>
        <b-form-input class="inputConn col-7" v-model="pass" type="password" placeholder="Mot de passe"></b-form-input>
      </div>
      <b-button @click="verrifUser" class="btnConn" squared variant="outline-secondary">Se connecter</b-button>
    </div>
  </div>
</template>

<style>
.container {
  text-align: center;
}

.inputConn {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 15px;
}

body{
  text-align: center !important;
}

.centrer{
  width : 100%;
  text-align: center;
}
</style>

<script>
import PouchDB from 'pouchdb'
export default {
  data () {
    return {
      identifiant: '',
      pass: ''
    }
  },

  methods: {
    // fonction de vezrrification du combot user/mdp
    verrifUser: function () {
      var db = new PouchDB('app_questionnaire')
      const usn = this.identifiant
      const pass = this.pass
      var context = this
      // verrification dans la bdd
      db.get('2').then(function (doc) {
        if (usn === doc.username && pass === doc.password) {
          context.$router.push({ name: 'administration' })
        }
      })
      db.replicate.to('http://127.0.0.1:3306/useradmin')
    }
  }
}
</script>
