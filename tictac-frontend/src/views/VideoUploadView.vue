<template>
  <div>
    <div>upload</div>
    <button @click="uploadVideo">임시버튼</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVideoStore } from '@/stores/video';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useVideoStore();

const video = ref({
  videoId: 10014, // 값 바꿔야함
  userId: 'ssafy',
  content: '0',
  videoSrc: '0',
  regDate: '0',
  thumbnailImgSrc: '0',
  categoryId: '0'
});

const uploadVideo = function () {
  store.uploadVideo(video.value);
};
</script>

<style scoped></style>
