<template>
  <v-container grid-list-xl>
    <Information :receiveParams="receiveData"/>
    <p class="title-page-2">Chuyến bay chiều đi</p>
    <div class="table-flight">
      <v-layout class="table-header">
        <v-flex xs6 md4 class="item">Thời gian</v-flex>
        <v-flex xs6 md2 class="item">Điểm dừng</v-flex>
        <v-flex xs6 md3 class="item">Phổ thông</v-flex>
        <v-flex xs6 md3 class="item">Thương gia</v-flex>
      </v-layout>
      <v-layout class="table-items" @mouseover="showBtnSelect(1)">
        <v-flex xs6 md4>
          <span>11 Th05 15:00 Đến 11 Th05 17:15</span>
          <br>
          <span>VN 247 Airbus A350</span>
          <br>
          <span>2 tiếng 15 phút</span>
        </v-flex>
        <v-flex xs6 md2>Bay thẳng</v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">ECONOMIC</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 1" @click="onClickBtnSelect('economic')">Chọn</v-btn>
        </v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">BUSSINESS</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 1" @click="onClickBtnSelect('bussiness')">Chọn</v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="table-items" @mouseover="showBtnSelect(2)">
        <v-flex xs6 md4>
          <span>11 Th05 15:00 Đến 11 Th05 17:15</span>
          <br>
          <span>VN 247 Airbus A350</span>
          <br>
          <span>2 tiếng 15 phút</span>
        </v-flex>
        <v-flex xs6 md2>Bay thẳng</v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">ECONOMIC</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 2">Chọn</v-btn>
        </v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">BUSSINESS</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 2">Chọn</v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="table-items" @mouseover="showBtnSelect(3)">
        <v-flex xs6 md4>
          <span>11 Th05 15:00 Đến 11 Th05 17:15</span>
          <br>
          <span>VN 247 Airbus A350</span>
          <br>
          <span>2 tiếng 15 phút</span>
        </v-flex>
        <v-flex xs6 md2>Bay thẳng</v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">ECONOMIC</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 3">Chọn</v-btn>
        </v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">BUSSINESS</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 3">Chọn</v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="table-items" @mouseover="showBtnSelect(4)">
        <v-flex xs6 md4>
          <span>11 Th05 15:00 Đến 11 Th05 17:15</span>
          <br>
          <span>VN 247 Airbus A350</span>
          <br>
          <span>2 tiếng 15 phút</span>
        </v-flex>
        <v-flex xs6 md2>Bay thẳng</v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">ECONOMIC</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 4">Chọn</v-btn>
        </v-flex>
        <v-flex xs6 md3 class="type">
          <div class="title">BUSSINESS</div>
          <p>Từ</p>
          <span>3,870,000 VND (M)</span>
          <v-btn v-if="showBtn == 4">Chọn</v-btn>
        </v-flex>
      </v-layout>
    </div>
        <v-flex md6 class="back-button">
        <v-btn round outline color="info">Quay lại</v-btn>
      </v-flex>
  </v-container>
</template>

<script>
import Information from "@/components/Information";
export default {
  components: {
    Information
  },
  props: {
    receiveData: null
  },
  data: () => ({
    showBtn: null,
    type: null,
    // receiveData:null
    // receiceParams: null
  }),
  methods: {
    showBtnSelect(n) {
      this.showBtn = n;
    },
    onClickBtnSelect(type) {
      this.type = type;
      this.$emit("clickBtnSelect", type);
      
    }
  }
};
</script>

<style>
.back-button{
  margin-top: 30px;
}
.table-header {
  background-color: #aac8dc;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 auto !important;
}
.table-items {
  width: 100%;
  margin: 0 auto !important;
}
.table-items:hover {
  background-color: white !important;
}
.table-items:nth-child(even) {
  background-color: #b3d0dc8f;
}
.table-items:nth-child(odd) {
  background-color: #d6eaf8;
}
.type {
  margin: 10px;
  border-radius: 4px;
}
.type p {
  margin: 0 !important;
  padding-left: 10px;
}
.type {
  border-left: 10px solid #e59866;
  background-color: #efefef;
}
.group {
  display: flex;
  flex: 1;
}
.title-page-2 {
  padding-top: 20px;
  width: 100%;
  color: #cc840f;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}
table {
  display: block;
}
</style>
