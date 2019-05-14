<template>
  <v-container grid-list-xl>
    <Information/>
    <div class="info-format" solid>
      <v-layout flex-child wrap>
        <v-flex md12>
          <div class="title-frame-info">Thông tin cơ bản</div>
        </v-flex>
        <v-flex md3>
          <v-select :items="items" :rules="mrRules" label="Danh xưng" required></v-select>
        </v-flex>
        <v-flex md5>
          <v-text-field v-model="firstname" :rules="firstnameRules" label="Tên đệm và tên" required></v-text-field>
        </v-flex>
        <v-flex md4>
          <v-text-field v-model="lastname" :rules="lastnameRules" label="Họ" required></v-text-field>
        </v-flex>
        <!-- <v-flex md12> -->
        <v-flex xs6>
          <v-combobox v-model="select" :items="items" label="Ngày tháng năm sinh" multiple chips>
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                :selected="data.selected"
                :disabled="data.disabled"
                class="v-chip--select-multi"
                @input="data.parent.selectItem(data.item)"
              >{{ data.item }}</v-chip>
            </template>
          </v-combobox>
        </v-flex>
        <v-flex md6>
          <v-select :items="sexitems" :rules="sexRules" label="Giới tính" height="40" required></v-select>
        </v-flex>
        <v-flex md12>
          <v-checkbox
            v-model="checkbox"
            :label="`Tôi đồng ý nhận các thông tin quảng cáo chi tiết trong Chính sách bảo mật`"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div class="info-format" solid>
      <v-layout flex-child wrap>
        <v-flex md12>
          <div class="title-frame-info">Thông tin liên hệ</div>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field v-model="sdt1" :rules="phoneRules" label="Số điện thoại 1"></v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field v-model="sdt2" label="Số điện thoại 2"></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field v-model="email1" :rules="emailRules" label="Địa chỉ email 1" required></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field
            v-model="email1Confirm"
            :rules="emailRules"
            label="Xác nhận địa chỉ email 1"
            required
          ></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field v-model="email2" label="Địa chỉ email 2" required></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field v-model="email2Confirm" label="Xác nhận địa chỉ email 2" required></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <v-layout>
      <v-flex md6>
        <v-btn round outline color="info" @click="clickToBack">Quay lại</v-btn>
      </v-flex>
      <v-flex md6>
        <v-btn round color="info" @click="clickToNext">Tiếp theo</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Information from "@/components/Information";
export default {
  components: {
    Information
  },
  data: () => ({
    select: ["Ngày", "Tháng", "Năm"],
    dayitems: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27"
    ],
    monthitems: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    yearitems: [],
    sexitems: ["Nam", "Nữ"],
    sexRules: [v => !!v || "Yêu cầu có giới tính"],
    items: ["Ông", "Bà", "Cô/Chị"],
    mrRules: [v => !!v || "Yêu cầu có danh xưng"],
    lastname: "",
    lastnameRules: [v => !!v || "Yêu cầu có họ"],
    firstname: "",
    firstnameRules: [v => !!v || "Yêu cầu có tên"],
    checkbox: false,
    sdt1: "+84 ",
    phoneRules: [v => (!!v && v.length >= 13) || "Yêu cầu có số điện thoại"],
    sdt2: "+84 ",
    email1: "",
    email2: "",
    email1Confirm: "",
    email2Confirm: "",
    emailRules: [v => !!v || "Yêu cầu có email"]
  }),
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
.info-format {
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #9bb9ce;
  padding: 25px;
  margin-bottom: 20px;
}
.title-frame-info {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding-top: 20px;
}
</style>
