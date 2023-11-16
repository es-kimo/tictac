<template>
  <TheHeader />
  <div class="cont-main">
    <SideNav />
    <div class="cont-right">
      <VideoList v-if="showHome" />
      <RouterView v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import VideoList from '@/components/video/VideoList.vue';
import TheHeader from '@/components/common/TheHeader.vue';
import SideNav from '@/components/common/SideNav.vue';

const route = useRoute();
//TODO: 문제 생길수도 있는 부분
const showHome = computed(() => route.fullPath === '/');
</script>

<style scoped>
.cont-main {
  display: flex;
  height: 100vh;
}

.cont-right {
  padding: 32px 24px 36px;
  width: 100%;
}
</style>
