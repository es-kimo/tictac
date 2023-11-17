import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

const REST_VIDEO_API = `http://localhost:8080`;

export const useVideoStore = defineStore('video', () => {
  // 1. 영상 리스트

  const videoList = ref([]);

  const getWholeVideoList = function () {
    axios.get(REST_VIDEO_API + '/videoList').then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getSearchList = function () {
    axios.get(REST_VIDEO_API + '/videoList/search').then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getCategoryList = function (categoryId: String) {
    axios.get(REST_VIDEO_API + `/videoList/${categoryId}`).then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getUploadList = function (userId: String) {
    axios.get(REST_VIDEO_API + `uploadList/${userId}`).then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getMyBookmarkList = function (userId: String) {
    axios.get(REST_VIDEO_API + `myBookmarkList/${userId}`).then((response: any) => {
      videoList.value = response.data;
    });
  };

  // 2. 영상 1개

  const video = ref({});

  // 영상 조회
  const getVideo = function (videoId: Number) {
    axios.get(REST_VIDEO_API + `/video/${videoId}`).then((response: any) => {
      video.value = response.data;
    });
  };

  // 영상 등록
  const uploadVideo = function (video: any) {
    console.log(video.videoId);
    console.log(video.userId);
    axios({
      url: REST_VIDEO_API + '/video',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': sessionStorage.getItem('access-token')
      },
      params: {
        videoId: video.videoId,
        // session 잘 연결되면 userId를 access-token에서 가져오면 될듯
        userId: video.userId,
        content: video.content,
        videoSrc: video.videoSrc,
        regDate: video.regDate,
        thumbnailImgSrc: video.thumbnailImgSrc,
        categoryId: video.categoryId
      }
    })
      .then(() => {
        console.log(video.videoId);
        console.log(video.userId);
        router.push({
          name: 'login'
          //   params: { username: video.userId, videoId: video.videoId }
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  };

  // 영상 수정 (미완)
  //   const updateVideo = function (video)

  // 영상 삭제 (미완)

  return {
    videoList,
    getWholeVideoList,
    getSearchList,
    getCategoryList,
    getUploadList,
    getMyBookmarkList,
    getVideo,
    uploadVideo
  };
});
