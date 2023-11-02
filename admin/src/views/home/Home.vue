<script setup>
import { useStore } from "vuex"
import { computed,onMounted,ref } from "vue";
import axios from "axios";
const listtable = ref([])
onMounted(()=>{
getlist()
})
const getlist = async ()=>{
    await axios.get(`/adminapi/product/getlist`).then(
        (res)=>{
            listtable.value= res.data.data.sort((a,b)=>{
              return  Date.parse(b.editTime)- Date.parse(a.editTime)
           }
           ).splice(0,5)
         
        }
    )
}
const store = useStore()
const xiaoxi =computed(()=>
   new Date().getHours()<12?"今天也是元气满满的一天":"注意休息休息哦"
)
</script>
<template>
    <div>
        <el-page-header icon="" title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>
    </div>
    <el-card class="box-card">
        <el-row>
            <el-col :span="4" >
          <el-avatar :size="100" :src="store.state.userIfno.avatar?'http://localhost:3000'+store.state.userIfno.avatar:`https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`"/>
            </el-col>
            <el-col :span="20" class="box">
      <h3> 欢迎{{store.state.userIfno.username}}回来,{{xiaoxi}}</h3>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司最新产品</span>

            </div>
        </template>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in listtable" :key="item._id">
                <div class="div1" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`
            }">
                <h3 text="2xl" justify="center">{{ item.title }}</h3>
            </div>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>
<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}
.div1{
    background-size: 100% 100%;
}
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.box{
    line-height: 100px;
}
</style>
