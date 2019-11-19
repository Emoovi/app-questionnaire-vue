<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style>

#nav{
  margin-left : auto !important;
  margin-right : auto !important;
  text-align: center !important;
  margin-top: 30px;
}

.btn{
  padding : 30px, 10px !important;
  background-color: white  !important;
  margin : 10px !important;
  color: #113a5d !important;
  border : solid 1.5px #fabc60 !important;
  text-align: center;
}

.btn :hover{
  background-color: #00818a !important;
}
body{
  background-color: #4b8e8d !important;
  text-align: center !important;
}
</style>
