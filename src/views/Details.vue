<template>
  <base-layout pageTitle="Sản phẩm">
    <div class="details container">
      <ion-slides pager="true">
        <ion-slide>
          <img :src="'http://127.0.0.1:8000/' + product.image" alt="" />
        </ion-slide>
        <ion-slide v-for="item in list" :key="item">
          <img :src="item.image" alt="" />
        </ion-slide>
      </ion-slides>
      <div class="detail">
        <div @click="toRating(product.id)">
          <img src="/images/star.svg" alt="" />
          <p>{{ rate }} ({{ count }} lượt)</p>
        </div>
        <div>
          <img src="/images/fire.svg" alt="" />
          <p>68 calories</p>
        </div>
        <div>
          <img src="/images/clock.svg" alt="" />
          <p>{{ product.time }}</p>
        </div>
      </div>
      <div class="name">
        <h1>{{ product.name }}</h1>
        <h2><span>₫</span>{{ formatMoney(product.price) }}</h2>
      </div>
      <span
        >Burgers is a sandwich consisting of one or more cooked patties of
        ground meat, usually beef, placed inside a sliced bread roll or bun. The
        patty may be pan fried, grilled, smoked or flame broiled.</span
      >
      <button class="btn-all" @click="addCart">Add to cart</button>
    </div>
  </base-layout>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { toastController } from "@ionic/vue";
export default defineComponent({
  name: "Detail",
  data() {
    return {
      product: {},
      rate: 0,
      count: 0,
    };
  },
  mounted() {
    this.getDetail();
    this.getRate();
  },
  methods: {
    getDetail() {
      axios
        .get("http://127.0.0.1:8000/api/products/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
        });
    },
    getRate() {
      axios
        .post("http://127.0.0.1:8000/api/rating", {
          product_id: this.$route.params.id,
        })
        .then((response) => {
          this.count = response.data.length;
          for (let item of response.data) {
            this.rate += item.start;
          }
          this.rate = (this.rate / this.count).toFixed(1);
        });
    },
    async addCart() {
      let data = {
        id: this.product.id,
        image: this.product.image,
        name: this.product.name,
        description: this.product.time,
        price: this.product.price,
        quantity: 1,
      };
      this.$store.dispatch("addCart", data);
      const toast = await toastController.create({
        message: "Thêm thành công",
        duration: 2000,
        header: "Thông báo",
        position: "top",
        cssClass: "toastClass",
      });
      return toast.present();
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toRating(id) {
      this.$router.push("/rating/" + id);
    },
  },
});
</script>