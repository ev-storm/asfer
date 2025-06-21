<script setup lang="ts">
import Modal from "~/components/Modal.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
const xMenu = ref(0);

const mouseOpacity = computed(() => Math.max(0, Math.min(100, 100 - y)));

const updateXMenu = () => {
  xMenu.value =
    typeof window !== "undefined" ? window.innerWidth / 2 - 270 : xMenu.value;
};

onMounted(() => {
  updateXMenu();
  window.addEventListener("resize", updateXMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateXMenu);
});

const isModalVisible = ref(false);

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <header>
    <div class="logo">
      <nuxt-link to="/"><img src="/svg/logo.svg" alt="logo" /></nuxt-link>
    </div>
    <div class="menu-con">
      <ul class="menu">
        <li><nuxt-link to="/">Главная</nuxt-link></li>
        <li><nuxt-link to="/services">Услуги</nuxt-link></li>
        <li><nuxt-link to="/portfolio">Портфолио</nuxt-link></li>
        <li><nuxt-link to="/about">О компании</nuxt-link></li>
      </ul>
      <div class="menu-line"></div>
      <div
        class="cursor-menu"
        :style="{
          opacity: (200 - y) / 100,
          left: x + 'px',
          transform: 'translateX(-' + xMenu + 'px)',
        }"
      ></div>
    </div>
    <button class="modal-btn" @click="toggleModal">
      <nuxt-img
        :src="isModalVisible ? '/svg/modal-close.svg' : '/svg/modal-open.svg'"
        alt=""
      />
    </button>
    <Modal :isVisible="isModalVisible" @close="closeModal" />
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.scss";
.modal-btn:active {
  scale: 0.9;
  transition: $tran;
}
</style>
