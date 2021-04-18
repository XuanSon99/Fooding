<template>
  <base-layout>
    <div class="signup">
      <form action="">
        <label for="">Họ tên</label>
        <input type="text" v-model="name" required />
        <label for="">SĐT</label>
        <input type="phone" v-model="phone" required />
        <label for="">Mật khẩu</label>
        <input type="password" v-model="password" required />
        <label for="">Xác nhận mật khẩu</label>
        <input type="password" v-model="repassword" required />
        <button type="submit" @click="register">Đăng ký</button>
        <router-link tag="a" to="/login">Đăng nhập ngay?</router-link>
      </form>
    </div>
  </base-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      phone: "",
      password: "",
      name: "",
      repassword: "",
    };
  },
  methods: {
    register(e) {
      e.preventDefault();
      axios
        .post("http://127.0.0.1:8000/api/auth/signup", {
          name: this.name,
          phone: this.phone,
          password: this.password,
          password_confirmation: this.repassword,
          level: "customer"
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
<style>
.signup {
  width: 100%;
  height: 100vh;
  background: url("/images/login2.jpg") center;
  background-size: cover;
  padding: 15vh 0;
}
.signup form {
  margin: 0 auto;
  background: url("/images/login4.gif") center;
  background-size: cover;
  width: 90%;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 4px 4px 15px 3px #000;
}
.signup label {
  display: block;
  color: #fff;
  margin-bottom: 5px;
}
.signup input {
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
.signup input:hover,
.signup button:hover {
  box-shadow: 4px 4px 15px 3px #000;
}
.signup button {
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
.signup a {
  display: block;
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  text-decoration: none;
  transition: all 300ms ease;
}
.signup a:hover {
  color: #fff;
}
</style>