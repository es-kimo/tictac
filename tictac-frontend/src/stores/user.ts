import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@router'
import axios from 'axios'

const REST_VIDEO_API = `http://localhost:8080/`

export const useUserStore = defineStore('user', () => {
    const loginUserId = ref('')
    const loginUsername = ref('')
    const loginEmail = ref('')
    const userLogin = function (id, pw){
        axios.post(`${REST_VIDEO_API}/login`, {id, pw})
        .then((response)=>{
            console.log(response)

            sessionStorage.setItem('access-token', response.data["access-token"])
        
            const token = response.data['access-token'].split('.')
            let id = token[1] // 3개 중에 payload 고름
            id = atob(id)
            id = JSON.parse(id)
            console.log(id['userId'])
            loginUserId.value = id['userId']
            loginUsername.value = id['userName']
            loginEmail.value = id['email']

            // router.push({name : "home"}) // home으로 가게하는게 맞을까??

        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return { userLogin, loginUserId, loginUsername, loginEmail }
})
