<template>
  <Menubar>
    <template v-slot:start>
      <NuxtLink to="/" class="text-5xl text-900 font-bold no-underline"
        >MENT</NuxtLink
      >
    </template>
    <template v-slot:end>
      <NuxtLink
        to="/about"
        class="text-900 hover:text-blue-500 font-medium"
        v-bind:class="{ 'text-blue-500': isLinkActive('/about') }"
        >About</NuxtLink
      >
      <NuxtLink
        to="/todo"
        class="text-900 ml-2 hover:text-blue-500 font-medium"
        v-bind:class="{ 'text-blue-500': isLinkActive('/todo') }"
        >Todo</NuxtLink
      >
    </template>
  </Menubar>
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
