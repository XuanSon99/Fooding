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
        <div>
          <img src="/images/star.svg" alt="" />
          <p>4.9 (2.8k)</p>
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
export default defineComponent({
  name: "Detail",
  data() {
    return {
      list: [
        {
          image: "https://mcdonalds.vn/uploads/2018/2-ga-ran.png",
          name: "Combo",
          description: "So delicious, so you should buy it right now",
          price: "36.000",
        },
        {
          image:
            "https://mcdonalds.vn/uploads/2018/food/burgers/mcchicken-deluxe.png",
          name: "Burgers",
          description: "So delicious, so you should buy it right now",
          price: "40.000",
        },
        {
          image:
            "https://mcdonalds.vn/uploads/2018/food/ga-ran/large_world_famous_fries.png",
          name: "Snack",
          description: "So delicious, so you should buy it right now",
          price: "28.000",
        },
        {
          image:
            "https://mcdonalds.vn/uploads/2018/food/beverage/hero-pdt-Fanta-201703_0.png",
          name: "Drink",
          description: "So delicious, so you should buy it right now",
          price: "38.000",
        },
        {
          image:
            "https://mcdonalds.vn/uploads/2018/food/rice/MEAL_porkrice.png",
          name: "Pork Rice",
          description: "So delicious, so you should buy it right now",
          price: "68.000",
        },
        {
          image:
            "https://mcdonalds.vn/uploads/2018/food/desserts/hotfudge_mcsundae.png",
          name: "Cream",
          description: "So delicious, so you should buy it right now",
          price: "18.000",
        },
      ],
      product: {},
    };
  },
  methods: {
    getDetail() {
      axios
        .get("http://127.0.0.1:8000/api/products/" + this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          console.log(this.product);
        });
    },
    addCart() {
      let data = {
        id: this.product.id,
        image: this.product.image,
        name: this.product.name,
        description: this.product.time,
        price: this.product.price,
        quantity: 1,
      };
      this.$store.dispatch("addCart", data);
      this.$router.push("/cart");
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  mounted() {
    this.getDetail();
  },
});
</script>