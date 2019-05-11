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
          <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
            <v-tab v-for="n in tab" :key="n" ripple>{{ n }}</v-tab>
            <v-tab-item>
              <FormBuyTicket />
            </v-tab-item>
            <v-tab-item>
              <FormLogin />
            </v-tab-item>
          </v-tabs>
        </v-window-item>

        <!-- switch to page 2 -->
        <v-window-item :value="2"> 
          <FormSelectFlight />
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-3 text-xs-center">
            <v-img
              class="mb-3"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn  v-if="step !== 1" flat @click="step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 3" color="primary" depressed @click="onClickSearch" round>Tìm kiếm</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import FormBuyTicket from '@/components/FormBuyTicket'
import FormLogin from '@/components/FormLogin'
import FormSelectFlight from '@/components/FormSelectFlight'
export default {
  components: {
    FormBuyTicket, FormLogin, FormSelectFlight
  },
  data: () => ({
    step: 1,
    active:"",
    widthWindow: 700,
    tab: ["Mua vé trực tuyến", "Quản lý chuyến bay"]
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Trang chủ";
        case 2:
          return "Chọn chuyến bay";
        default:
          return "Thông tin khách";
      }
    }
  },
  methods: {
    onClickSearch() {
      this.step = this.step + 1
      if(this.step == 2) {
        this.widthWindow = 1000
      } else if (this.step == 3) {
        this.widthWindow = 700
      }
    }
  }

}
</script>

<style>
</style>

