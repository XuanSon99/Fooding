<template>
  <base-layout pageTitle="Search">
    <ion-searchbar
      :value="search"
      inputmode="text"
      animated
      color="light"
      @ionInput="search = $event.target.value"
      @ionChange="searchHandle"
    ></ion-searchbar>
    <!-- <div class="container">
      <h1 class="title-1" style="margin-top: 5px">Hot item</h1>
    </div> -->
    <ion-card
      v-for="(item, index) in proList"
      :key="index"
      class="category"
      @click="toDetail(item.id)"
    >
      <img :src="'http://127.0.0.1:8000/' + item.image" alt="" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.time }}</p>
        <span>₫ {{ item.price }}</span>
      </div>
    </ion-card>
  </base-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "Tab2",
  data() {
    return {
      search: "",
      proList: [],
    };
  },
  computed: {
    urlAPI() {
      return this.$store.getters.urlAPI;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get(this.urlAPI + "products").then((response) => {
        this.proList = response.data;
      });
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
    searchHandle() {
      axios
        .post(this.urlAPI + "search", { query: this.search })
        .then((response) => {
          console.log(response);
          this.proList = response.data.data;
        });
    },
  },
};
</script>
