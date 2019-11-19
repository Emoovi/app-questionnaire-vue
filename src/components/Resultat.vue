<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card">
        <div class="col-12">
          <h1>{{this.$route.params["userPrenom"]+ " " + this.$route.params["userNom"]}}</h1>
          <h3>{{this.$route.params["userEntreprise"]}}</h3>
          <br>
          <p class="score">{{this.score}} / {{this.nbrQuestion}}</p>
          <div class="lesResultats"  v-for="element in reponse" :key="element">
            <hr>
            <p class="question">{{element['question']}}</p>
            <div v-for="el in element['reponses']" :key="el">
              <p v-if="element['attendu'] !== el" class="attendu">{{element['attendu']}}</p>
              <p v-if="element['attendu'] === el" style="background-color: #6fc1a5; border:solid 1px black;">{{el}}</p>
              <p v-else style="background-color: #d1274b;color: white; border:solid 1px black;">{{el}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/">
      <a class="btnRetour" href='#'>Retour au menu</a>
    </router-link>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200,400&display=swap');

.lesResultats{
  margin:10px;
}

.btnRetour{
  background-color: #eae9e9;
  padding: 10px;
  margin-top: 30px !important;
  text-decoration: none;
  color:black;
  border-radius: 5px;
}

body{
  padding-bottom: 40px;
}

.card{
  width:80%;
  margin-left:10% !important;
  margin-bottom: 15px;
}

.question{
  font-weight: bold;
}

.score{
  font-size: 25px;
  font-weight: bold;
  border: solid 2px darkgreen;
  width: 40%;
  margin-left:30%;
}

hr{
  border :solid 1px !important;
}

.attendu{
  border:solid 1px black;
}

h1{
  font-family: 'Raleway', sans-serif;
  margin-top: 15px;
}

h3{
  font-family: 'Raleway', sans-serif;
  font-weight: lighter;
}

</style>

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
