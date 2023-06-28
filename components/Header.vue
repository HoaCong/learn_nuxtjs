<template>
  <header
    class="flex justify-content-between align-items-center p-3 surface-400"
  >
    <div>
      <NuxtLink to="/" class="text-5xl text-900 font-bold no-underline"
        >MENT</NuxtLink
      >
    </div>
    <div>
      <NuxtLink
        to="/about"
        class="text-900 hover:text-blue-500 font-medium text-xl"
        v-bind:class="{ 'text-blue-500': isLinkActive('/about') }"
        >About</NuxtLink
      >
      <NuxtLink
        to="/todo"
        class="text-900 ml-2 hover:text-blue-500 font-medium text-xl"
        v-bind:class="{
          'text-blue-500': isLinkActive('/todo'),
        }"
        >Todo</NuxtLink
      >
    </div>
  </header>
</template>

<script>
export default defineComponent({
  methods: {
    isLinkActive(route) {
      return this.$route.path === route;
    },
  },
});
</script>

<style>
/*  */
</style>
