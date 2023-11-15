<template>
  <ul>
    <li>
      <VideoCard @video-hover="handleHover">
        <template v-slot:outer>
          <VideoInfo
            content="내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다"
            username="Inseung Hwang"
          />
        </template>
      </VideoCard>
      <VideoCard @video-hover="handleHover">
        <template v-slot:outer>
          <VideoInfo
            content="내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다"
            username="Inseung Hwang"
          />
        </template>
      </VideoCard>
      <VideoCard @video-hover="handleHover">
        <template v-slot:outer>
          <VideoInfo
            content="내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다"
            username="Inseung Hwang"
          />
        </template>
      </VideoCard>
    </li>
  </ul>
</template>

<script setup lang="ts">
import VideoCard from './VideoCard.vue';
import VideoInfo from './VideoInfo.vue';
import type { Ref } from 'vue';

const queue: Ref<boolean>[] = [];
const handleHover = (showVideoRef: Ref<boolean>) => {
  //해당 영상만 재생
  showVideoRef.value = true;
  queue.push(showVideoRef);
  if (queue.length > 1) {
    while (queue.length > 1) {
      queue.shift()!.value = false;
    }
  }
};
</script>

<style scoped></style>
