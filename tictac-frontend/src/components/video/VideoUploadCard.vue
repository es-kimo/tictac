<template>
  <div>
    <!-- before drop -->
    <article
      v-if="isBeforeDrop"
      draggable
      class="wrapper"
      @click="handleUploadButton"
      @drop.prevent="handleDrop"
      @dragover.prevent=""
      @change="handleChange"
    >
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
    <!-- after drop -->
    <article v-else class="cont-dropped">
      <canvas ref="canvasElem" style="display: none"></canvas>
      <div class="cont-pick">
        <div class="cont-candidate">
          <img
            v-for="snapshot in snapshots"
            :key="snapshot"
            :src="snapshot"
            alt="candidate"
            class="img-candidate"
          />
        </div>
        <div class="cont-chosen">
          <video
            preload="auto"
            @loadedmetadata="onLoaded"
            src=""
            ref="videoElem"
            class="video-chosen"
          ></video>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, nextTick } from 'vue';

import IconBase from '../icon/IconBase.vue';
import IconVideo from '@/components/icon/IconVideo.vue';

const inputElem: Ref<null | HTMLInputElement> = ref(null);
const handleUploadButton = () => {
  inputElem.value!.click();
};

// 파일 업로드
const isBeforeDrop = ref(true);
const videoElem: Ref<null | HTMLVideoElement> = ref(null);
const canvasElem: Ref<null | HTMLCanvasElement> = ref(null);
// 1.기존 input upload 방식
const handleChange = () => {
  if (!inputElem.value?.files) return;
  const file = inputElem.value?.files[0];
  fileHandler(file);
};
// 2. drag & drop
const handleDrop = (e: DragEvent) => {
  if (!e.dataTransfer) return;
  const file = e.dataTransfer.files[0];
  fileHandler(file);
};
// 3. 공통 로직
const snapshots: Ref<string[]> = ref([]);
const fileHandler = async (file: File) => {
  if (!file?.type.startsWith('video')) {
    alert('지원되지 않는 파일입니다. 대신 mp4 등의 영상을 사용하세요.');
    return;
  }

  // change view
  isBeforeDrop.value = false;
  // wait
  await nextTick();
  const videourl = URL.createObjectURL(file);
  videoElem.value!.src = videourl;
};

const onLoaded = () => {
  const duration = videoElem.value!.duration;
  const term = Math.floor(duration / 8);

  // TODO: 맞는 방법인지 불확실
  let i = 1;
  var id: any;
  id = setInterval(() => {
    videoElem.value!.currentTime = i * term;
    canvasElem
      .value!.getContext('2d')!
      .drawImage(videoElem.value!, 0, 0, canvasElem.value!.width, canvasElem.value!.height);

    canvasElem.value!.toBlob((blob: any) => {
      snapshots.value.push(window.URL.createObjectURL(blob));
    });
    if (++i > 8) {
      clearInterval(id);
    }
  }, 200);
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

/* after dropped */
.cont-candidate {
  display: flex;
}
.img-candidate {
  width: 85.75px;
  height: 150px;
  object-fit: cover;
}

.cont-pick {
  position: relative;
  line-height: 0;
  padding: 6px;
  border: 1px solid var(--vt-c-white-mute);
  border-radius: 4px;
}
.cont-chosen {
  cursor: grab;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: translate3d(4px, 1px, 0px) scaleX(1.1) scaleY(1.1);
  border: 6px solid rgb(255, 255, 255);
  overflow: hidden;
  box-shadow: rgba(34, 90, 89, 0.2) 2px 4px 20px;
  border-radius: 8px;
}

.video-chosen {
  width: 85.75px;
  height: 150px;
  object-fit: cover;
  vertical-align: top;
}
</style>
