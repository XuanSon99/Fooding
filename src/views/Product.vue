<template>
  <base-layout pageTitle="Combo">
    <ion-card
      v-for="(item, index) in productList"
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tab2",
  // components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      productList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get("http://127.0.0.1:8000/api/categories/" + this.$route.params.id)
        .then((response) => {
          this.productList = response.data;
        });
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
});
</script>