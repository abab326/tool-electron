<template>
    <div class="layout-default-container h-full w-full flex">
    <div class="">
    <el-menu  :default-active="selectMenu" router>
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="product-detail">产品详情</el-menu-item>
    </el-menu>

    </div>
    <div class="layout-default-main flex-1">
        <router-view></router-view>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
const selectMenu = ref('/')
</script>

<style scoped>

</style>