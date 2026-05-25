<template>
  <div id="app">
    <!-- Здесь будут отображаться страницы в зависимости от URL -->
    <RouterView />
  </div>
</template>

<script setup>
// Ничего дополнительного не требуется — RouterView уже глобально доступен
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>