<template>
  <div>
    <form action="" @submit.prevent="handleUploadCommentButton">
      <!-- <label for="content"></label> -->
      <input
        type="text"
        id="content"
        name="content"
        placeholder="댓글을 입력하세요.."
        v-model="comment.content"
      />
      <button type="submit" class="btn-uploadComment" :disabled="!isFormFilled">등록</button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import router from '@/router';

const commentStore = useCommentStore();
const userStore = useUserStore();
const route = useRoute();

// const content = ref('');
const isFormFilled = computed(() => comment.value.content.length > 0);

const getLoginUser = () => {
  const token = sessionStorage.getItem('access-token').split('.');
  let id = token[1]; // 3개 중에 payload 고름
  id = atob(id);
  id = JSON.parse(id);
  //   comment.value.commentId = id['userId']; // 아님 commentId는 1 2 3 4 임
  comment.value.username = id['username'];
};

const comment = ref({
  //   commentId: '',
  username: '',
  content: ''
});

const handleUploadCommentButton = () => {
  getLoginUser();
  console.log(comment.value);
  commentStore.uploadComment(route.params.videoId, comment.value);
  //   router.go(0);
};
</script>

<style scoped>
.btn-uploadComment {
  padding: 4px 16px;
  font-size: 16px;
  border: 1px solid var(--vt-c-text-dark-2);
  background-color: hsla(160, 100%, 37%, 1);
  color: var(--vt-c-white-soft);
  border-radius: 4px;
}
</style>
