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
          <v-flex sm12 md3>
            <div class="show-date">{{receiveParams != null ? dateRenderInfo : ''}}</div>
          </v-flex>
          <v-flex md1>
            <div class="sperate-bar"></div>
          </v-flex>
          <v-flex sm12 md3>
            <div
              class="show-info"
            >{{receiveParams != null ? receiveParams.dataNumberCustomer : ''}} khách</div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    receiveParams: null
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      console.log(date);
      return `${day} / ${month} / ${year}`;
    }
  },
  computed: {
    dateRenderInfo() {
      return this.formatDate(this.receiveParams.dateSend);
    }
  }
};
</script>

<style>
.show-date {
  padding-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
.show-info {
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
