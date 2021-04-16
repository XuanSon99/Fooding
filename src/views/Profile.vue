<template>
  <base-layout pageTitle="Profile">
    <ion-card class="profile">
      <h1>
        {{ user.name }}
        <ion-icon :icon="heart"></ion-icon>
      </h1>
      <span @click="updateProfile"
        ><ion-icon :icon="cloudUpload"></ion-icon>Cập nhật thông tin</span
      >
      <span><ion-icon :icon="navigateCircle"></ion-icon>Thêm địa chỉ</span>
      <span @click="theOrder"
        ><ion-icon :icon="cart"></ion-icon>Đơn hàng của tôi</span
      >
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
import { alertController } from "@ionic/vue";
export default defineComponent({
  name: "Tab2",
  components: {},
  data() {
    return {
      localStorage: new Storage(),
      user: "",
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
      this.user = result.data[0];
    },
    logOutHandle() {
      this.localStorage.clear();
      this.$router.push("/login");
    },
    async updateProfile() {
      const alert = await alertController.create({
        cssClass: "alertClass",
        header: "Thông tin",
        inputs: [
          {
            value: this.user.name,
            attributes: {
              inputmode: "text",
            },
          },
          {
            value: this.user.phone,
            type: "number",
            attributes: {
              readOnly: "true",
            },
          },
          {
            value: this.user.email,
            type: "email",
            attributes: {
              inputmode: "text",
            },
          },
        ],
        buttons: [
          {
            text: "Hủy",
            role: "cancel",
          },
          {
            text: "Cập nhật",
            handler: () => {
              console.log("Confirm Ok");
            },
          },
        ],
      });
      return alert.present();
    },
    theOrder() {
      this.$router.push("/my-order/" + this.user.id);
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