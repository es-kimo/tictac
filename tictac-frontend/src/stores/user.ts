import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

const REST_VIDEO_API = `http://localhost:8080/`;

const router = useRouter();

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

        router.push({ name: 'home' }); // home으로 가게하는게 맞을까??
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return { login, loginUserId, loginUsername, loginEmail };
});
