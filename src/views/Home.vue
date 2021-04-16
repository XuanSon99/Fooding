<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header">
        <ion-buttons slot="start">
          <router-link to="/Check-out"
            ><ion-icon :icon="locationOutline"
          /></router-link>
        </ion-buttons>
        <ion-buttons class="btn-header">
          <router-link to="/search"
            ><ion-icon :icon="searchOutline"
          /></router-link>
        </ion-buttons>
        <img src="/images/header.svg" alt="" />
        <ion-buttons slot="end">
          <router-link to="/cart"><ion-icon :icon="cartOutline" /></router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="home-content">
      <ion-card class="banner">
        <ion-grid>
          <ion-row>
            <ion-col size="6" class="title">
              <div>
                <h2>20% off to any fast food</h2>
                <p>Valid until April 12</p>
              </div>
            </ion-col>
            <ion-col size="6" class="image">
              <img
                src="https://mcdonalds.vn/uploads/2018/food/burgers/mcchicken-deluxe.png"
                alt=""
              />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <div class="container">
        <h1 class="title-2">Categories</h1>
        <div class="categories">
          <div
            class="cate"
            v-for="(item, index) in cateList"
            :key="index"
            @click="toCategory(item.id)"
          >
            <img :src="'http://127.0.0.1:8000/' + item.image" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <h1 class="title-1" style="margin-top: 10px">Let's eat</h1>
        <ion-slides pager="true" :options="slideOpts">
          <ion-slide v-for="(item, index) in list" :key="index">
            <img :src="item.image" alt="" />
          </ion-slide>
        </ion-slides>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage, IonSlides, IonSlide } from "@ionic/vue";
import { locationOutline, cartOutline, searchOutline } from "ionicons/icons";

export default defineComponent({
  components: { IonPage, IonSlides, IonSlide },
  setup() {
    const slideOpts = {
      // initialSlide: 1,
      // speed: 400,
      centeredSlide: true,
      loop: true,
      spacebetween: -100,
    };
    return { slideOpts, locationOutline, cartOutline, searchOutline };
  },
  data() {
    return {
      cateList: [],
      list: [{image: "http://127.0.0.1:8000/storage/images/k9Ufh48avJEjiBkNPauh51tnzwb3EdNhHN59jUml.png"}]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("http://127.0.0.1:8000/api/categories").then((response) => {
        this.cateList = response.data;
      });
    },
    toCategory(id) {
      this.$router.push("/product/" + id);
    },
  },
});
</script>
