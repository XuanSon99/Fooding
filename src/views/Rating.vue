<template>
  <base-layout pageTitle="Bình luận">
    <div class="textbox cmt">
      <input type="text" v-model="content" placeholder="Nhập bình luận..." />
      <span @click="rateHandle"><ion-icon :icon="star"></ion-icon></span>
      <span @click="sendComment"
        ><ion-icon :icon="arrowRedoOutline"></ion-icon
      ></span>
    </div>
    <ion-card class="comment rate" v-if="show">
      <p>Đánh giá</p>
      <div class="rate-star">
        <div>
          <span v-for="item of 5" :key="item">
            <input
              type="radio"
              name="rate"
              :value="item"
              v-model="rateStar"
              :id="'rate-' + item"
            />
            <label :for="'rate-' + item"
              ><ion-icon :icon="starHandle(item)"></ion-icon
            ></label>
          </span>
        </div>
        <button @click="sendRate">Gửi</button>
      </div>
    </ion-card>
    <ion-card class="comment" v-for="item of listCmt" :key="item.id">
      <table>
        <tr>
          <td>
            <img
              src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
              alt=""
            />
          </td>
          <td>
            <p>
              {{ item.customer.name }}
              <ion-icon :icon="chatboxEllipses"></ion-icon>
            </p>
            <span
              ><ion-icon
                :icon="ratedStar(i, item.customer.id)"
                v-for="i of 5"
                :key="i"
              ></ion-icon
            ></span>
            {{ item.content }}
          </td>
        </tr>
      </table>
    </ion-card>
  </base-layout>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import {
  arrowRedoOutline,
  chatboxEllipses,
  star,
  starOutline,
} from "ionicons/icons";
import { Storage } from "@ionic/storage";

export default defineComponent({
  name: "Rating",
  setup() {
    return { arrowRedoOutline, chatboxEllipses, star, starOutline };
  },
  data() {
    return {
      listCmt: [],
      listRate: [],
      content: "",
      localStorage: new Storage(),
      user: "",
      show: false,
      rateStar: "",
    };
  },
  mounted() {
    this.localStorage.create();
    this.getList();
    this.getUserData();
    this.getListRate();
  },
  methods: {
    starHandle(value) {
      if (value <= this.rateStar) return star;
      return starOutline;
    },
    ratedStar(value, id) {
      for (let item of this.listRate) {
        if (item.customer.id == id) {
          if (value <= item.start) return star;
          return starOutline;
        }
      }
    },
    async getUserData() {
      this.user = await this.localStorage.get("userData");
    },
    getList() {
      axios
        .post("http://127.0.0.1:8000/api/comment", {
          product_id: this.$route.params.id,
        })
        .then((response) => {
          this.listCmt = response.data;
        });
    },
    getListRate() {
      axios
        .post("http://127.0.0.1:8000/api/rating", {
          product_id: this.$route.params.id,
        })
        .then((response) => {
          this.listRate = response.data;
        });
    },
    formatMoney(value) {
      return String(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sendComment() {
      if (!this.content) return;
      axios
        .post("http://127.0.0.1:8000/api/comments", {
          product_id: this.$route.params.id,
          content: this.content,
          user_id: this.user.id,
        })
        .then(() => {
          this.getList();
          this.content = "";
        });
    },
    rateHandle() {
      this.show = !this.show;
    },
    sendRate() {
      if (!this.rateStar) return;
      for (let item of this.listRate) {
        if (item.customer.id == this.user.id) {
          axios.delete("http://127.0.0.1:8000/api/ratings/" + item.id);
        }
      }
      axios
        .post("http://127.0.0.1:8000/api/ratings", {
          product_id: this.$route.params.id,
          start: this.rateStar,
          user_id: this.user.id,
        })
        .then(() => {
          this.getListRate();
          this.rateStar = "";
          this.show = !this.show;
        });
    },
  },
});
</script>