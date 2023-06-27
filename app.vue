<template>
  <div id="template">
    <Header />
    <main id="main"><NuxtPage /></main>
    <Footer />
  </div>
</template>
<style>
#template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main {
  min-height: calc(100vh - 70px);
}
</style>
