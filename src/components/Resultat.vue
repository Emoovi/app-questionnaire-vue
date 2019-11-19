<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card">
        <div class="col-12">
          <h1>{{this.$route.params["userPrenom"]+ " " + this.$route.params["userNom"]}}</h1>
          <h3>{{this.$route.params["userEntreprise"]}}</h3>
          <br>
          <p class="score">{{this.BPscore}} / {{this.BPnbrQuestion}}</p>
          <div class="lesResultats" v-for="element in BPreponse" :key="element">
            <hr>
            <p class="question">{{element['question']}}</p>
<!--            definission de couleurs des réponses en fonction de leur résutat-->
            <div v-for="el in element['reponses']" :key="el">
              <p v-if="element['attendu'] !== el" class="attendu" style="width:60%; margin-left:20%;border-radius: 5px; padding: 10px;">{{element['attendu']}}</p>
              <p v-if="element['attendu'] === el" style="background-color: #6fc1a5; padding: 10px; border:solid 1px black; width:60%; margin-left:20%;border-radius: 5px;">{{el}}</p>
              <p v-else style="background-color: #d1274b;color: white; border:solid 1px black; width:60%; padding: 10px; margin-left:20%; border-radius: 5px;">{{el}}</p>
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
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left:50px;
  padding-right:50px;
}

.question{
  /*font-weight: bold;*/
  font-size: 25px;
}

.score{
  font-size: 25px;
  font-weight: bold;
  border: solid 2px darkgreen;
  width: 40%;
  margin-left:30%;
}

hr{
  border :solid 1px lightgray!important;
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

export default {
  data() {
    return {
      BPreponse: [],
      BPscore: 0,
      BPnbrQuestion: 0
    };
  },

  created: function() {
    // recuperation des variable passé dans la route
    this.BPreponse = this.$route.params["Reponse"];
    var score = this.BPreponse.length;
    this.BPnbrQuestion = this.BPreponse.length;
    // calcul du score
    for (var rep in this.BPreponse) {
      for (var r in this.BPreponse[rep]["reponses"]) {
        if (this.BPreponse[rep]["reponses"][r] != this.BPreponse[rep]["attendu"]) {
          score = score - 1;
        }
      }
    }
    console.log(score);
    this.BPscore = score;
  }
};
</script>
