<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const items = ref([
  {
    x: 20,
    y: 20,
    vx: 0,
    vy: 0,
    tx: 20,
    ty: 20,
    noiseX: 0,
    noiseY: 0,
    color: "#1f92f0",
  },
  {
    x: 50,
    y: 40,
    vx: 0,
    vy: 0,
    tx: 50,
    ty: 40,
    noiseX: 0,
    noiseY: 0,
    color: "#ff7f98",
  },
  {
    x: 70,
    y: 60,
    vx: 0,
    vy: 0,
    tx: 70,
    ty: 60,
    noiseX: 0,
    noiseY: 0,
    color: "#5fffbb",
  },
]);

let animationFrame;
let mouse = { x: 0, y: 0 };
let scrollY = 0;

function updateMouse(e) {
  mouse.x = e.clientX / window.innerWidth;
  mouse.y = e.clientY / window.innerHeight;
}
function updateScroll() {
  scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
}

function animate() {
  const time = Date.now() * 0.001;
  for (let i = 0; i < items.value.length; i++) {
    let item = items.value[i];

    item.noiseX += (Math.random() - 0.5) * 0.15;
    item.noiseY += (Math.random() - 0.5) * 0.15;
    item.noiseX = Math.max(-7, Math.min(7, item.noiseX));
    item.noiseY = Math.max(-7, Math.min(7, item.noiseY));

    let baseX = 30 + 40 * Math.sin(time * 0.1 + i) + item.noiseX;
    let baseY = 30 + 30 * Math.cos(time * 0.09 + i) + item.noiseY;

    const mousePull = 0.8 + 0.3 * Math.sin(time * 0.3 + i);
    baseX += (mouse.x - 0.5) * 8 * mousePull;
    baseY += (mouse.y + scrollY - 0.5) * 8 * mousePull;

    for (let j = 0; j < items.value.length; j++) {
      if (i !== j) {
        const dx = item.x - items.value[j].x;
        const dy = item.y - items.value[j].y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 250) {
          const force = (250 - dist2) * 0.00045;
          baseX += dx * force;
          baseY += dy * force;
        }
      }
    }

    item.tx = baseX;
    item.ty = baseY;

    // Плавная инерция: скорость тянется к (tx, ty), а x/y — к скорости
    item.vx += (item.tx - item.x) * 0.018;
    item.vy += (item.ty - item.y) * 0.018;

    // Плавное затухание движения
    item.vx *= 0.92;
    item.vy *= 0.92;

    item.x += item.vx;
    item.y += item.vy;

    // Мягкий bounce от границ окна (оставляем рамку 10vw)
    if (item.x < 10) {
      item.x = 10;
      item.vx *= -0.4;
    }
    if (item.x > 90) {
      item.x = 90;
      item.vx *= -0.4;
    }
    if (item.y < 8) {
      item.y = 8;
      item.vy *= -0.4;
    }
    if (item.y > 78) {
      item.y = 78;
      item.vy *= -0.4;
    }
  }

  animationFrame = requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener("mousemove", updateMouse);
  window.addEventListener("scroll", updateScroll);
  animate();
});
onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
  window.removeEventListener("scroll", updateScroll);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <div class="back-items-con">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="back-items"
      :style="{
        left: item.x + 'vw',
        top: item.y + 'vh',
        transition: 'none',
        background: item.color,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/css/back.scss";
</style>
