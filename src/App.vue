<template>
  <div>
    <h1>create-liff-app</h1>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">
      <code>{{ error }}</code>
    </p>
    <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
      LIFF Documentation
    </a>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import liff from "@line/liff";

// export default {
const message = ref('')
const error = ref('')
onMounted(() => {
  liff
    .init({
      liffId: import.meta.env.VITE_LIFF_ID,
      withLoginOnExternalBrowser: true
    })
    .then(() => {
      const isLogin = liff.isLoggedIn()
      console.log(`isLogin: ${isLogin}`)
      message.value = "LIFF init succeeded.";
    })
    .catch((e) => {
      message.value = "LIFF init failed.";
      error.value = `${e}`;
    })
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
