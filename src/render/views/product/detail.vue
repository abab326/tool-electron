<template>
    <div class="p-2">
     <div class="font-bold">产品详情</div>
     <el-collapse v-model="collapse">
       <el-collapse-item name="basic-info" title="基本信息">
        <el-form :model="baseInfo">
        <div class="grid grid-cols-2 gap-2">
          <el-form-item label="产品名称">
            <el-input v-model="baseInfo.name" placeholder="请输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="产品版本">
            <el-input v-model="baseInfo.version" placeholder="请输入产品版本"></el-input>
          </el-form-item>
          <el-form-item label="产品描述">
            <el-input v-model="baseInfo.description" placeholder="请输入产品描述"></el-input>
          </el-form-item>
        </div>
        </el-form>
       </el-collapse-item>
       <el-collapse-item name="product-info" title="产品信息">
          <el-table :data="variantList">
            <el-table-column label=""></el-table-column>
          </el-table>
       </el-collapse-item>
     </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const collapse = ref(['basic-info', 'product-info'])
const baseInfo = ref()
const variantList = ref([
  {
    color: 'red',
    size: '100px',
    price: 100,
    quantity: 1,
  },
  {
    color: 'blue',
    size: '100px',
    price: 100,
    quantity: 1,
  },
])
</script>

<style scoped>

</style>