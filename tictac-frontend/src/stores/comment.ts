import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_COMMENT_API = `http://localhost:8080`;

export const useCommentStore = defineStore('user', () => {

  const commentList = ref([]);
  const getCommentList = function (videoId: any) {
    axios.get(REST_COMMENT_API + `/video/${videoId}/comment`).then((response: any) => {
      commentList.value = response.data;
      // console.log(response.data);
    });
  };
  
  const uploadComment = function (videoId: Number, comment: any) {
    console.log(comment.username);
    return axios({
      url: REST_COMMENT_API + `/video/${videoId}/comment`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 아래줄 - spring interceptor가 토큰 유효성 검사하기 위해 넣음
        'access-token': sessionStorage.getItem('access-token')
      },
      data: {
        username: '김싸피', // 바꿔야함 - 원래있는 username이 꼭 들어와야함
        content: comment.content
      }
    })
      .then(() => {
        console.log('여기');
        console.log(videoId);
        //   router.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = function (videoId: Number, commentId: any) {
    console.log(commentId);
    // return axios({
    //   url: REST_COMMENT_API + `/video/${videoId}/comment`,
    //   method: 'DELETE',
    //   data: {
    //           commentId: commentId
    //         }
    //       });
    return axios
      .delete(
        REST_COMMENT_API + `/video/${videoId}/comment`,
        {
          params: {
          commentId: commentId
        },
      });
  };

  return { commentList, getCommentList, uploadComment, deleteComment };
});
