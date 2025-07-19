<template>
  <div>
    <div class="flex items-center justify-center gap-1 p-1">
      <span class="flex-1">{{ filePath }}</span>
      <el-button @click="handleClick">选择文件</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const filePath = ref('')

  const handleClick = async () => {
    const res = await window.electronBridge.selectExcel()
    filePath.value = res
    parseExcel()
  }
  const parseExcel = async () => {
    const res = await window.electronBridge.parseExcelFile(filePath.value)
    console.log('解析结果:', res)
  }
</script>
