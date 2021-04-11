<template>
  <!-- <base-layout pageTitle="Profile"> -->
  <ion-page>
    <ion-card class="profile">
      <span class="avatar">
        <ion-icon :icon="heart"></ion-icon>
      </span>
      <span class="tab active">Thông tin cá nhân</span>
      <span class="tab">Liên kết tài khoản</span>
      <span class="tab">Lịch sử đặt hàng</span>
      <span class="tab">Vị trí đã lưu</span>
    </ion-card>
  </ion-page>
  <!-- </base-layout> -->
</template>

<script>
import { defineComponent } from "vue";
import { heart } from "ionicons/icons";
export default defineComponent({
  name: "Tab2",
  components: {},
  data() {
    return {};
  },
  setup() {
    return {
      heart,
    };
  },
  mounted() {
    let tab = document.querySelectorAll(".tab");
    tab.forEach((item) => {
      item.onclick = function () {
        tab.forEach((i) => {
          i.classList.remove("active");
        });
        item.classList.add("active");
      };
    });
  },
});
</script>
<style>
.tab.active {
  box-shadow: 4px 4px 10px #000000, -4px -4px 10px #401e64,
    inset 4px 4px 10px #000000, inset -4px -4px 10px #401e64;
}
.profile {
  margin: 0;
  height: calc(100vh - 50px);
  border-radius: 0;
}
</style>
