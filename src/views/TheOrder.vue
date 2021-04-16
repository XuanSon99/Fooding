<template>
  <base-layout pageTitle="Đơn hàng">
    <ion-card class="my-bill" v-for="item in orderList" :key="item.id">
      <table>
        <tr>
          <td>Sản phẩm</td>
          <td>{{ item.product.name }}</td>
        </tr>
        <tr>
          <td>Số lượng</td>
          <td>{{ item.quantity }}</td>
        </tr>
        <tr>
          <td>Giá tiền</td>
          <td>{{ item.price }}</td>
        </tr>
        <tr>
          <td>Thời gian</td>
          <td>12/12/2021</td>
        </tr>
        <tr>
          <td>Trạng thái</td>
          <td>{{ item.status == "yes" ? "Đang chờ" : "Đã giao" }}</td>
        </tr>
      </table>
    </ion-card>
    <!-- <ion-card v-else class="empty-cart">
      <h1>Giỏ hàng trống</h1>
      <router-link to="/home"
        ><button class="btn-all">Mua ngay</button></router-link
      >
    </ion-card> -->
  </base-layout>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { trashOutline } from "ionicons/icons";
export default defineComponent({
  name: "Detail",
  setup() {
    return { trashOutline };
  },
  data() {
    return {
      orderList: [],
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    urlAPI() {
      return this.$store.getters.urlAPI;
    },
  },
  methods: {
    getList() {
      axios
        .get(this.urlAPI + "bills/" + this.$route.params.id)
        .then((response) => {
          this.orderList = response.data;
        });
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
});
</script>