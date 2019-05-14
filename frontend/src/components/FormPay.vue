<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <div class="label-info-review">Xem lại và thanh toán</div>
      <v-layout class="information-review">
      <v-flex md6>
        <v-flex md12 class="review-info">Chọn chuyến bay</v-flex>
        <v-flex md12 class="review-info">Chọn chuyến bay</v-flex>
      </v-flex>
      <v-flex md6>
        <v-flex md12 class="review-info">Hành khách</v-flex>
        <v-flex md12 class="review-info">Hành khách</v-flex>
      </v-flex>
      </v-layout>
      <!-- <v-flex md12> -->
        <v-flex md6>
          <v-btn round outline color="info" @click="clickToBack">Quay lại</v-btn>
        </v-flex>
        <v-flex md6>
          <v-btn round color="info" @click="clickToNext">Tiếp theo</v-btn>
        </v-flex>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    clickToNext() {
      this.$emit("clickBtnNext");
    },
    clickToBack(){
      this.$emit("clickBtnBack");
    }
  }
};
</script>

<style scope>
.information-review{
  padding: 20px;
  background-color: #fefefe;
  width: 100%;
}
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
