<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();

const mouseOpacity = computed(() => {
  const opacityValue = 100 - y;
  return Math.max(0, Math.min(100, opacityValue));
});

const xMenu = ref(0);
function updateXMenu() {
  if (typeof window !== "undefined") {
    xMenu.value = window.innerWidth / 2 - 350;
  }
}
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
  </header>

  <main>
    <slot />
  </main>
</template>

<style>
a {
  text-transform: uppercase;
}

header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8;
}
.menu-con {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40%;
  max-width: 800px;
  overflow: hidden;
  border-radius: 200px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #03194130;
  backdrop-filter: blur(70px);
  border-radius: 200px;
  width: 99.9%;
  font-size: 15px;
  padding: 10px 100px;
  z-index: 10;
  overflow: hidden;
}

.cursor-menu {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  transition: opacity 0.5s ease-in-out;
}
</style>
