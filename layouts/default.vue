<script setup lang="ts">
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
    <div class="modal-con">
      <div class="modal-btn">
        <img src="/public/svg/modal-open.svg" alt="" />
      </div>
      <div class="modal">
        <div class="modal_title">
          <img src="/svg/logo-mini.svg" alt="logo-modal" />
          <h2 class="actent-font">
            Обратная <br />
            связь
          </h2>
        </div>
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>
</template>

<style lang="scss">
@use "~/assets/css/menu.scss";
</style>
