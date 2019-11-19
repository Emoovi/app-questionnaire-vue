<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card">
        <div class="col-12">
          <h1>{{this.$route.params["userPrenom"]+ " " + this.$route.params["userNom"]}}</h1>
          <p>{{this.$route.params["userEntreprise"]}}</p>
          <p>Voici vos resultats :</p>
          <p>{{this.score}} / {{this.nbrQuestion}}</p>
          <div class="lesResultats" v-for="element in reponse" :key="element">
            -->
            <p>{{element['question']}}</p>
            <p>{{element['attendu']}}</p>
            <div v-for="el in element['reponses']" :key="el">
              <p v-if="element['attendu'] === el" style="background-color: green">{{el}}</p>
              <p v-else style="background-color: red">{{el}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.5/vue.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" language="javascript" src="./../assets/question.json"></script>
<script>
// Creating a new Vue instance and pass in an options object.

import PouchDB from "pouchdb";

export default {
  name: "HelloWorld",
  data() {
    return {
      reponse: [],
      score: 0,
      nbrQuestion: 0
    };
  },

  created: function() {
    var db = new PouchDB("app_questionnaire");
    var incr = 0;
    this.reponse = this.$route.params["Reponse"];
    var score = this.reponse.length;
    this.nbrQuestion = this.reponse.length;
    // console.log(this.reponse)
    for (var rep in this.reponse) {
      // console.log(rep)
      for (var r in this.reponse[rep]["reponses"]) {
        // console.log(r)
        if (this.reponse[rep]["reponses"][r] != this.reponse[rep]["attendu"]) {
          score = score - 1;
          // console.log(score)
        }
      }
    }
    console.log(score);
    this.score = score;
  }
};
</script>
