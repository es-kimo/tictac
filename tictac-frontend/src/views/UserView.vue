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
        <!-- TODO: key 수정: videoList에서 코드 가져옴 -->
        <li v-for="video in currentContent" :key="video">
          <!-- <VideoCard :video="video"> </VideoCard> -->
          <VideoCard @video-hover="handleHover" v-for="video in currentContent" :video="video">
        <template v-slot:outer>
          <VideoInfo :content="video.content" :username="video.userId" />
        </template>
      </VideoCard>
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
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import { type Video } from '@/stores/video';

const videoStore = useVideoStore();
const userStore = useUserStore();
const route = useRoute();

const user = {
  username: ref<String>(),
  id: route.params.userId.slice(1)
};

const getUsername = async () => {
  // console.log(route.params.userId.slice(1));
  await userStore.getUsername(route.params.userId.slice(1));
  user.username.value = userStore.username;
  console.log(user.username.value)
}

const getUploadList = async () => {
  await videoStore.getUploadList(user.id);
  // console.log(videoStore.videoList);
  // console.log(tabs[0].content);
  tabs[0].content = videoStore.videoList;
};

const getMyBookmarkList = async () => {
  await videoStore.getMyBookmarkList(user.id);
  // console.log(videoStore.videoList);
  // console.log(tabs[1].content);
  tabs[1].content = videoStore.videoList;
};

onMounted(() => {
  // 1. url에 적힌 userId에 대응하는 username 받음
  getUsername();

  // 2. 업로드한 동영상 통신
  getUploadList();

  // 3. 찜한 동영상 통신
  getMyBookmarkList();

  console.log(tabs[0])
});


// tab
const currentId = ref(0);
// TODO: content 타입 어떢하지
const tabs = [
  { id: 0, label: '동영상', content: Ref<Video[]>, offset: 0 }, //비디오 객체가 들어갈 곳
  { id: 1, label: '즐겨찾기', content: [], offset: 118 }
];
const currentContent = computed(() => tabs[currentId.value].content);

const currentWidth: Ref<Number> = ref(118);
const barStyle = computed(() => ({
  width: currentWidth.value + 'px',
  transform: 'translateX(' + tabs[currentId.value].offset + 'px)'
}));


// videoList에서 코드 가져옴
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
