<template>
  <v-container grid-list-xl>
    <Information :receiveParams="receiveData" :flight="flight"/>
    <div class="info-format" solid>
      <v-layout flex-child wrap>
        <v-flex md12>
          <div class="title-frame-info">Thông tin cơ bản</div>
        </v-flex>
        <v-flex md4>
          <v-select v-model="mrTitle" :items="items" :rules="mrRules" label="Danh xưng" required></v-select>
        </v-flex>
        <v-flex md8>
          <v-text-field v-model="name" :rules="nameRules" label="Họ tên" required></v-text-field>
        </v-flex>
        <!-- <v-flex md12> -->
        <v-flex xs6>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthDate"
                label="Ngày tháng năm sinh"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthDate"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md6>
          <v-select :items="sexitems" :rules="sexRules" label="Giới tính" required v-model="sex"></v-select>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field v-model="phone" :rules="phoneRules" label="Số điện thoại"></v-text-field>
        </v-flex>
        <v-flex md6>
          <v-text-field v-model="email" :rules="emailRules" label="Địa chỉ email" required></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <div solid>
      <v-layout flex-child wrap>
        <v-flex md6>
          <v-btn round outline color="info" @click="clickToBack">Quay lại</v-btn>
        </v-flex>
        <v-flex md6>
          <v-btn round color="info" @click="clickToNext">Tiếp theo</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import Information from "@/components/Information";
export default {
  components: {
    Information
  },
  props: {
    receiveData: null,
    flight: Object
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  data: () => ({
    mrTitle: null,
    name: null,
    birthDate: null,
    sex: null,
    phone: null,
    email: null,

    menu: false,
    sexitems: ["Nam", "Nữ"],
    items: ["Ông", "Bà", "Cô/Chị"],

    mrRules: [v => !!v || "Yêu cầu có danh xưng"],
    nameRules: [v => !!v || "Yêu cầu có họ và tên"],
    sexRules: [v => !!v || "Yêu cầu có giới tính"],
    phoneRules: [v => (!!v && v.length >= 13) || "Yêu cầu có số điện thoại"],
    emailRules: [v => !!v || "Yêu cầu có email"]
  }),
  methods: {
    clickToNext() {
      const params = {
        mrTitle: this.mrTitle,
        name: this.name,
        birthDate: this.birthDate,
        sex: this.sex,
        phone: this.phone,
        email: this.email
      };
      this.$emit("onFormInfoNext", params);
    },
    clickToBack() {
      this.$emit("clickBtnBack");
    },
    save(date) {
      this.$refs.menu.save(date);
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
