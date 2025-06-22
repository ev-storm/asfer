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

const modalRef = ref(null);

const CURSOR_SIZE = 200;

const cursorPos = ref({ left: -1000, top: -1000 });

const updateCursorPos = () => {
  if (!props.isVisible || !modalRef.value) {
    cursorPos.value = { left: -1000, top: -1000 };
    return;
  }

  const rect = modalRef.value.getBoundingClientRect();

  let mouseX = x.value;
  let mouseY = y.value;

  const minX = rect.left + CURSOR_SIZE / 2;
  const maxX = rect.left + rect.width - CURSOR_SIZE / 2;
  const minY = rect.top + CURSOR_SIZE / 2;
  const maxY = rect.top + rect.height - CURSOR_SIZE / 2;

  mouseX = Math.max(minX, Math.min(maxX, mouseX));
  mouseY = Math.max(minY, Math.min(maxY, mouseY));

  cursorPos.value = {
    left: mouseX - CURSOR_SIZE / 2 + "px",
    top: mouseY - CURSOR_SIZE / 2 + "px",
  };
};
watch([x, y], updateCursorPos);

watch(
  () => props.isVisible,
  (val) => {
    if (val) {
      nextTick(updateCursorPos);
    } else {
      cursorPos.value = { left: -1000, top: -1000 };
    }
  }
);
</script>

<template>
  <transition name="fade-modal">
    <div class="modal" ref="modalRef" v-show="isVisible">
      <div class="modal_title">
        <nuxt-img src="/svg/logo-mini.svg" alt="logo-modal" />
        <h2 class="actent-font">
          Обратная <br />
          связь
        </h2>
      </div>
    </div>
  </transition>
  <transition name="fade-cursor">
    <div class="cursor-modal" :style="cursorPos" v-show="isVisible"></div>
  </transition>
</template>

<style scoped lang="scss">
@import "~/assets/css/modal.scss";
</style>
