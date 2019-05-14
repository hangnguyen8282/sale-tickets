<template>
  <v-container grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6>
        <v-flex xs12 md6></v-flex>
        <v-text-field v-model="pnrcode" :rules="pnrRules" label="Mã xác nhận PNR" required></v-text-field>
        <v-text-field v-model="lastname" :rules="nameRules" label="Họ" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-dialog v-model="dialog" width="1000">
          <template v-slot:activator="{ on }">
            <v-btn color="info" round v-on="on">Tìm kiếm</v-btn>
          </template>
          <v-card class="pop-up">
            <v-card-title class="title">Các chuyến bay đã đặt</v-card-title>
              <v-flex md12 class="review-info">plane-code</v-flex>
              <v-flex md12 class="review-info">plane-code</v-flex>
              <v-flex md12 class="review-info">plane-code</v-flex>
              <v-flex md12 class="review-info">plane-code</v-flex>
              <v-btn color="primary" flat @click="dialog = false">OK</v-btn>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 md6>
        <img src="../assets/images/4.jpg" height="150" width="250">
        <v-btn color="success">ĐĂNG NHẬP VÀO TÀI KHOẢN CỦA TÔI</v-btn>
        <v-layout>
          <v-flex xs12 md6>
            <v-text-field
              v-model="numbercard"
              :rules="numbercardRules"
              label="Nhập số thẻ"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field v-model="passcard" :rules="passcardRules" label="Mật khẩu" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6>
            <button style="color:#3498db">Quên mật khẩu?</button>
          </v-flex>
          <v-flex xs12 md6>
            <v-btn color="success">Đăng nhập</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    pnrcode: "",
    dialog: false,
    pnrRules: [
      v => !!v || "Yêu cầu có PNR",
      v => /^\d+$/.test(v) || "PNR must be valid"
    ],
    lastname: "",
    nameRules: [v => !!v || "Yêu cầu có họ"],
    email: "",
    emailRules: [
      v => !!v || "Yêu cầu có email",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    numbercard: "",
    numbercardRules: [v => !!v],
    passcard: "",
    passcardRules: [v => !!v]
  })
};
</script>

<style scoped>
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
