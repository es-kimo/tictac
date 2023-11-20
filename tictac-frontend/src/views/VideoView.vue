<template>
  <div>video detail</div>
  <CommentUploadCard />
  <CommentCard v-for="comment in commentList" :comment="comment" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CommentUploadCard from '@/components/comment/CommentUploadCard.vue';
import CommentCard from '@/components/comment/CommentCard.vue';

const route = useRoute();
const commentList = ref([]);

const getCommentList = function () {
  axios.get(`http://localhost:8080/video/${route.params.videoId}/comment`).then((response: any) => {
    commentList.value = response.data;
    // console.log(response.data);
  });
};

onMounted(() => {
  getCommentList();
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
