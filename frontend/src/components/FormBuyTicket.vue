<template>
  <v-container grid-list-xl>
    <v-btn round color="success" @click="type = 'one-way'">Một chiều</v-btn>
    <v-btn round color="success" @click="type = 'two-way'">Khứ hồi</v-btn>
    <v-layout flex-child wrap>
      <v-flex xs12 md6>
        <v-combobox
          v-model="destination"
          :items="airportDestinationList"
          :item-text="'text'"
          :filter="filter"
          label="Từ"
        ></v-combobox>
        <v-dialog ref="dialog" v-model="modalPicker" full-width width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateStartFormatted"
              label="Ngày đi"
              append-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateStart" no-title color="purple">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalPicker = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(dateStart)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="dialog"
          v-model="modalPicker"
          full-width
          width="290px"
          v-if="type == 'two-way'"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateEndFormatted"
              label="Ngày về"
              append-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateEnd" no-title color="purple">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalPicker = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(dateEnd)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 md6>
        <v-combobox v-model="source" :items="airportSourceList" label="Đến"></v-combobox>
        <v-form ref="form">
          <v-text-field v-model="numCustomer" label="Hành khách" type="number"></v-text-field>
        </v-form>
      </v-flex>
      <v-flex xs6 md12 style="padding-left: 500px">
        <v-btn color="info" @click="onSearch">Tìm kiếm</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getAriportList } from "@/cores/api";
import { removeAccent } from "@/untils";
export default {
  data: () => ({
    type: "one-way",
    destination: null,
    source: null,
    numCustomer: 1,
    modalPicker: false,
    airports: [],
    kind: ["Phổ thông", "Thương gia"],
    dateStart: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10)
  }),
  async created() {
    const list = await getAriportList();
    this.airports = list.map(item => {
      item.text = item.name + ` (${item.key})`;
      return item;
    });
  },
  computed: {
    dateStartFormatted() {
      return this.formatDate(this.dateStart);
    },
    dateEndFormatted() {
      return this.formatDate(this.dateEnd);
    },
    airportDestinationList() {
      return this.airports;
    },
    airportSourceList() {
      if (!!this.destination) {
        const { routes } = this.destination;
        if (routes) {
          const list = routes.split("|");
          return this.airports.filter(item => list.indexOf(item.key) != -1);
        }
      }
      return this.airports;
    }
  },
  watch: {
    dateStart() {
      this.modalPicker = false;
    },
    dateEnd() {
      this.modalPicker = false;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day} / ${month} / ${year}`;
    },
    filter(item, queryText, itemText) {
      queryText = removeAccent(queryText);
      itemText = removeAccent(itemText);
      return itemText.indexOf(queryText) > -1;
    },
    onSearch() {
      const params = {
        destinationSend: this.destination,
        sourceSend: this.source,
        dateSend: this.dateStart,
        dataNumberCustomer: this.numCustomer
      };
      this.$emit("clicked", params);
    }
  }
};
</script>

<style scoped>
</style>
