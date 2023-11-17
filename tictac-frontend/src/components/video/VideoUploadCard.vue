<template>
  <article class="wrapper" @click="handleUploadButton">
    <IconBase width="48" height="48" icon-color="var(--vt-c-text-light-2)">
      <IconVideo></IconVideo>
    </IconBase>
    <p class="cont-txt">
      <span style="font-size: 18px; color: black">업로드할 동영상 선택</span>
      <span>또는 파일을 끌어서 놓기</span>
      <span>MP4 파일</span>
      <span>720x1280 해상도 이상</span>
      <span>최대 3분</span>
      <span>3GB 미만</span>
    </p>

    <input ref="inputElem" accept="video/mp4" id="file" type="file" style="display: none" />
    <button class="btn-upload">파일 선택</button>
  </article>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

import IconBase from '../icon/IconBase.vue';
import IconVideo from '@/components/icon/IconVideo.vue';

const inputElem: Ref<null | HTMLInputElement> = ref(null);
const handleUploadButton = () => {
  inputElem.value!.click();
};
</script>

<style scoped>
.wrapper {
  padding: 80px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease-in-out 0s;
  border: 2px dashed var(--vt-c-text-dark-2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-width: 460px;
  max-width: 900px;
}

.wrapper:hover {
  background-color: var(--vt-c-text-dark-2);
}

span {
  font-size: 14px;
  color: var(--vt-c-text-light-2);
}
.cont-txt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.btn-upload {
  width: 100%;
  padding: 10px 0;
  background-color: hsla(160, 100%, 37%, 1);
  text-align: center;
  border-radius: 2px;
  color: var(--vt-c-white-soft);
}

.btn-upload:hover {
  background-color: rgb(0, 165, 110);
}
</style>
