<template>
  <div class="wrapper">
    <img class="img-profile" src="@/assets/sample/excitedinseun.png" />
    <ul class="cont-info">
      <li class="username">{{ comment.username }}</li>
      <li>{{ comment.content }}</li>
      <li>
        <ul class="regDate">
          <li>{{ comment.regDate }}</li>
          <button>회신</button>
          <button @click="handleDeleteCommentButton" v-if="isSameUser">삭제</button>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCommentStore } from '@/stores/comment';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const commentStore = useCommentStore();

const props = defineProps({
  comment: Object
});


function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

const isSameUser = () => {
  const token = sessionStorage.getItem('access-token').split('.');
  let loginInfo = token[1]; // 3개 중에 payload 고름
  loginInfo = b64DecodeUnicode(loginInfo);
  console.log(loginInfo);
  loginInfo = JSON.parse(loginInfo);

  // comment.value.userId = loginInfo['userId'];
  // comment.value.username = loginInfo['username'];
  return props.comment.username === loginInfo['username']; // userId로 바꾸기
};

// const isSameUser = props.comment.username === props.comment.username;

const handleDeleteCommentButton = async () => {
  console.log(isSameUser());
  await commentStore.deleteComment(route.params.videoId, props.comment.commentId);
  router.go(0)
};
</script>

<style scoped>
.username {
  font-weight: bold;
}

.regDate {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  gap: 10px;
  color: var(--vt-c-divider-dark-2);
}

.img-profile {
  height: 2rem;
  border-radius: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.wrapper {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  gap: 10px;
  padding: 10px;
}

.cont-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* button {
  border: 1px solid var(--vt-c-divider-light-2);
} */
</style>
