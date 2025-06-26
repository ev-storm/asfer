<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useMouse } from "@vueuse/core";
import { useRouter } from "vue-router";

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

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const router = useRouter();
const currentPage = ref(router.currentRoute.value.path);
const setCurrentPage = (path) => {
  currentPage.value = path;
  router.push(path);
};

const indicatorStyle = computed(() => {
  const menuItems = {
    "/": { left: "13%" },
    "/services": { left: "32%" },
    "/portfolio": { left: "54%" },
    "/about": { left: "80%" },
  };

  return {
    ...menuItems[currentPage.value],
  };
});

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    currentPage.value = newPath;
  }
);
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

      <div class="indicator" :style="indicatorStyle"></div>
    </div>
    <button class="modal-btn">
      <transition name="fade-menu-btn">
        <img
          v-if="!isModalVisible"
          @click="openModal"
          class="open-btn"
          src="/svg/modal-open.svg"
          alt="Открыть модальное окно"
        />
      </transition>
      <transition name="fade-menu-btn">
        <img
          v-if="isModalVisible"
          @click="closeModal"
          class="close-btn"
          src="/svg/modal-close.svg"
          alt="Закрыть модальное окно"
        />
      </transition>
    </button>
    <Modal :isVisible="isModalVisible" />
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/css/menu.scss";
</style>
