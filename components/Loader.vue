<template>
  <div v-if="loading" class="loader-overlay">
    <img :src="loaderSrc" alt="Loading..." class="loader-image" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const loading = ref(true);
const loaderSrc = ref("/svg/loader.svg");

// Зафиксируем время старта Loader
const loaderStart = Date.now();

function hideLoader() {
  const minDuration = 2500;
  const elapsed = Date.now() - loaderStart;
  const remaining = Math.max(0, minDuration - elapsed);

  setTimeout(() => {
    loading.value = false;
  }, remaining);
}

onMounted(() => {
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }
});

onUnmounted(() => {
  window.removeEventListener("load", hideLoader);
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: #2626265e;
  backdrop-filter: blur(50px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-image {
  width: 100vw;
  height: auto;
  transition: opacity 0.3s ease-in-out;
}
</style>
