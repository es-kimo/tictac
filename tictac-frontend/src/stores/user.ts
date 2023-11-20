import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();

const REST_USER_API = `http://localhost:8080`;

export const useUserStore = defineStore('user', () => {
  const loginUserId = ref('');
  const loginUsername = ref('');
  const loginEmail = ref('');

  // const base64ToArrayBuffer = (string) => {
  //   var len = string.length;
  //   var bytes = new Uint8Array(len);
  //   for (var i = 0; i < len; i++) {
  //     bytes[i] = string.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // }

  const login = function (id: string, pw: string) {
    axios
      .post(`${REST_USER_API}/login`, {
        userId: id,
        password: pw
      })
      .then((response: any) => {
        console.log(response);

        sessionStorage.setItem('access-token', response.data['access-token']);

        const token = response.data['access-token'].split('.');
        let id = token[1]; // 3개 중에 payload 고름
        id = atob(id);
        id = JSON.parse(id);
        // console.log(id);
        console.log(id['userId']);
        console.log(id['username']);
        console.log(id['email']);
        loginUserId.value = id['userId'];
        loginUsername.value = id['username'];
        // loginUsername.value = new TextDecoder().decode(base64ToArrayBuffer(id['username']));
        loginEmail.value = id['email'];
        console.log(id['username']);
        // console.log(base64ToArrayBuffer(id['username']));
        // console.log(loginUsername.value)
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return { login, loginUserId, loginUsername, loginEmail };
});
