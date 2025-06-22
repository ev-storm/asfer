<template>
  <header>
    <ul>
      <li><nuxt-link to="/">Главня</nuxt-link></li>
      <li><nuxt-link to="/services">Услуги</nuxt-link></li>
      <li><nuxt-link to="/portfolio">Портфолио</nuxt-link></li>
      <li><nuxt-link to="/about">О компании</nuxt-link></li>
    </ul>
  </header>

  <h1>список</h1>

  <main>
    <slot />
  </main>
</template>
