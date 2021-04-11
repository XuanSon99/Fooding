<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon :icon="homeOutline" />
          <!-- <ion-label>Home</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/search">
          <ion-icon :icon="searchOutline" />
          <!-- <ion-label>Search</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/cart">
          <ion-icon :icon="cartOutline" />
          <!-- <ion-label>Like</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/profile">
          <ion-icon :icon="personCircleOutline" />
          <!-- <ion-label>Info</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  // IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import {
  homeOutline,
  searchOutline,
  cartOutline,
  personCircleOutline,
} from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      homeOutline,
      searchOutline,
      cartOutline,
      personCircleOutline,
    };
  },
};
</script>