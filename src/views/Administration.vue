<template>
  <div class="administration">
    <div class="container">
      <div class="row class-center">
        <div class="centrer">
          <div class="titre">
            <h1>Administration</h1>
            <h3>Ici vous voyez le score des personnes qui ont passé le test</h3>
          </div>
          <router-link to="/">
            <a class="btnRetour" href='#'>Retour au menu</a>
          </router-link>
        <div style="background-color: white; margin:10px; border-radius:5px; margin-top: 25px;" v-for="element in BPresult" :key="element">
          <p class="leNom">{{element['UserPrenom']}} {{element['UserNom']}} </p>
          <p class="lentreprise">{{element['UserEntreprise']}}</p>
          <p class="leScore">{{element['Score']}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200,400&display=swap');

.leNom{
  font-family: 'Raleway', sans-serif;
  font-size: 35px;
  margin-bottom: 0px;
}
.lentreprise{
  font-family: 'Raleway', sans-serif;
  font-weight: lighter;
  font-size: 25px;
  margin-top: 0px;
}

.leScore{
  font-size: 35px;
  margin-top: 0px;
  margin-bottom: 10px;
}

.titre{
  margin : 20px;
  margin-top: 30px;
  font-weight: bold !important;
  background-color: #fabc60;
  border-radius:10px;
  padding:15px;
  margin-bottom: 20px !important;
}
a{
  background-color: #fff6da !important;
  margin-bottom: 30px !important;
}

</style>

<script>
import PouchDB from 'pouchdb'

export default {
  data () {
    return {
      BPresultPromise: [],
      BPresult: [],
      BPnbrQuestion: 0
    }
  },

  created: async function () {
    await this.recupDB()
  },

  methods: {
    async recupDB () {
      var BPcontext = this
      var BPdb = new PouchDB('app_questionnaire')
      BPdb.allDocs({}).then(function (BPresul) {
        for (let i = 0; i < BPresul.rows.length; i++) {
          BPdb.get(BPresul.rows[i].id.toString()).then(function (doc) {
            if (doc.hasOwnProperty('Reponse')) {
              BPcontext.BPresult.push(doc)
            }
          })
        }
      })
    }
  }
}
</script>
