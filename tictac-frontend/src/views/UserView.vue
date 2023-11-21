<template>
  <div class="wrapper">
    <BigProfile :user="user"></BigProfile>
    <div class="cont-nav">
      <ul class="list-nav" id="tabList">
        <li v-for="tab in tabs" :key="tab.id">
          <TabItem
            v-bind="tab"
            v-model:current-id="currentId"
            v-model:current-width="currentWidth"
          ></TabItem>
        </li>
      </ul>
      <div :style="barStyle" class="bar"></div>
    </div>

    <section>
      <h3 class="tit-video">동영상</h3>
      <ul class="list-video">
        <!-- TODO: key 수정 -->
        <li v-for="video in currentContent" :key="video">
          <VideoCard :video="video"> </VideoCard>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import BigProfile from '@/components/profile/BigProfile.vue';
import TabItem from '@/components/common/TabItem.vue';
import VideoCard from '@/components/video/VideoCard.vue';
import { useVideoStore } from '@/stores/video';

const videoStore = useVideoStore();

const user = {
  username: sessionStorage.getItem('username'),
  id: sessionStorage.getItem('userId')
};

const getUploadList = async () => {
  await videoStore.getUploadList(user.id);
  // console.log(videoStore.videoList);
  // console.log(tabs[0].content);
  tabs[0].content = videoStore.videoList;
};

const getMyBookmarkList = async () => {
  await videoStore.getMyBookmarkList(user.id);
  console.log(videoStore.videoList);
  console.log(tabs[1].content);
  tabs[1].content = videoStore.videoList;
};

onMounted(() => {
  // 1. 업로드한 동영상 통신
  getUploadList();

  // 2. 찜한 동영상 통신
  getMyBookmarkList();
});

// tab
const currentId = ref(0);
const tabs = [
  { id: 0, label: '동영상', content: [1, 2], offset: 0 }, //비디오 객체가 들어갈 곳
  { id: 1, label: '즐겨찾기', content: [3], offset: 118 }
];
const currentContent = computed(() => tabs[currentId.value].content);

const currentWidth: Ref<Number> = ref(118);
const barStyle = computed(() => ({
  width: currentWidth.value + 'px',
  transform: 'translateX(' + tabs[currentId.value].offset + 'px)'
}));
</script>

<style scoped>
.list-nav {
  display: flex;
  margin-top: 40px;
  border-bottom: 1px solid var(--vt-c-text-dark-2);
}
.cont-nav {
  position: relative;
  margin-bottom: 20px;
}

.cont-nav .bar {
  position: absolute;
  height: 2px;
  background: rgb(22, 24, 35);
  bottom: 0px;
  transition: transform 0.3s ease 0s;
}

.tit-video {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
