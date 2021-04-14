<template>
  <base-layout pageTitle="Profile">
    <ion-card class="profile">
      <h1>
        {{ name }}
        <ion-icon :icon="heart"></ion-icon>
      </h1>
      <span><ion-icon :icon="cloudUpload"></ion-icon>Cập nhật thông tin</span>
      <span><ion-icon :icon="navigateCircle"></ion-icon>Thêm địa chỉ</span>
      <span><ion-icon :icon="cart"></ion-icon>Đơn hàng của tôi</span>
      <span @click="logOutHandle"
        ><ion-icon :icon="logOut"></ion-icon>Đăng xuất</span
      >
    </ion-card>
  </base-layout>
</template>

<script>
import { defineComponent } from "vue";
import { Storage } from "@ionic/storage";
import {
  heart,
  cloudUpload,
  navigateCircle,
  cart,
  logOut,
} from "ionicons/icons";
export default defineComponent({
  name: "Tab2",
  components: {},
  data() {
    return {
      localStorage: new Storage(),
      name: "",
    };
  },
  setup() {
    return {
      heart,
      cloudUpload,
      navigateCircle,
      cart,
      logOut,
    };
  },
  mounted() {
    this.localStorage.create();
    this.getUserData();
  },
  methods: {
    async getUserData() {
      let result = await this.localStorage.get("userData");
      this.name = result.data[0].name;
    },
    logOutHandle() {
      this.localStorage.clear();
      this.$router.push("/login");
    },
  },
});
</script>
<style>
.profile {
  background: #fff;
  color: #200f33;
}
.profile h1 {
  margin: 0;
  font-size: 18px;
  text-transform: uppercase;
  padding: 20px;
  background: linear-gradient(to bottom right, #ebeeff 0%, #f9e3e5 100%);
  height: 80px;
  display: flex;
  align-items: center;
  background: #200f33;
  color: #fff;
}
.profile h1 ion-icon {
  margin-left: 10px;
  color: #fa2500;
}
.profile > span {
  display: flex;
  padding: 0 20px;
  height: 50px;
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
}
.profile > span ion-icon {
  margin-right: 10px;
}
.profile span:not(:last-child) {
  border-bottom: 1px solid #200f3317;
}
</style>