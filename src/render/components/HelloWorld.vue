<script setup lang="ts">
  import { ImageResult } from '@/types/file'
  import { ref } from 'vue'
  interface Props {
    msg: string
  }

  defineProps<Props>()

  const selectImage = ref<ImageResult | undefined>()

  async function login() {
    console.log('login')
    console.log(window.electronBridge)
    window.electronBridge?.selectImage()?.then((res) => {
      if (res) {
        console.log('res', res)
        selectImage.value = res
      }
    })
  }
</script>

<template>
  <div class="w-20 h-20 bg-red-500"></div>
  <el-image v-if="selectImage" :src="selectImage.url" />
  <el-button @click="login">登录</el-button>
</template>
