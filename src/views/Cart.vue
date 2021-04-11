<template>
  <base-layout pageTitle="Cart">
    <div class="container cart">
      <div class="product" v-for="item in cart" :key="item.id">
        <div class="about">
          <img :src="'http://127.0.0.1:8000/' + item.image" alt="" />
          <div>
            <p>{{ item.name }}</p>
            <span>{{ formatMoney(item.price) }}₫</span>
          </div>
        </div>
        <div class="total">
          <div class="amount">
            <span @click="quantityHandle(item, 0)">-</span>
            <p>{{ item.quantity }}</p>
            <span @click="quantityHandle(item, 1)">+</span>
          </div>
          <p>{{ formatMoney(priceTotal(item)) }}₫</p>
        </div>
        <div class="remove" @click="removeCart(item)">
          <ion-icon :icon="trashOutline"></ion-icon>
        </div>
      </div>
      <div class="total-price">
        <div>
          <p>Subtotal</p>
          <p>{{ formatMoney(priceCart) }}₫</p>
        </div>
        <div>
          <p>Tax $ Fee</p>
          <p>6.000₫</p>
        </div>
        <div>
          <p>Delivery</p>
          <p>12.000₫</p>
        </div>
        <div>
          <p>Total</p>
          <p>{{ formatMoney(priceCart + 18000) }}</p>
        </div>
      </div>
      <button class="btn-all" @click="checkOut">Check out</button>
    </div>
  </base-layout>
</template>

<script>
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
export default defineComponent({
  name: "Detail",
  setup() {
    return { trashOutline };
  },
  data() {
    return {};
  },
  computed: {
    priceCart() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.quantity * item.price;
      });
      return total;
    },
    cart() {
      return this.$store.getters.cart;
    },
  },
  methods: {
    checkOut() {
      this.$router.push("/check-out");
    },
    quantityHandle(item, method) {
      var index = this.cart.indexOf(item);
      let quantity = item.quantity;
      method == 0 ? (quantity > 1 ? quantity-- : quantity) : quantity++;
      this.cart[index].quantity = quantity;
    },
    priceTotal(item) {
      return item.quantity * item.price;
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    removeCart(item) {
      var index = this.cart.indexOf(item);
      this.$store.dispatch("removeCart", index);
    },
  },
});
</script>