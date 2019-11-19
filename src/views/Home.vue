<template>
  <div class="home">
    <div class="container">
      <div class="row class-center">
        <div class="centrer">
        <router-link id="tortue" class="btn" to="/">Passer le test</router-link>
        <router-link id="elBtn2" class="btn" to="/inscription">Administration</router-link>
      </div>
      <div class="col-12 containerimg">
        <img id="logo" class="logo" src="./../assets/logo.png" />
      </div>
      <b-form-input class="inputConn col-7" v-model="nom" placeholder="Nom"></b-form-input>
      <b-form-input class="inputConn col-7" v-model="prenom" type="text" placeholder="Prenom"></b-form-input>
      <b-form-input class="inputConn col-7" v-model="entreprise" type="text" placeholder="Entreprise"></b-form-input>
    </div>
    <router-link to="/questionnaire">
      <b-button class="btnConn" @click="verrifUser" squared variant="outline-secondary">Lancer le
        test</b-button>
    </router-link>
  </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.5/vue.min.js"></script>
<script>
  // Creating a new Vue instance and pass in an options object.

  import PouchDB from "pouchdb";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        nom:'',
        prenom:'',
        entreprise: ''
      }
    },

    methods: {

      verrifUser: function () {
        var db = new PouchDB('app_questionnaire')
        db.put({
          _id: "3",
          Surname: this.nom,
          Name: this.prenom,
          Company: this.entreprise
        })
        db.get("3").then(function (doc) {
        }).catch(function (err) {
        })

        db.replicate.to('http://127.0.0.1:3306/useradmin')
        this.$router.push({ name: "questionnaire", params: {userNom: this.nom,userPrenom: this.prenom,userEntreprise: this.entreprise}});
      },
    }
  }

</script>

<style>
  .container {
    /* display: flex;
    align-items: center;
    flex-wrap: wrap; */
    text-align: center !important;
  }

  .logoDisplayNone {
    display: none !important;
  }

  .inputConn {
    text-align: center !important;
    max-width: auto !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 15px;
  }

  .btnConn {
    background-color: #fabc60 !important;
    margin-top: 30px !important;
    width: 40% !important;
    font-size: 18px !important;

  }

  .centrer {
    width: 100%;
    text-align: center;
  }
</style>
