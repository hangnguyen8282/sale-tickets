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
                <v-text-field v-model="fightNumber" label="Fight Number"></v-text-field>
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
              <v-flex md12>
                <v-date-picker v-model="dateEnd" no-title color="purple">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modalPicker = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(dateEnd)">OK</v-btn>
                </v-date-picker>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="priceEconomic" label="Price Economic"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="priceBussiness" label="Price Bussiness"></v-text-field>
              </v-flex>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = false">Thêm</v-btn>
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
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="10"></v-pagination>
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
      pagination: { rowsPerPage: 10 },
      selected: [],
      dialog: false,
      fightNumber: "",
      planeCode: "",
      airportGo: "",
      airportTo: "",
      dateTime: "",
      priceEconomic: "",
      priceBussiness: ""
    };
  },
  async created() {
    const result = await axios({
      url: "http://localhost:3000/get-flights"
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