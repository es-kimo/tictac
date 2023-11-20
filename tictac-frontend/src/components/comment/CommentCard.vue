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
          <button @click="handleUpdateCommentButton" v-if="isSameUser">수정</button>
          <button @click="handleDeleteCommentButton">삭제</button>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCommentStore } from '@/stores/comment';
import { useRoute } from 'vue-router';

const route = useRoute();
const commentStore = useCommentStore();

const props = defineProps({
  comment: Object
});

const getLoginUser = () => {
  const token = sessionStorage.getItem('access-token').split('.');
  let id = token[1]; // 3개 중에 payload 고름
  id = atob(id);
  id = JSON.parse(id);
  comment.value.commentId = id['userId'];
  comment.value.username = id['username'];
};

const isSameUser = props.comment.username === props.comment.username;

const handleUpdateCommentButton = () => {
  commentStore.updateComment(route.params.videoId, comment.value);
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
