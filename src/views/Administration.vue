<template>
  <div class="administration">
    <div class="container">
      <div class="row class-center">
        <div class="centrer">
          <div class="titre">
            <h1>Administration</h1>
            <h3>Ici vous voyez le score des personnes qui ont passé le test</h3>
          </div>
        <div style="background-color: white; margin:10px; border-radius:5px;"  v-for="element in result" :key="element">
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
  font-weight: bold !important;
}

</style>

<script>
import PouchDB from 'pouchdb'

export default {
  name: 'HelloWorld',
  data () {
    return {
      resultPromise: [],
      result: [],
      nbrQuestion: 0
    }
  },

  created: async function () {
    await this.recupDB()
  },

  methods: {
    async recupDB () {
      var context = this
      var db = new PouchDB('app_questionnaire')
      db.allDocs({}).then(function (resul) {
        for (let i = 0; i < resul.rows.length; i++) {
          db.get(resul.rows[i].id.toString()).then(function (doc) {
            if (doc.hasOwnProperty('Reponse')) {
              context.result.push(doc)
            }
          })
        }
      })
    }
  }
}
</script>
