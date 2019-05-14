<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <div class="label-info-review">Xem lại và thanh toán</div>
              {{receiveData}}  
      <v-layout class="information-review">
        <v-flex md6>
          <v-flex md12 class="review-info">
            <div class= "title">Chọn chuyến bay</div>
            <div class="review-price">
            <div class="review-price-body">{{receiveData !=null ? receiveData.destinationSend.text : ''}}</div>
            <hr/>
            <div class="review-price-body">Thuế, phí và các khoản thu</div>
            <hr/>
            <div class="review-price-body">Tổng số tiền</div>
            <hr/>
            <div class="review-price-body">Xem <a href="#">Quy định về  giá</a> và <a href ="#">Thông tin hành lý</a> hiện áp dụng</div>
            </div>
          </v-flex>
        </v-flex>
        <v-flex md6>
          <v-flex md12 class="review-info">
            <div class= "title">Xem lại chi phí chuyến bay</div>
            <div class="review-price">
            <div class="review-price-body">Giá vé<span></span></div>
            <hr/>
            <div class="review-price-body">Thuế, phí và các khoản thu</div>
            <hr/>
            <div class="review-price-body">Tổng số tiền</div>
            <hr/>
            <div class="review-price-body">Xem <a href="#">Quy định về  giá</a> và <a href ="#">Thông tin hành lý</a> hiện áp dụng</div>
            </div>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-flex md6>
        <v-btn round outline color="info" @click="clickToBack">Quay lại</v-btn>
      </v-flex>
      <v-flex md6>
        <v-btn round color="info" @click="clickToNext">Tiếp theo</v-btn>
      </v-flex>
      <!-- {{info}} -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    info: null,
    receiveData: Object
  },
  methods: {
    clickToNext() {
      this.$emit("onFormPayNext");
    },
    clickToBack() {
      this.$emit("clickBtnBack");
    },
    // receivePoint(){
    //   this.receivePoint = receivePoint 
    // }
  },
};
</script>

<style scope>
.review-price-body{
 padding: 10px;
}
.review-price{
  text-align:left;
  padding: 20px;
  font-size: 16px;
}
.information-review {
  padding: 20px;
  /* background-color: #c8e0ff; */
  width: 100%;
  /* margin: 50px; */
}
.label-info-review {
  padding: 20px;
  /* margin: 10px;; */
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  /* background-color: #fefefe; */
  width: 100%;
  height: 60px;
  font-size: 20px;
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
