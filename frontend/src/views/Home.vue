<template>
  <div class="home">
    <h1>Flight Ticket Booking</h1>
    <v-card color="blue lighten-5" class="mx-auto" :max-width="widthWindow">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-tabs v-model="tabActive" color="cyan" dark slider-color="yellow">
            <v-tab v-for="n in tab" :key="n" ripple>{{ n }}</v-tab>
            <v-tab-item>
              <FormBuyTicket @clicked="onEventOfChild"/>
            </v-tab-item>
            <v-tab-item>
              <FormLogin/>
            </v-tab-item>
          </v-tabs>
        </v-window-item>

        <!-- switch to page 2 -->
        <v-window-item :value="2">
          <FormSelectFlight
            :receiveData="sentData1"
            :flightSearch="flightSearch"
            @backToPrePage="clickToBack"
            @selectType="selectType"
          />
        </v-window-item>

        <v-window-item :value="3">
          <FormInfoCustomer
            :receiveData="sentData1"
            :flight="flight"
            @onFormInfoNext="onFormInfoNext"
            @clickBtnBack="clickToBack"
          />
        </v-window-item>

        <v-window-item :value="4">
          <FormPay @onFormPayNext="onFormPayNext" @clickBtnBack="clickToBack" :info="info" :receiveData="sentData1"/>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import FormPay from "@/components/FormPay";
import FormBuyTicket from "@/components/FormBuyTicket";
import FormLogin from "@/components/FormLogin";
import FormSelectFlight from "@/components/FormSelectFlight";
import FormInfoCustomer from "@/components/FormInfoCustomer";
export default {
  components: {
    FormPay,
    FormInfoCustomer,
    FormBuyTicket,
    FormLogin,
    FormSelectFlight
  },
  data: () => ({
    step: 1,
    tabActive: 0,
    widthWindow: 700,
    tab: ["Mua vé trực tuyến", "Quản lý chuyến bay"],
    model: null,
    sentData1: null,
    flight: null,
    flightSearch: [],
    info: null
    // receivePoint: null
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Trang chủ";
        case 2:
          return "Chọn chuyến bay";
        case 3:
          return "Thông tin khách hàng";
        case 4:
          return "Thanh toán chuyến bay";
        // default:
        //   return "Thông tin khách hàng";
      }
    }
  },
  methods: {
    clickButtonNext() {
      this.step++;
    },
    clickToBack() {
      this.step = this.step - 1;
    },
    selectType(flight) {
      this.step++;
      this.flight = flight;
    },
    async onEventOfChild(params) {
      this.sentData1 = params;
      this.step++;
      this.widthWindow = 1200;
      const keyDes = params.destinationSend.key;
      const keySource = params.sourceSend.key;
      const date = params.dateSend;

      const result = await axios({
        url: "http://192.168.1.220:3000/search-flight",
        params: {
          airport_go: keyDes,
          airport_to: keySource
        }
      });
      this.flightSearch = result.data.list;
      // console.log(result.data.list)
      // console.log(flight)
    },
    onFormInfoNext(info) {
      this.step ++
      this.info = info
    },
    onFormPayNext(info) {
      this.info = info
    }
  }
};
</script>

<style>
</style>

