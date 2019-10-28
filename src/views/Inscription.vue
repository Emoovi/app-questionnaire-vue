<template>
  <div class="inscription align-items-center">
    <div class="container">
      <div class="row align-items-center">
        <div class="centrer">
        <router-link class="btn" to="/">Passer le test</router-link>
        <router-link class="btn" to="/inscription">Administration</router-link>
        </div>
        <div class="col-12 containerimg">
          <img id="logo" class="logo" src="./../assets/logo.png" />
        </div>
        <b-form-input class="inputConn col-7" placeholder="Identifiant"></b-form-input>
        <b-form-input class="inputConn col-7" type="password" placeholder="Mot de passe"></b-form-input>
      </div>
      <b-button class="btnConn" squared variant="outline-secondary">Se connecter</b-button>
    </div>
  </div>
</template>

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

body{
  text-align: center !important;
}

.centrer{
  width : 100%;
  text-align: center;
}
</style>
