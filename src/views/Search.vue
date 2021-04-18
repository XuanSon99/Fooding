<template>
  <base-layout pageTitle="Search">
    <div class="textbox">
      <input
        type="text"
        v-model="search"
        @input="removeSearch"
        placeholder="Tìm kiếm..."
      />
      <span @click="searchHandle"
        ><ion-icon :icon="searchOutline"></ion-icon
      ></span>
    </div>
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
        <span>₫ {{ formatMoney(item.price) }}</span>
      </div>
    </ion-card>
  </base-layout>
</template>

<script>
import axios from "axios";
import { searchOutline } from "ionicons/icons";
export default {
  name: "Tab2",
  setup() {
    return { searchOutline };
  },
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
          this.proList = response.data.data;
        });
    },
    removeSearch() {
      if (!this.search) {
        this.getList();
      }
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
