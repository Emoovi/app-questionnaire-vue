<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card">
        <div class="col-12">
          <div class="col-12 questionVisible" id="Question1">
            <p>Quel est votre age?</p>
            <b-form-radio v-model="q1" name="some-radios" value="A">Moins de</b-form-radio>
            <b-form-radio v-model="q1" name="some-radios" value="B">Entre 1 et 3 ans</b-form-radio>
            <b-form-radio v-model="q1" name="some-radios" value="C">Superieur à 3 ans</b-form-radio>
            <b-button
              class="btnConn"
              @click="q1toq2"
              squared
              variant="outline-secondary"
            >Question suivante</b-button>
          </div>
          <div class="col-12 questionNonVisible" id="Question2">
            <p>Depuis quand etes vous dans votre entreprise?</p>
            <b-form-radio v-model="q2" name="some-radios" value="A">Inferieur à 1 ans</b-form-radio>
            <b-form-radio v-model="q2" name="some-radios" value="B">Entre 1 et 3 ans</b-form-radio>
            <b-form-radio v-model="q2" name="some-radios" value="C">Superieur à 3 ans</b-form-radio>
            <b-button
              class="btnConn"
              @click="q2toq3"
              squared
              variant="outline-secondary"
            >Question suivante</b-button>
          </div>
          <div class="col-12 questionNonVisible" id="Question3">
            <p>Avez vous un casier judiciaire?</p>
            <b-form-radio v-model="q3" name="some-radios" value="A">Oui</b-form-radio>
            <b-form-radio v-model="q3" name="some-radios" value="B">Non</b-form-radio>
            <b-button
              class="btnConn"
              @click="q3toq4"
              squared
              variant="outline-secondary"
            >Question suivante</b-button>
          </div>
          <div class="col-12 questionNonVisible" id="Question4">
            <p>Etes vous un terroriste?</p>
            <b-form-radio v-model="q4" name="some-radios" value="A">Oui</b-form-radio>
            <b-form-radio v-model="q4" name="some-radios" value="B">Non</b-form-radio>
            <b-button
              class="btnConn"
              @click="q4toq5"
              squared
              variant="outline-secondary"
            >Question suivante</b-button>
          </div>
          <div class="col-12 questionNonVisible" id="Question5">
            <p>Mangez vous des pizzas à l'ananas?</p>
            <b-form-radio v-model="q5" name="some-radios" value="A">Oui</b-form-radio>
            <b-form-radio
              v-model="q5"
              name="some-radios"
              value="B"
            >Oui mais je l'assume pas donc non</b-form-radio>
            <b-form-radio v-model="q5" name="some-radios" value="C">T'es fou c'est degueulasse</b-form-radio>
            <b-button
              class="btnConn"
              @click="saveReponses"
              squared
              variant="outline-secondary"
            >Finir le test</b-button>
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
  import data from "./../assets/question.json"

  export default {
    name: 'HelloWorld',
    data() {
      return {
        qu1:"",
        qu2:"",
        qu3:"",
        qu4:"",
        qu5:""
      }
    },

    created: function(){
        console.log("salut");
        console.log(data);

},

    methods: {
      q1toq2: function () {
        var element = document.getElementById("Question1");
        element.classList.remove("questionVisible");
        element.classList.add("questionNonVisible");
        var affiche = document.getElementById("Question2")
        affiche.classList.remove("questionNonVisible");
        elafficheement.classList.add("questionVisible");
      },
      q2toq3: function () {
        var element = document.getElementById("Question2");
        element.classList.remove("questionVisible");
        element.classList.add("questionNonVisible");
        var affiche = document.getElementById("Question3")
        affiche.classList.remove("questionNonVisible");
        elafficheement.classList.add("questionVisible");
      },
      q3toq4: function () {
        var element = document.getElementById("Question3");
        element.classList.remove("questionVisible");
        element.classList.add("questionNonVisible");
        var affiche = document.getElementById("Question4")
        affiche.classList.remove("questionNonVisible");
        elafficheement.classList.add("questionVisible");
      },
      q4toq5: function () {
        var element = document.getElementById("Question4");
        element.classList.remove("questionVisible");
        element.classList.add("questionNonVisible");
        var affiche = document.getElementById("Question5")
        affiche.classList.remove("questionNonVisible");
        elafficheement.classList.add("questionVisible");
      },
      saveReponses: function(){
      }
    }
  }

</script>

<style>
.container {
  text-align: center;
}

.h1 {
  z-index: 1000;
}

.inputConn {
  text-align: center !important;
  max-width: auto !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 15px;
}

.questionVisible {
  display: block !important;
}

.questionNonVisible {
  display: none !important;
}
</style>
