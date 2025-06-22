<script setup>
import { ref, computed, watch } from "vue";
import { useMouse } from "@vueuse/core";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const { x, y } = useMouse();
const xModal = ref(0);
const updateXModal = () => {
  xModal.value =
    typeof window !== "undefined" ? window.innerWidth - 450 : xModal.value;
};
watch([x, y], () => {
  updateXModal();
});
</script>

<template>
  <transition name="fade">
    <div class="modal-con" v-show="isVisible">
      <div class="modal">
        <div class="modal_title">
          <nuxt-img src="/svg/logo-mini.svg" alt="logo-modal" />
          <h2 class="actent-font">
            Обратная <br />
            связь
          </h2>
        </div>
      </div>
      <div
        class="cursor-modal"
        :style="{
          left: x + 'px',
          top: y - 180 + 'px',
          transform: 'translateX(-' + xModal + 'px)',
        }"
      ></div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "~/assets/css/modal.scss";
</style>
