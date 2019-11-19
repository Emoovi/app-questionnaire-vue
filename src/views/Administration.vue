<template>
  <div class="administration">
    <div class="container">
      <div class="row class-center">
        <div class="centrer">
        <router-link id="tortue" class="btn" to="/">ma</router-link>
        <router-link id="elBtn2" class="btn" to="/inscription">est</router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import PouchDB from 'pouchdb'

export default {
  name: 'HelloWorld',
  data () {
    return {
      resultPromise: [],
      result: [],
      test: ''
    }
  },

  created: async function () {
    await this.recupDB()
    // console.log(this.result)
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
