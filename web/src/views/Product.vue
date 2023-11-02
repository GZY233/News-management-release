<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const looplist = ref([])

onMounted(async () => {
  const res2 = await axios.get("/webapi/product/getlist")
  looplist.value = res2.data.data
})

</script>
<template>
  <div>
    <el-carousel height="calc(100vh - 76px)" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="item in looplist" :key="item._id" v-if="looplist.length">
        <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
          <el-card class="box-card card">
            <template #header>
              <div class="card-header" style="text-align: center;">
                <h2><span>{{item.title}}</span></h2>
              </div>
            </template>
           <div>{{item.introduction}}</div>
           <div class="item1">{{item.detail}}</div>
          </el-card>
        </div>
      </el-carousel-item>
      <el-empty description="暂无产品" v-else />
    </el-carousel>
  </div>
</template>
<style lang="scss">
.item {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: cover;
  background-repeat: no-repeat;

}
.item1{
  margin-top: 20px;
}
.card{
  width: 50%;
  height: 100%;
 opacity: 0.4;
}
.caro {
  height: 100vh;
}
</style>