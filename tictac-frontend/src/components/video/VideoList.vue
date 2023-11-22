<template>
  <ul>
    <li>
      <VideoCard @video-hover="handleHover" v-for="video in videoList" :video="video">
        <template v-slot:outer>
          <VideoInfo :content="video.content" :userId="video.userId" />
        </template>
      </VideoCard>
    </li>
  </ul>
</template>

<script setup lang="ts">
import VideoCard from './VideoCard.vue';
import VideoInfo from './VideoInfo.vue';
import { onMounted, ref, type Ref } from 'vue';
import { useVideoStore } from '@/stores/video';
import { type Video } from '@/stores/video';

const videoStore = useVideoStore();

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

const getWholeVideoList = async () => {
  await videoStore.getWholeVideoList();
  videoList.value = videoStore.videoList;
};

const videoList: Ref<Video[]> = ref([]);

onMounted(() => {
  getWholeVideoList();
});
</script>

<style scoped></style>
