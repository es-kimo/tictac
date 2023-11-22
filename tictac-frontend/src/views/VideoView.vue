<template>
  <div class="wrapper-videoview">
    <div class="cont-video">
      <img ref="imgElem" src="" alt="background of video" class="img-background" />
      <video ref="videoElem" src="" class="video" controls></video>
    </div>
    <div class="cont-info">
      <RegularProfile :user="user"></RegularProfile>
      <p class="txt-title">{{ videoStore.video?.content }}</p>
      <CommentUploadForm />
      <CommentCard v-for="comment in commentStore.commentList" :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useCommentStore } from '@/stores/comment';
import { useVideoStore } from '@/stores/video';
import { useRoute } from 'vue-router';

import CommentUploadForm from '@/components/comment/CommentUploadForm.vue';
import CommentCard from '@/components/comment/CommentCard.vue';
import RegularProfile from '@/components/profile/RegularProfile.vue';
import type { User } from '@/stores/user';

const LOCAL_SERVER = import.meta.env.VITE_LOCAL_SERVER;

const user: User = {
  userId: sessionStorage.getItem('userId')!,
  username: sessionStorage.getItem('username')!
};

const videoStore = useVideoStore();
const commentStore = useCommentStore();
const route = useRoute();

const videoElem: Ref<null | HTMLVideoElement> = ref(null);
const imgElem: Ref<null | HTMLImageElement> = ref(null);

onMounted(async () => {
  await videoStore.getVideo(parseInt(route.params.videoId as string));
  videoElem.value!.src = `${LOCAL_SERVER}/stream/${videoStore.video!.videoSrc}`;
  imgElem.value!.src = `${LOCAL_SERVER}/thumbnail/${videoStore.video!.thumbnailImgSrc}`;
  console.log(commentStore);
  console.log(commentStore.getCommentList);
  await commentStore.getCommentList(route.params.videoId);
});

/*
ie 지원
if (location.href.indexOf('#reload') == -1) location.href += '#reload';
*/
</script>

<style scoped>
.wrapper-videoview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cont-video {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.video {
  width: 100%;
  aspect-ratio: 1/0.85;
  object-fit: contain;
}

.img-background {
  position: absolute;
  width: 100%;
  aspect-ratio: inherit;
  object-fit: cover;
  filter: blur(50px) brightness(0.8);
  z-index: -1;
}

.cont-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
</style>
