<template>
  <header class="app-header">
    <h1 class="tit-header"><RouterLink to="/">TicTac</RouterLink></h1>
  </header>

  <LoginForm></LoginForm>
</template>

<script setup lang="ts">
import LoginForm from '@/components/user/LoginForm.vue';
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vt-c-text-dark-2);

  padding: 0 16px 0 24px;
}

.tit-header {
  font-size: 42px;
  font-weight: bolder;
}
</style>
