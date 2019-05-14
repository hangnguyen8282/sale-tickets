<template>
  <div class="about">
    <v-container>
      <v-card-title>
        <v-flex xs6 md4 class="title">Thông tin chuyến bay</v-flex>
        <v-flex xs6 md4>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn height="10px;" fab color="success" v-on="on">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <v-card class="pop-up">
              <v-card-title class="title">Thêm chuyến bay</v-card-title>
              <v-flex md12>
                <v-text-field v-model="flightNumber" label="Flight Number"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="planeCode" label="Plane Code"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="airportGo" label="Airport Go"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="airportTo" label="Airport To"></v-text-field>
              </v-flex>
              <v-layout row wrap>
                <v-flex md12>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Date Time"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-flex md12>
                <v-text-field v-model="priceEconomic" label="Price Economic"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="priceBussiness" label="Price Bussiness"></v-text-field>
              </v-flex>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="addFlightAdmin">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs6 md4>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Tìm kiếm"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="info"
        :search="search"
        hide-actions
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.flight_number }}</td>
          <td>{{ props.item.planes_code }}</td>
          <td>{{ props.item.airport_go }}</td>
          <td>{{ props.item.airport_to }}</td>
          <td>{{ new Date(props.item.datetime * 1000).toISOString().slice(0,10) }}</td>
          <td>{{ props.item.price_economy }}</td>
          <td>{{ props.item.price_bussiness }}</td>
          <!-- <td>
            <v-btn color="success" small>Sửa</v-btn>
            <v-btn color="success" @click="deleteFlight(props.item._id)">Xóa</v-btn>
          </td> -->
          <td>
            <v-btn color="success" fab small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn fab small color="error" @click="deleteFlight(props.item._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="15"></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [
        { text: "Flight Number", value: "flight_number" },
        { text: "Plane Code", value: "planes_code" },
        { text: "Airport Go", value: "airport_go" },
        { text: "Airport To", value: "airport_to" },
        { text: "Date Time", value: "datetime" },
        { text: "Price Economy", value: "price_economy" },
        { text: "Price Bussiness", value: "price_bussiness" }
      ],
      info: [],
      search: "",
      pagination: { rowsPerPage: 30 },
      dateEnd: null,
      selected: [],
      dialog: false,
      flightNumber: "",
      planeCode: "",
      airportGo: "",
      airportTo: "",
      dateTime: "",
      priceEconomic: "",
      priceBussiness: "",
      datetime: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      addFlight: {}
    };
  },
  async created() {
    const result = await axios({
      url: "http://192.168.1.220:3000/get-flights"
    });
    this.info = result.data.data;
    this.pagination.totalItems = this.info.length;
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    async addFlightAdmin(){
      this.dialog = false
      const flightAdmin = {
        flightNumber: this.flightNumber,
        planeCode: this.planeCode,
        airportGo: this.airportGo,
        airportTo: this.airportTo,
        date: this.date,
        priceEconomic: this.priceEconomic,
        priceBussiness: this.priceBussiness
      };
      const result = await axios({
        method: "post",
        url: "http://localhost:3000/add-flight",
        data: flightAdmin
      });
    },
    async deleteFlight(_id) {
      this.info = this.info.filter(item => item._id != _id)
      const result = await axios({
        method: "get",
        url: "http://localhost:3000/delete-flight",
        params: {_id}
      });
    }
  }
};
</script>
<style>
.pop-up {
  padding: 30px;
}
.about .title {
  text-align: left;
}
</style>