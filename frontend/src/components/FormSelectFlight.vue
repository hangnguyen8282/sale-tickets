<template>
  <v-container grid-list-xl>
    <div class="label-on-first">
      <div class="label-on-second">
        <v-layout flex-child wrap>
          <v-flex sm12 md2>
            <div class="source-point"></div>
          </v-flex>
          <v-flex md1>
            <div class="icon-fly">
              <!-- <image src="../assets/images/background.jpg"> -->
            </div>
          </v-flex>
          <v-flex sm12 md2>
            <div class="destination-point"></div>
          </v-flex>
          <v-flex md1>
            <div class="sperate-bar"></div>
          </v-flex>
          <v-flex sm12 md3>
            <div class="date-selected"></div>
          </v-flex>
          <v-flex md1>
            <div class="sperate-bar"></div>
          </v-flex>
          <v-flex sm12 md2>
            <div class="passenger-number"></div>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div class="title-page-2">Chuyến bay chiều đi</div>
    <table border="1px" cellpadding="5px" cellspacing="0px" class="flight-table">
      <tr>
        <v-flex xs12 md6>
          <td>HTML</td>
          <td>JavaScript</td>
          <td>PHP</td>
        </v-flex>
      </tr>
      <tr>
        <td>CSS</td>
        <td>jQuery</td>
        <td>MySQL</td>
      </tr>
      <tr>
        <td>Bootstrap 3</td>
        <td>Ajax</td>
        <td>ASP.NET</td>
      </tr>
    </table>
  </v-container>
</template>

<script>
</script>

<style>
.label-on-first {
  background-color: #2980b9;
  color: white;
  width: 100%;
  height: 100px;
}
.label-on-second {
  width: 100%;
  height: 100px;
  /* padding: 10px; */
  /* padding-left: 50px; */
}
.source-point {
  max-width: 25%;
}
.destination-point {
  max-width: 25%;
}
.icon-fly {
  /* padding: 20px; */
  width: 100%;
  height: 10px;
}
.sperate-bar {
  color: white;
  /* width: */
  height: 4rem;
  margin: 0.75rem;
  border-right: solid 0.625rem;
  border-right-style: solid;
  border-right-width: 0.0625rem;
}
.title-page-2 {
  padding-top: 20px;
  width: 100%;
  color: #cc840f;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}
table {
  display: block;
}
/* .flight-table {
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
  display: block;
  margin-bottom: 2rem;
}
.flight-table-header {
  weight: 100%;
  height: auto;
  display: inline-block;
  background-color: #dff0f6;
  border-radius: 5px;
  color: black;
} */
</style>
