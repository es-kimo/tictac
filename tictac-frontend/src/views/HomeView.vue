<template>
  <TheHeader />
  <div class="cont-main">
    <SideNav />
    <div class="cont-right">
      <template v-if="showHome">
        <CategoryList @update-category="updateCategory" />
        <div>
          <p>{{ categoryId }}</p>
          <p>{{ categoryInfo }}</p>
        </div>
        <VideoList :category-id="categoryId" />
      </template>
      <RouterView v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

import CategoryList from '@/components/video/CategoryList.vue';
import VideoList from '@/components/video/VideoList.vue';
import TheHeader from '@/components/common/TheHeader.vue';
import SideNav from '@/components/common/SideNav.vue';

const route = useRoute();
//TODO: 문제 생길수도 있는 부분
const showHome = computed(() => route.fullPath === '/');

const categoryId = ref('파쿠르');
const updateCategory = (category: string) => {
  categoryId.value = category;
  console.log(categoryId.value);
  console.log(categoryInfo.value);
  console.log(categoryMap);
  console.log(categoryMap.get('파쿠르'));
};

const categoryMap = new Map();
categoryMap.set('파쿠르', '맨몸으로 지형, 사물을 효율적으로 이용하여 이동하는 운동');
categoryMap.set('스케이트보드', '스케이트보드를 타고 주행과 기술을 선보이는 자유로운 길거리문화');
categoryMap.set('카포에라', '춤, 무술, 음악이 결합돼서 만들어진 브라질 전통 무술');
categoryMap.set('광선검', '스타워즈 광선검 펜싱');
categoryMap.set('독 어질리티', '개(dog) 장애물 달리기');

const categoryInfo = computed(() => categoryMap.get(categoryId));
// console.log(categoryMap.get(categoryId));
// console.log(categoryInfo.value);

// const categoryInfo2 = [
//   {
//     id: '파쿠르',
//     info: '맨몸으로 지형, 사물을 효율적으로 이용하여 이동하는 운동'
//   },
//   {
//     id: '스케이트보드',
//     info: '스케이트보드를 타고 주행과 기술을 선보이는 자유로운 길거리문화'
//   },
//   {
//     id: '카포에라',
//     info: '춤, 무술, 음악이 결합돼서 만들어진 브라질 전통 무술'
//   },
//   {
//     id: '광선검',
//     info: '스타워즈 광선검 펜싱'
//   },
//   {
//     id: '독 어질리티',
//     info: '개(dog) 장애물 달리기'
//   },
// ]
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
