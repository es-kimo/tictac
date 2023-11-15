<template>
  <div class="wrapper">
    <RouterLink to="">
      <img src="@/assets/sample/excitedinseun.png" alt="프로필 사진입니다." class="img-profile" />
    </RouterLink>
    <RouterLink to="" class="link-username">{{ user.username }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps(['user']);
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  height: 24px;
  display: flex;
  gap: 10px;
}

.img-profile {
  height: 100%;
  border-radius: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
