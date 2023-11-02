<script setup>
import {  ref,computed,watchEffect,onBeforeUnmount } from 'vue';
import {ArrowLeftBold} from '@element-plus/icons-vue'
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';
import { StarFilled } from '@element-plus/icons-vue'
import moment from 'moment';

moment.locale('zh-cn')
const edittime = (time) => {
    return moment(time).format('lll')
}
const currentnew = ref({})
const newslist = ref([])
const route = useRoute()
const router = useRouter()
 const stop = watchEffect(async () => {
    if(!route.params.id) return
    const res = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res1 = await axios.get(`/webapi/news/list`)
    newslist.value =res1.data.data
    currentnew.value = res.data.data[0]
})

onBeforeUnmount(()=>{
    stop()
})

const newlist = computed(()=>newslist.value.slice(0,4))

const push1 = (id)=>{
router.push(`/news/${id}`)
}
const handback = ()=>{
    router.back()
}
</script>
<template>
    <el-icon class="back" @click="handback()"><ArrowLeftBold /></el-icon>
    <el-row :gutter="10" class="elrow">
        <el-col :span="15" :offset="1">
            <h2>{{ currentnew.title }}</h2>
            <div class="time"> {{ edittime(currentnew.editTime) }}</div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="currentnew.content"></div>
        </el-col>
        <el-col :span="6">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>最近新闻</span>
                    </div>
                </template>
                <div v-for="k in newlist" :key="k._id" class="text item" @click="push1(k._id)">{{ k.title}}<div class="div1">{{edittime(k.editTime)}}</div></div>
            </el-card>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
.back{
    font-size: 30px;
    cursor: pointer;
    &:hover{
        color: rgb(162, 162, 162);
    }
    margin: 5px;
}
.time {
    color: rgb(123, 123, 123);
    font-size: 15px;
}
.elrow{
    margin-top: 30px;
}
.text{
    margin-top: 20px;
    &:hover{
        background-color: #ebf2f7;
        color: #507999;
        cursor: pointer;
    }
}
.box-card{
   position: sticky;
   top: 50%;
}
.div1{
    color: rgb(123, 123, 123);
    font-size: 12px;
}
</style>