<template>
  <base-layout pageTitle="Cart">
    <div class="container cart" v-if="cart[0]">
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
          <p>{{ formatMoney(taxFees) }}₫</p>
        </div>
        <div>
          <p>Delivery</p>
          <p>{{ formatMoney(shipFees) }}₫</p>
        </div>
        <div>
          <p>Total</p>
          <p>{{ formatMoney(priceCart + shipFees + taxFees) }}</p>
        </div>
      </div>
      <button class="btn-all" @click="checkOut">Check out</button>
    </div>
    <ion-card v-else class="empty-cart">
      <h1>Giỏ hàng trống</h1>
      <router-link to="/home"><button class="btn-all">Mua ngay</button></router-link>
    </ion-card>
  </base-layout>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
import { alertController, toastController } from "@ionic/vue";
import { Storage } from "@ionic/storage";
export default defineComponent({
  name: "Detail",
  setup() {
    return { trashOutline };
  },
  data() {
    return {
      address: "",
      localStorage: new Storage(),
      userData: {},
    };
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
    urlAPI() {
      return this.$store.getters.urlAPI;
    },
    taxFees() {
      return this.priceCart / 10;
    },
    shipFees() {
      if (this.priceCart > 200000 || this.priceCart == 0) return 0;
      return 12000;
    },
  },
  async mounted() {
    this.localStorage.create();
    this.userData = await this.localStorage.get("userData");
  },
  methods: {
    async checkOut() {
      let addressList = [];
      let add = "Hà Nội;Hà Tây;Đồng Hới;Sơn Tây";
      add.split(";").forEach((item) => {
        addressList.push({
          type: "radio",
          label: item,
          handler: () => {
            this.address = item;
          },
        });
      });
      const alert = await alertController.create({
        cssClass: "alertClass",
        header: "Địa chỉ",
        inputs: addressList,
        buttons: [
          {
            text: "Hủy",
            role: "cancel",
          },
          {
            text: "Đặt hàng",
            handler: this.OrderHandle,
          },
        ],
      });
      return alert.present();
    },
    async OrderHandle() {
      if (!this.cart[0]) return;
      for (let item of this.cart) {
        let body = {
          user_id: this.userData.data[0].id,
          product_id: item.id,
          phone: this.userData.data[0].phone,
          address: this.address,
          price: item.price * item.quantity,
          quantity: item.quantity,
          status: "yes",
        };
        axios.post(this.urlAPI + "bills", body).then((response) => {
          console.log(response);
        });
      }
      this.$store.dispatch("removeAllCart");
      const toast = await toastController.create({
        message: "Đặt hàng thành công",
        duration: 2000,
        header: "Thông báo",
        position: "top",
      });
      return toast.present();
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