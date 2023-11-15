<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import TheHeader from './components/common/TheHeader.vue';
import TheSideNav from './components/common/TheSideNav.vue';
</script>

<template>
  <TheHeader />
  <div class="cont-main">
    <TheSideNav />
    <RouterView />
  </div>
</template>

<style scoped>
.cont-main {
  display: flex;
}
</style>
