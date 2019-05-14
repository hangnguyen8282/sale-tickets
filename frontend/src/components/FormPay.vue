<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <div class="label-info-review">Xem lại và thanh toán</div>
      <!-- {{receiveData}} -->
      <!-- {{flight}} -->
      <v-layout class="information-review">
        <v-flex md6>
          <v-flex md12 class="review-info">
            <div class="title">Chọn chuyến bay</div>
            <div class="review-price">
              <v-flex md12>
                <span
                  class="review-price-body"
                >{{receiveData !=null ? receiveData.destinationSend.text : ''}}</span>
                <v-icon>mdi-airplane-takeoff</v-icon>
                <span
                  class="review-price-body"
                >{{receiveData !=null ? receiveData.sourceSend.text : ''}}</span>
              </v-flex>
              <hr>
              <v-flex md12>
                <span
                  class="review-price-body"
                >{{flight !=null ? (new Date(flight.datetime * 1000).toISOString().slice(0,10)) : ''}}</span>
                <span
                  class="review-price-body"
                >{{flight !=null ? (new Date(flight.datetime * 1000).toISOString().slice(11,19)) : ''}}</span>
              </v-flex>
              <hr>
              <v-flex md12>
                <div class="review-price-body">
                  Xem
                  <a href="#">Quy định về giá</a> và
                  <a href="#">Thông tin hành lý</a> hiện áp dụng
                </div>
              </v-flex>
            </div>
          </v-flex>
        </v-flex>
        <v-flex md6>
          <v-flex md12 class="review-info">
            <div class="title">Xem lại chi phí chuyến bay</div>
            <div class="review-price">
              <div class="review-price-body">
                Giá vé:
                <span
                  style="padding-left: 250px;"
                  v-if="flight && flight.type =='economic'"
                >{{flight && flight.price_economy.toLocaleString('vi')}} VND</span>
                <span
                  style="padding-left: 250px;"
                  v-if="flight && flight.type =='bussiness'"
                >{{flight && flight.price_bussiness.toLocaleString('vi')}} VND</span>
              </div>
              <hr>
              <div class="review-price-body">
                Thuế, phí và các khoản thu:
                <span
                  style="padding-left: 105px;"
                >{{randomCost.toLocaleString('vi')}} VND</span>
              </div>
              <hr>
              <div style="font-weight: bold" class="review-price-body">
                Tổng số tiền: <span style="padding-left: 200px"></span>
                <span
                  style="padding-left: 500px, font-weight: bold"
                  v-if="flight && flight.type =='economic'"
                >{{(flight && flight.price_economy + randomCost).toLocaleString('vi')}} VND</span>
                <span
                  style="padding-left: 500px, font-weight: bold"
                  v-if="flight && flight.type =='bussiness'"
                >{{(flight && flight.price_bussiness + randomCost).toLocaleString('vi')}} VND</span>
              </div>
              <hr>
              <div class="review-price-body">
                Xem
                <a href="#">Quy định về giá</a> và
                <a href="#">Thông tin hành lý</a> hiện áp dụng
              </div>
            </div>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-flex md6>
        <v-btn round outline color="info" @click="clickToBack">Quay lại</v-btn>
      </v-flex>
      <v-flex md6>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="info" round v-on="on">Đặt vé</v-btn>
          </template>
          <v-card class="pop-up">
            <v-card-title class="title">Đặt vé thành công</v-card-title>
            <v-card-text>Chúc mừng bạn đã đặt vé thành công. Trong vòng 24h, chúng tôi sẽ gửi thông tin vé đến email bạn đã đăng ký. Vui lòng thanh toán để hoàn tất mua vé máy bay. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</v-card-text>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">OK</v-btn>
          </v-card>
        </v-dialog>
      </v-flex>
      <!-- {{info}} -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    info: Object,
    flight: Object,
    receiveData: Object
  },
  data: () => ({
    success: null,
    dialog: false
  }),
  methods: {
    clickToNext() {
      this.$emit("onFormPayNext");
    },
    clickToBack() {
      this.$emit("clickBtnBack");
    }
  },
  computed: {
    randomCost() {
      return Math.floor(Math.random() * 2000 + 3000) * 100;
    }
  }
};
</script>

<style scope>
.review-price-body {
  padding: 10px;
}
.review-price {
  text-align: left;
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
