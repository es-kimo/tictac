import { ref, computed, type Ref } from 'vue';
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

  const videoList: Ref<Video[]> = ref([]);

  const getWholeVideoList = function () {
    return axios.get(REST_VIDEO_API + '/videoList').then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getSearchList = function () {
    axios.get(REST_VIDEO_API + '/videoList/search').then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getCategoryList = function (categoryId: any) {
    axios.get(REST_VIDEO_API + `/videoList/${categoryId}`).then((response: any) => {
      videoList.value = response.data;
    });
  };

  const getUploadList = function (userId: any) {
    return axios.get(REST_VIDEO_API + `/uploadList/${userId}`).then((response: any) => {
      videoList.value = response.data;
      // console.log(videoList.value);
    });
  };

  const getMyBookmarkList = function (userId: any) {
    return axios.get(REST_VIDEO_API + `/myBookmarkList/${userId}`).then((response: any) => {
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
          name: 'home'
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  };

  // 영상 수정
  const updateVideo = function (video: any) {
    return axios.put(REST_VIDEO_API + '/video', video).then(() => {
      // 메서드 부른 곳에서 router.go(0)해야함
    });
  };

  // 영상 삭제
  const deleteVideo = function (videoId: any) {
    return axios.delete(REST_VIDEO_API + `/video/`, {
      data: {
        videoId: videoId
      }
    });
  };

  return {
    videoList,
    getWholeVideoList,
    getSearchList,
    getCategoryList,
    getUploadList,
    getMyBookmarkList,
    getVideo,
    uploadVideo,
    updateVideo,
    deleteVideo
  };
});
