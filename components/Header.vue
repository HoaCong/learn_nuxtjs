<template>
  <Menubar>
    <template v-slot:start>
      <NuxtLink to="/" class="logo">MENT</NuxtLink>
    </template>
    <template v-slot:end>
      <NuxtLink
        to="/about"
        class="text-900"
        v-bind:class="{ 'text-blue-500': isLinkActive('/about') }"
        >About</NuxtLink
      >
      <NuxtLink
        to="/todo"
        class="text-900 ml-2"
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
.logo {
  font-size: 25px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
}

.logo:hover {
  background-color: unset;
}

.header-right a {
  margin-left: 16px;
}
.header-right a:hover {
  text-decoration: underline;
  color: rgb(5, 99, 250);
}

.header-right a.active {
  text-decoration: underline;
  color: rgb(5, 99, 250);
}
</style>
