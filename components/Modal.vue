<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <transition name="fade-modal">
    <div class="modal" ref="modalRef" v-show="isVisible">
      <div class="modal_title">
        <img src="/svg/logo-mini.svg" alt="logo-modal" />
        <h2 class="actent-font">
          Обратная <br />
          связь
        </h2>
      </div>
      <form class="main-form">
        <select class="input" name="work-item">
          <option value="work-item_1">Билдборд</option>
          <option value="work-item_2">Цифровые экраны</option>
          <option value="work-item_3">Реклама на транспорте</option>
          <option value="work-item_4">Остановки в вашем стиле</option>
        </select>
        <input class="input" type="text" placeholder="имя" />
        <input class="input" type="text" placeholder="компания" />
        <input class="input" type="tel" placeholder="телефон" />
        <input class="input" type="mail" placeholder="почта" />
        <input type="submit" class="btn btn-form" value="отправить" />
        <label for="check-more">
          <input id="check-more" type="checkbox" />
          <h2>Детальное описание проекта</h2>
        </label>
        <label for="check-pol">
          <input id="check-pol" type="checkbox" />
          <h2>Согласен с политикой конфиденциальности</h2>
        </label>
      </form>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "~/assets/css/modal.scss";
</style>
