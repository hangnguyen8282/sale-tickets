<template>
  <v-container grid-list-xl>
    <div class="label-on-first">
      <div class="label-on-second">
        <v-layout flex-child wrap>
          <v-flex sm12 md2>
            <div class="show-info">HAN</div>
          </v-flex>
          <v-flex md1>
            <div class="icon-fly">
              <span class="group pa-2"></span>
              <v-icon>mdi-airplane-takeoff</v-icon>
            </div>
          </v-flex>
          <v-flex sm12 md2>
            <div class="show-info">SGN</div>
          </v-flex>
          <v-flex md1>
            <div class="sperate-bar"></div>
          </v-flex>
          <v-flex sm12 md2>
            <div class="show-info">13Th05</div>
          </v-flex>
          <v-flex md1>
            <div class="sperate-bar"></div>
          </v-flex>
          <v-flex sm12 md3>
            <div class="show-info">1 khách</div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
</script>

<style>
.show-info{
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
}
.label-on-first {
  border-radius: 10px;
  background-color: #fefefe;
  width: 100%;
  height: 100px;
}
.label-on-second {
  width: 100%;
  height: 100px;
}
.icon-fly {
  /* padding: 20px; */
  width: 100%;
  height: 15px;
}
.sperate-bar {
  height: 5rem;
  border-right: solid 0.625rem;
  border-right-style: solid;
  border-right-width: 0.0625rem;
}
</style>
