<script setup>
import { ref,onMounted,defineEmits,defineProps } from 'vue';
import axios from 'axios'
let total =ref(0)
const emit = defineEmits(["pagination"])
//当前页
const currentPage3 = ref(1)
const pagecount =ref()
const number =ref(1)

const props = defineProps({
  pagecount:Number,
    pageSize3:Number,
    path:String
})
onMounted(async ()=>{
  
})

//页数发生变化回调
const handleCurrentChange = async (paper)=>{
  console.log(props.path);
   await axios.get(`/webapi/news/getlist/${props.path}?page=${paper}`).then(res=>{
    emit("pagination",[res.data.data,props.path])
    
   })
}

</script>
<template>

<div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="props.pageSize3"
      layout="prev, pager, next, jumper"
      :total="total"
      :page-count="props.pagecount"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style  scoped>
::v-deep .el-pagination__goto::before{
    content: 跳转;
}

</style>