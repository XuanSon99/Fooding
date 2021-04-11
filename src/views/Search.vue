<template>
  <base-layout pageTitle="Search">
    <ion-searchbar
      :value="search"
      inputmode="text"
      animated
      color="light"
      @ionInput="search = $event.target.value"
    ></ion-searchbar>
    <div class="container">
      <h1 class="title-1" style="margin-top: 5px">Hot item</h1>
    </div>
    <ion-card
      v-for="(item, index) in list"
      :key="item"
      class="category"
      @click="toDetail(index)"
    >
      <img :src="item.image" alt="" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <span>₫ {{ item.price }}</span>
      </div>
    </ion-card>
  </base-layout>
</template>

<script>
export default {
  name: "Tab2",
  data() {
    return {
      search: "",
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
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
};
</script>
