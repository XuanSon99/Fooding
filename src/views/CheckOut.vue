<template>
  <base-layout pageTitle="Maps">
    <ion-card>
      <g-map :disableUI="true" :zoom="18" mapType="roadmap" :center="center">
      </g-map>
    </ion-card>
    <button class="btn-all" @click="orderHandle">Order</button>
  </base-layout>
</template>

<script>
import GMap from "../components/Gmap.vue";
import { alertController } from "@ionic/vue";
export default {
  name: "Tab2",
  components: { GMap },
  data() {
    return {
      center: {},
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(this.getLocation);
  },
  methods: {
    getLocation(position) {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    },
    async orderHandle() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Đặt hàng",
        message: "Xác nhận đặt hàng",
        buttons: [
          {
            text: "Hủy",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Đặt hàng",
            handler: () => {
              console.log("Confirm Okay");
            },
          },
        ],
      });
      return alert.present();
    },
  },
};
</script>
