<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <div class="label-info-review">Xem lại và thanh toán</div>
      <v-flex md6 class="review-info">
        <p>Chọn chuyến bay</p>
      </v-flex>
      <v-flex md6 class="review-info">
        <p>Chọn chuyến bay</p>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex md6 class="review-info">
        <p>Hành khách</p>
      </v-flex>
      <v-flex md6 class="review-info">
          <p>Hành khách</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.label-info-review {
  padding: 20px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #fefefe;
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
}
/* .label-info-review p {
  font-size: 18px;
} */
.review-info {
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #9bb9ce;
  padding: 25px;
  margin: 10px;
  margin-top: 20px !important;
}
</style>
