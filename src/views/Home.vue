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
      <b-form-input class="inputConn col-7" v-model="BPnom" placeholder="Nom"></b-form-input>
      <b-form-input class="inputConn col-7" v-model="BPprenom" type="text" placeholder="Prenom"></b-form-input>
      <b-form-input class="inputConn col-7" v-model="BPentreprise" type="text" placeholder="Entreprise"></b-form-input>
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
    data() {
      return {
        BPnom:'',
        BPprenom:'',
        BPentreprise: ''
      }
    },

    methods: {
// Creation et initialisation de la bdd pour la personne qui va remplir le questionnaire
      verrifUser: function () {
        var BPdb = new PouchDB('app_questionnaire')
        BPdb.put({
          _id: "3",
          Surname: this.BPnom,
          Name: this.BPprenom,
          Company: this.BPentreprise
        })
        // verrification de l'insertion'
        BPdb.get("3").then(function (doc) {
        }).catch(function (err) {
        })
        // replication dans la base de donnée en ligne
        BPdb.replicate.to('http://127.0.0.1:3306/useradmin')
        // routeur permetant de naviguer a la page questionnaire avec les valeurs de l'utilisateur en parametre
        this.$router.push({ name: "questionnaire", params: {userNom: this.BPnom,userPrenom: this.BPprenom,userEntreprise: this.BPentreprise}});
      },
    }
  }

</script>

<style>

  .logo{
    width:50% !important;
  }

  .containerimg{
    margin-top : 10% !important;
  }
  .container {
    text-align: center !important;
  }

  .inputConn {
    text-align: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 15px;
  }

  .btnConn {
    background-color: #fabc60 !important;
    margin-top: 30px !important;
    width: 80% !important;
    font-size: 18px !important;
  }
  @media only screen and (max-width: 600px) {
    .btnConn {
      width: 90% !important;
    }
  }

  .centrer {
    width: 100%;
    text-align: center;
  }
</style>
