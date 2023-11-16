<template>
  <div>video detail</div>
</template>

<script setup lang="ts">
//TODO: 땜빵한 거라 수정하거나 제거해야됨.
if (!location.hash) {
  location.hash = '#reload';
  location.href = location.href;
}
/*
ie 지원
if (location.href.indexOf('#reload') == -1) location.href += '#reload';
*/
</script>

<style scoped></style>
