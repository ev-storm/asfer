<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <transition name="fade">
    <div class="modal" v-show="isVisible" @click.self="isVisible = false">
      <div class="modal_title">
        <nuxt-img src="/svg/logo-mini.svg" alt="logo-modal" />
        <h2 class="actent-font">
          Обратная <br />
          связь
        </h2>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "~/assets/css/variables.scss";
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transform: translateX(50px);
  transition: $tran;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: translateX(0px);
}
</style>
