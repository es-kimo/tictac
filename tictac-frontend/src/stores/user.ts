import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_VIDEO_API = `http://localhost:8080/`;

export const useUserStore = defineStore('user', () => {
  const loginUserId = ref('');
  const loginUsername = ref('');
  const loginEmail = ref('');
  const login = function (id: string, pw: string) {
    axios
      .post(`${REST_VIDEO_API}/login`, { id, pw })
      .then((response: any) => {
        console.log(response);

        sessionStorage.setItem('access-token', response.data['access-token']);

        const token = response.data['access-token'].split('.');
        let id = token[1]; // 3개 중에 payload 고름
        id = atob(id);
        id = JSON.parse(id);
        console.log(id['userId']);
        loginUserId.value = id['userId'];
        loginUsername.value = id['userName'];
        loginEmail.value = id['email'];
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return { login, loginUserId, loginUsername, loginEmail };
});
