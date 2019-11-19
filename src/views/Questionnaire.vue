<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card">
        <div class="col-12">
          <div class="col-12 questionVisible" id="Question1">
            <p v-text="this.question">{{question}}</p>
            <!-- <b-form-checkbox-group id="checkbox-group-2"  v-model="q1" name="flavour-2" stacked></b-form-checkbox-group> -->
            <b-form-group>
                  <b-form-checkbox-group
                    v-model="q1"
                    :options="options"
                    plain
                  stacked></b-form-checkbox-group>
              </b-form-group>
            <b-button
              class="btnConn"
              @click="q1toq2"
              squared
              variant="outline-secondary"
              v-text="this.textBtn"
            ></b-button>
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
import data from "./../assets/question.json";

export default {
  name: "HelloWorld",
  data() {
    return {
      textBtn: "Question Suivante :",
      q1: [],
      compt: 7,
      datas: data,
      question: "",
      rep1: "",
      rep2: "",
      rep3: "",
      listCompt: [],
      nbrQuestionAffiche: 3,
      result: [],
      listResult: [],
      score: 0,
      options: []
    };
  },

  created: function() {
    console.log(this.$route.params["userNom"]);
    this.question = this.datas[this.compt].question;
    this.options = [
      {
        text: this.datas[this.compt]["rep1"],
        value: this.datas[this.compt]["rep1"]
      },
      {
        text: this.datas[this.compt]["rep2"],
        value: this.datas[this.compt]["rep2"]
      },
      {
        text: this.datas[this.compt]["rep3"],
        value: this.datas[this.compt]["rep3"]
      }
    ];

    // this.rep1 = this.datas[this.compt].rep1;
    // this.rep2 = this.datas[this.compt].rep2;
    // this.rep3 = this.datas[this.compt].rep3;
  },

  methods: {
    q1toq2: function() {
      this.listCompt.push(this.compt);
      this.listResult.push({
        question: this.datas[this.compt].question,
        reponses: this.q1,
        attendu: this.datas[this.compt].attendu
      });
        this.q1 = [];
      if (this.listCompt.length <= this.nbrQuestionAffiche) {
        if (this.listCompt.length === this.nbrQuestionAffiche) {
          this.textBtn = "Finir le test";
        }
        var bool = false;
        while (bool == false) {
          this.compt = Math.floor(Math.random() * this.datas.length);
          var inc = 0;
          var com = 0;
          while (com != this.listCompt.length) {
            if (this.compt == this.listCompt[com]) {
              inc++;
            }
            com = com + 1;
          }
          if (inc == 0) {
            bool = true;
          }
        }
        this.question = this.datas[this.compt].question;
        this.options = [
      {
        text: this.datas[this.compt]["rep1"],
        value: this.datas[this.compt]["rep1"]
      },
      {
        text: this.datas[this.compt]["rep2"],
        value: this.datas[this.compt]["rep2"]
      },
      {
        text: this.datas[this.compt]["rep3"],
        value: this.datas[this.compt]["rep3"]
      }
    ];
      } else {
        var db = new PouchDB("app_questionnaire");
        var incr = 0;
        var date = new Date().toLocaleString();
        this.score = this.listResult.length
        console.log(this.listResult)
        for(var item in this.listResult){
          console.log(item)
          for(var itm in this.listResult[item]['reponses']){
            console.log(itm)
            if(this.listResult[item]['reponses'][itm] !== this.listResult[item]['attendu']){
              this.score = this.score - 1
              console.log(this.score)
            }
          }
        }

        db.put({
          _id: date,
          Score : this.score,
          Reponse: this.listResult,
          UserNom: this.$route.params["userNom"],
          UserPrenom: this.$route.params["userPrenom"],
          UserEntreprise: this.$route.params["userEntreprise"]
        })
        db.replicate.to('http://127.0.0.1:3306/useradmin')
        this.$router.push({
          name: "resultat",
          params: {
            Reponse : this.listResult,
            userId: date,
            userNom: this.$route.params["userNom"],
            userPrenom: this.$route.params["userPrenom"],
            userEntreprise: this.$route.params["userEntreprise"]
          }
        });
      }
    },
    saveReponses: function() {}
  }
};
</script>

<style>
.container {
  text-align: center;
}

.inputConn {
  text-align: center !important;
  max-width: auto !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 15px;
}
</style>
