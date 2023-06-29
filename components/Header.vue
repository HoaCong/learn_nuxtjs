<template>
  <header
    class="flex justify-content-between align-items-center p-3 surface-400"
  >
    <div>
      <NuxtLink
        id="logo"
        to="/"
        class="text-5xl text-900 font-bold no-underline"
        >MENT</NuxtLink
      >
    </div>
    <div>
      <NuxtLink
        id="about"
        to="/about"
        class="text-900 hover:text-blue-600 font-medium text-xl"
        v-bind:class="{ 'text-blue-500': isLinkActive('/about') }"
        >About</NuxtLink
      >
      <NuxtLink
        id="todo"
        to="/todo"
        class="text-900 ml-2 hover:text-blue-600 font-medium text-xl"
        v-bind:class="{
          'text-blue-500': isLinkActive('/todo'),
        }"
        >Todo</NuxtLink
      >
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    isLinkActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style>
/*  */
</style>
