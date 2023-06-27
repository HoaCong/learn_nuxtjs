<template>
  <header class="header">
    <NuxtLink to="/" class="logo">MENT</NuxtLink>
    <div class="header-right">
      <NuxtLink
        to="/about"
        class="menu"
        v-bind:class="{ active: isLinkActive('/about') }"
        >About</NuxtLink
      >
      <NuxtLink
        to="/todo"
        class="menu"
        v-bind:class="{ active: isLinkActive('/todo') }"
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  height: 70px;
  background-color: #f1f1f1;
}

.header a {
  text-decoration: none;
  color: #000;
}

.logo {
  font-size: 25px;
  font-weight: bold;
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
