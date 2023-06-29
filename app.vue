<template>
  <div class="flex flex-column min-h-screen">
    <HeaderVue />
    <main id="main"><NuxtPage /></main>
    <FooterVue />
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}

#main {
  min-height: calc(100vh - 70px);
}
</style>
