import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

export interface Video {
  videoId: number;
  userId: string;
  content: string;
  videoSrc: string;
  orgVideoSrc: string;
  regDate: Date;
  heartCnt: number;
  bookmarkCnt: number;
  viewCnt: number;
  thumbnailImgSrc: string;
  orgThumbnailImgSrc: string;
  categoryId: string;
}

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
  const uploadVideo = function (formData: any) {
    // console.log(video.videoId);
    // console.log(video.userId);
    axios
      .post(REST_VIDEO_API + '/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-token': sessionStorage.getItem('access-token')
        }
      })
      .then((res) => {
        console.log(res);
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
