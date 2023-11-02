<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const handback = () => {
    window.location = "http://localhost:8081"
}
</script>
<template>
    <div class="Nava">
        <el-menu class="menu" :default-active="route.fullPath" mode="horizontal" @select="handleSelect" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handback">登录</el-menu-item>
        </el-menu>
        <div class="right">企业新闻官网</div>
    </div>
    
</template>

<style lang="scss" scoped>

.Nava {
    position: sticky;
    top: 0;
    z-index: 10000;
    width: 100%;
}

.right {
    position: fixed;
    right: 15px;
    height: 50px;
    line-height: 50px;
    top: 15px;
}
</style>