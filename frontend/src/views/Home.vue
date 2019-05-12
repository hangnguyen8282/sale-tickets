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
              <FormBuyTicket 
                @clicked="onEventOfChild"
              />
            </v-tab-item>
            <v-tab-item>
              <FormLogin/>
            </v-tab-item>
          </v-tabs>
        </v-window-item>

        <!-- switch to page 2 -->
        <v-window-item :value="2">
          <FormSelectFlight/>
        </v-window-item>

        <v-window-item :value="3">
          <FormInfoCustomer/>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>
      <!-- <v-card-actions>
        <v-btn v-if="step !== 1" flat @click="step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 3"
          color="primary"
          depressed
          v-if="tabActive == 0"
          @click="onClickSearch"
          round
        >Tìm kiếm</v-btn>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
import FormBuyTicket from "@/components/FormBuyTicket";
import FormLogin from "@/components/FormLogin";
import FormSelectFlight from "@/components/FormSelectFlight";
import FormInfoCustomer from "@/components/FormInfoCustomer";
export default {
  components: {
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
    model: null
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Trang chủ";
        case 2:
          return "Chọn chuyến bay";
        default:
          return "Thông tin khách hàng";
      }
    }
  },
  methods: {
    onClickSearch() {
      this.step = this.step + 1;
      if (this.step == 2) {
        this.widthWindow = 1200;
      } else if (this.step == 3) {
        this.widthWindow = 1000;
      }
    },
    onEventOfChild(params) {
      console.log(params)
    }
  }
};
</script>

<style>
</style>

