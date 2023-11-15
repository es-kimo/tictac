import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import UserView from '@/views/UserView.vue';
import VideoView from '@/views/VideoView.vue';
import VideoUploadView from '@/views/VideoUploadView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 유저 정보
    {
      path: '/:username',
      name: 'user',
      component: UserView,
      children: [
        // 비디오 디테일
        {
          path: '/video/:videoId',
          name: 'videoDetail',
          component: VideoView
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: VideoUploadView
    }
  ]
});

export default router;
