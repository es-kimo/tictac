<template>
  <div>
    <form action="" @submit.prevent="handleUploadCommentButton">
      <!-- <label for="content"></label> -->
      <input type="text" id="content" name="content" placeholder="댓글을 입력하세요.." v-model="comment.content" />
      <button type="submit" class="btn-uploadComment" :disabled="!isFormFilled">등록</button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCommentStore } from '@/stores/comment';
// import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import router from '@/router';

const commentStore = useCommentStore();
// const userStore = useUserStore();
const route = useRoute();

const isFormFilled = computed(() => comment.value.content.length > 0);


function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

const getLoginUser = () => {
  const token = sessionStorage.getItem('access-token').split('.');
  let loginInfo = token[1]; // 3개 중에 payload 고름
  loginInfo = b64DecodeUnicode(loginInfo);
  console.log(loginInfo);
  loginInfo = JSON.parse(loginInfo);

  comment.value.userId = loginInfo['userId'];
  comment.value.username = loginInfo['username'];
};

const comment = ref({
  userId: '', // commentId 말고 userId
  username: '',
  content: ''
});


const handleUploadCommentButton = async () => {
  getLoginUser();
  console.log(comment.value);
  await commentStore.uploadComment(route.params.videoId, comment.value);
  router.go(0);
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
