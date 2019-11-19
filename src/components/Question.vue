<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center card lacard">
        <div class="col-12">
          <div class="col-12 questionVisible" id="Question1">
            <p class="laquestion" v-text="this.BPquestion">{{BPquestion}}</p>
            <!-- <b-form-checkbox-group id="checkbox-group-2"  v-model="q1" name="flavour-2" stacked></b-form-checkbox-group> -->
            <b-form-group>
                  <b-form-checkbox-group
                    v-model="BPq1"
                    :options="BPoptions"
                    plain
                  stacked></b-form-checkbox-group>
              </b-form-group>
            <b-button
              class="btnConn"
              @click="BPq1toq2"
              squared
              variant="outline-secondary"
              v-text="this.BPtextBtn"
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

import PouchDB from "pouchdb";
import data from "./../assets/question.json";

export default {
  data() {
    return {
      BPtextBtn: "Question Suivante :",
      BPq1: [],
      BPcompt: 7,
      BPdatas: data,
      BPquestion: "",
      BPrep1: "",
      BPrep2: "",
      BPrep3: "",
      BPlistCompt: [],
      BPnbrQuestionAffiche: 3,
      BPresult: [],
      BPlistResult: [],
      BPscore: 0,
      BPoptions: []
    };
  },

  created: function() {
    // Instanciation des valeurs des questions
    this.BPquestion = this.BPdatas[this.BPcompt].question;
    this.BPoptions = [
      {
        text: this.BPdatas[this.BPcompt]["rep1"],
        value: this.BPdatas[this.BPcompt]["rep1"]
      },
      {
        text: this.BPdatas[this.BPcompt]["rep2"],
        value: this.BPdatas[this.BPcompt]["rep2"]
      },
      {
        text: this.BPdatas[this.BPcompt]["rep3"],
        value: this.BPdatas[this.BPcompt]["rep3"]
      }
    ];
  },

  methods: {
    BPq1toq2: function() {
      this.BPlistCompt.push(this.BPcompt);
      this.BPlistResult.push({
        question: this.BPdatas[this.BPcompt].question,
        reponses: this.BPq1,
        attendu: this.BPdatas[this.BPcompt].attendu
      });
        this.BPq1 = [];
      if (this.BPlistCompt.length <= this.BPnbrQuestionAffiche) {
        if (this.BPlistCompt.length === this.BPnbrQuestionAffiche) {
          this.BPtextBtn = "Finir le test";
        }
        var BPbool = false;
        while (BPbool == false) {
          this.BPcompt = Math.floor(Math.random() * this.BPdatas.length);
          var BPinc = 0;
          var BPcom = 0;
          while (BPcom != this.BPlistCompt.length) {
            if (this.BPcompt == this.BPlistCompt[BPcom]) {
              BPinc++;
            }
            BPcom = BPcom + 1;
          }
          if (BPinc == 0) {
            BPbool = true;
          }
        }
        this.BPquestion = this.BPdatas[this.BPcompt].question;
        this.BPoptions = [
      {
        text: this.BPdatas[this.BPcompt]["rep1"],
        value: this.BPdatas[this.BPcompt]["rep1"]
      },
      {
        text: this.BPdatas[this.BPcompt]["rep2"],
        value: this.BPdatas[this.BPcompt]["rep2"]
      },
      {
        text: this.BPdatas[this.BPcompt]["rep3"],
        value: this.BPdatas[this.BPcompt]["rep3"]
      }
    ];
      } else {
        var BPdb = new PouchDB("app_questionnaire");
        var BPdate = new Date().toLocaleString();
        this.BPscore = this.BPlistResult.length
        console.log(this.BPlistResult)
        for(var BPitem in this.BPlistResult){
          console.log(BPitem)
          for(var BPitm in this.BPlistResult[BPitem]['reponses']){
            console.log(BPitm)
            if(this.BPlistResult[BPitem]['reponses'][BPitm] !== this.BPlistResult[BPitem]['attendu']){
              this.BPscore = this.BPscore - 1
              console.log(this.BPscore)
            }
          }
        }

        BPdb.put({
          _id: BPdate,
          Score : this.BPscore+ "/"+this.BPlistResult.length,
          Reponse: this.BPlistResult,
          UserNom: this.$route.params["userNom"],
          UserPrenom: this.$route.params["userPrenom"],
          UserEntreprise: this.$route.params["userEntreprise"]
        })
        BPdb.replicate.to('http://127.0.0.1:3306/useradmin')
        this.$router.push({
          name: "resultat",
          params: {
            Reponse : this.BPlistResult,
            userId: BPdate,
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
.lacard{
  margin-top:20%;
  margin-left: 0px !important;
  margin-right: 0px !important;
  padding-left:0px !important;
  padding-right:0px !important;
}

.card{
  margin-left: 0px !important;
  margin-right: 0px !important;
  width: 80% !important;
}

.laquestion{
  font-size: 25px;
}
.container {
  text-align: center;
}
b-form-group{
  font-size: 30px;
}
.inputConn {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 15px;
}
</style>
