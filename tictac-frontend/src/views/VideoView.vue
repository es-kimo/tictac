<template>
  <div class="wrapper">
    <div class="cont-video">
      <video src="@/assets/sample/noeul.mp4" class="video" controls></video>
    </div>
    <div class="cont-info">
      <SmallProfile :user="user" />
      <p class="txt-title">제목이다.</p>
    </div>
    <CommentUploadForm />
    <CommentCard v-for="comment in commentStore.commentList" :comment="comment" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCommentStore } from '@/stores/comment';
import { useVideoStore } from '@/stores/video';
import { useRoute } from 'vue-router';

import CommentUploadForm from '@/components/comment/CommentUploadForm.vue';
import CommentCard from '@/components/comment/CommentCard.vue';
import SmallProfile from '@/components/Profile/SmallProfile.vue';

const user = {
  username: sessionStorage.getItem('username'),
  id: sessionStorage.getItem('userId')
};

const videoStore = useVideoStore();
const commentStore = useCommentStore();
const route = useRoute();

onMounted(() => {
  // videoStore.getVideo(parseInt(route.params.videoId as string));
  commentStore.getCommentList(route.params.videoId);
});

/*
ie 지원
if (location.href.indexOf('#reload') == -1) location.href += '#reload';
*/
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cont-video {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: green;
}

.video {
  width: 100%;
  object-fit: contain;
}
</style>
