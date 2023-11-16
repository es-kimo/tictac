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
      <RouterLink to="/@ryurlah">
        <img class="img-profile" src="@/assets/sample/excitedinseun.png" alt="" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import SearchBar from './SearchBar.vue';
import IconBase from '../icon/IconBase.vue';
import IconPlus from '../icon/IconPlus.vue';
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
}

.btn-upload {
  display: flex;
  gap: 2px;

  padding: 4px 16px 4px 8px;
  font-size: 16px;
  border: 1px solid var(--vt-c-text-dark-2);
}

.btn-upload:hover {
  background-color: var(--vt-c-divider-dark-2);
}

.img-profile {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  object-fit: cover;
}
</style>
