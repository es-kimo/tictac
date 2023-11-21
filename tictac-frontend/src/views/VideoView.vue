<template>
  <div>video detail</div>
  <CommentUploadForm />
  <CommentCard v-for="comment in commentStore.commentList" :comment="comment" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCommentStore } from '@/stores/comment';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CommentUploadForm from '@/components/comment/CommentUploadForm.vue';
import CommentCard from '@/components/comment/CommentCard.vue';

const commentStore = useCommentStore();
const route = useRoute();


onMounted(() => {
  commentStore.getCommentList(route.params.videoId);
  // console.log(commentList.value);
});

//TODO: 땜빵한 거라 수정하거나 제거해야됨.
if (!location.hash) {
  location.hash = '#reload';
  location.href = location.href;
}
/*
ie 지원
if (location.href.indexOf('#reload') == -1) location.href += '#reload';
*/
</script>

<style scoped></style>
