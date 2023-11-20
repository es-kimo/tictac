<template>
  <header class="app-header">
    <h1 class="tit-header"><RouterLink to="/">TicTac</RouterLink></h1>
    <SearchBar></SearchBar>
    <div class="cont-nav">
      <RouterLink to="/upload" class="btn-upload">
        <IconBase icon-name="upload">
          <IconPlus></IconPlus>
        </IconBase>
        업로드
      </RouterLink>
      <RouterLink to="/login" class="btn-login" v-if="isLogin"> 로그인 </RouterLink>
      <a v-else @click.prevent="logout">로그아웃</a>
      <RouterLink to="/@ryurlah">
        <img class="img-profile" src="@/assets/sample/excitedinseun.png" alt="" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from 'vue-router';

import SearchBar from './SearchBar.vue';
import IconBase from '../icon/IconBase.vue';
import IconPlus from '../icon/IconPlus.vue';
import router from "@/router";

const isLogin = ref(sessionStorage.getItem('access-token') == null);

const checkLogin = () => {
  isLogin.value = sessionStorage.getItem('access-token') == null;
}

const logout = () => {
  sessionStorage.removeItem('access-token')
  alert('로그아웃됨')
  router.go(0) // 새로고침
}

onMounted(() => {
  checkLogin
  console.log("온마운트")
  console.log(isLogin.value)
  console.log(sessionStorage.getItem('access-token') )
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vt-c-text-dark-2);

  padding: 0 16px 0 24px;
}

.tit-header {
  font-size: 42px;
  font-weight: bolder;
}

.cont-nav {
  display: flex;
  gap: 20px;
  align-items: center;
  font-weight: bold;
}

.btn-upload {
  display: flex;
  gap: 2px;

  padding: 4px 16px 4px 8px;
  font-size: 16px;
  border: 1px solid var(--vt-c-text-dark-2);
}

.btn-login {
  padding: 4px 16px;
  font-size: 16px;
  border: 1px solid var(--vt-c-text-dark-2);
  background-color: hsla(160, 100%, 37%, 1);
  color: var(--vt-c-white-soft);
  border-radius: 4px;
}

.btn-login:hover {
  background-color: rgb(0, 165, 110);
}

.btn-upload:hover {
  background-color: var(--vt-c-text-dark-2);
}

.img-profile {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  object-fit: cover;
}
</style>
