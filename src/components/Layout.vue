<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header">
        <ion-buttons slot="start" class="header-title">
          {{ pageTitle }}
        </ion-buttons>
        <ion-buttons class="btn-header">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <img src="/images/header.svg" alt="" />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { arrowBackOutline } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";

export default defineComponent({
  props: ["pageTitle"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackButton,
    IonButtons,
  },
  setup() {
    return { arrowBackOutline };
  },
});
</script>