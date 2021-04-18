<template>
  <base-layout pageTitle="Đơn hàng">
    <ion-card
      class="my-bill"
      v-show="orderList[0]"
      v-for="item in orderList"
      :key="item.bill_id"
    >
      <table v-for="i in item.products" :key="i.id">
        <tr>
          <td>
            <img :src="'http://127.0.0.1:8000/' + i.product.image" alt="" />
            <p>{{ i.product.name }}</p>
          </td>
          <td>{{ i.quantity }}</td>
          <td>{{ formatMoney(i.price) }}₫</td>
        </tr>
      </table>
      <div class="overview">
        <table>
          <tr>
            <td>{{ formatTime(item.products[0].time) }}</td>
            <td>{{ totalMoney(item.products) }}₫</td>
          </tr>
          <tr>
            <td>
              {{ item.products[0].status == "yes" ? "Chưa giao" : "Đã giao" }}
            </td>
            <td @click="cancelOrder(item.products)">
              {{ item.products[0].status == "yes" ? "Hủy" : "Xóa" }}
            </td>
          </tr>
        </table>
      </div>
    </ion-card>
    <ion-card v-show="!orderList[0]" class="empty-order">
      <h1>
        <span>Chưa có</span> <br />
        đơn hàng nào!
      </h1>
      <router-link to="/home"
        ><button class="btn-all">Mua ngay</button></router-link
      >
    </ion-card>
  </base-layout>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
import { Storage } from "@ionic/storage";
export default defineComponent({
  name: "order",
  setup() {
    return { trashOutline };
  },
  data() {
    return {
      localStorage: new Storage(),
      orderList: [],
      user: "",
    };
  },
  async mounted() {
    this.localStorage.create();
    await this.getUserData();
    this.getList();
  },
  computed: {
    urlAPI() {
      return this.$store.getters.urlAPI;
    },
    order() {
      return this.$store.getters.order;
    },
  },
  methods: {
    getList() {
      axios
        .post(this.urlAPI + "my-order", {
          user_id: this.user.id,
        })
        .then((response) => {
          this.orderList = response.data;
        });
    },
    async getUserData() {
      this.user = await this.localStorage.get("userData");
      return true;
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatTime(time) {
      return time.slice(0, 10).split("-").reverse().join("/");
    },
    totalMoney(list) {
      let total = 0;
      list.forEach((item) => {
        total += item.price;
      });
      return this.formatMoney(total);
    },
    cancelOrder(list) {
      list.forEach((item) => {
        axios.delete(this.urlAPI + "bills/" + item.id).then(() => {
          this.getList();
        });
      });
    },
  },
});
</script>