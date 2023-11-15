<template>
  <div class="cont-video-info">
    <p class="txt-content">{{ content }}</p>
    <SmallProfile :user="user" />
  </div>
</template>

<script setup lang="ts">
import SmallProfile from '../Profile/SmallProfile.vue';

defineProps(['content', 'user']);
const user = {
  // user dto
  username: 'Inseung Hwang',
  id: ''
};
</script>

<style scoped>
.cont-video-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.txt-content {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
