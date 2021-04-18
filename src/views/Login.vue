<template>
  <base-layout>
    <div class="login">
      <form action="">
        <label for="">Số điện thoại</label>
        <input type="number" v-model="phone" required />
        <label for="">Mật khẩu</label>
        <input type="password" v-model="password" required />
        <button type="submit" @click="login">Đăng nhập</button>
        <router-link tag="a" to="/register">Đăng ký tài khoản?</router-link>
      </form>
    </div>
  </base-layout>
</template>

<script>
import axios from "axios";
import { Storage } from "@ionic/storage";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      localStorage: new Storage(),
    };
  },
  mounted() {
    this.localStorage.create();
  },
  computed: {
    urlAPI() {
      return this.$store.getters.urlAPI;
    },
  },
  methods: {
    login(e) {
      e.preventDefault();
      let body = {
        phone: this.phone,
        password: this.password,
      };
      axios.post(this.urlAPI + "auth/login", body).then((response) => {
        // this.$store.dispatch("saveUserData", response.data);
        this.localStorage.set("userData", response.data.data[0]);
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100vh;
  background: url("/images/login2.jpg") center;
  background-size: cover;
  padding: 25vh 0;
}
.login form {
  margin: 0 auto;
  background: url("/images/login4.gif") center;
  background-size: cover;
  width: 90%;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 4px 4px 15px 3px #000;
}
.login label {
  display: block;
  color: #fff;
  margin-bottom: 5px;
}
.login input {
  display: block;
  width: 100%;
  height: 40px;
  outline: none;
  box-shadow: 4px 4px 15px 3px rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0 10px;
  border-radius: 7px;
  margin-bottom: 15px;
  transition: all 300ms ease;
  border: none;
  background: none;
}
.login input:hover,
.login button:hover {
  box-shadow: 4px 4px 15px 3px #000;
}
.login button {
  display: block;
  color: #fff;
  height: 40px;
  width: 120px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 7px;
  box-shadow: 4px 4px 15px 3px rgba(0, 0, 0, 0.6);
  outline: none;
  transition: all 300ms ease;
  background: none;
  font-weight: bold;
}
.login a {
  display: block;
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  text-decoration: none;
  transition: all 300ms ease;
}
.login a:hover {
  color: #fff;
}
</style>
