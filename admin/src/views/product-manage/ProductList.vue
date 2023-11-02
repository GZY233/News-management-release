<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import getedittime from "@/util/getedittime"
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue"
import pagination from '@/components/pagination/Pagination'
import { useStore } from 'vuex';
const pagecount =ref()
const tableData = ref([])

const router = useRouter()
onMounted(async() => {
    getTableData()
    await axios.get("/adminapi/product/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
  })
})
const getTableData = async () => {
    await axios.get("/adminapi/product/pagination").then(
        (res) => {
            tableData.value = res.data.data
        }
    )
}

const handleDelete = async (data) => {
    await axios.delete(`/adminapi/product/dellist/${data._id}`)
    await axios.get("/adminapi/product/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
  })
    getTableData()
}
const handleEdit =async (item)=>{
    // await axios.get(`/adminapi/news/getlist/${item}`)
    await router.push(`/product-manage/ProductEdit/${item}`)
}
const pagination1 = async (newlist)=>{
    tableData.value = newlist
}
</script>
<template>
    <div>
        <el-card>
            <el-page-header :icon="null" title="产品管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 产品列表 </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" width="180" />
                <el-table-column prop="introduction" label="产品简要描述" width="180">
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" width="180">
                    <template #default="scope">
                        {{ getedittime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button title="编辑" circle :icon="Edit" size="small" @click="handleEdit(scope.row._id)"></el-button>
                        <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除吗?"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button title="删除" circle :icon="Delete" size="small" type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    
    </div>
    <pagination path="/adminapi/product/pagination" :pageSize3=11 :pagecount="pagecount" @pagination="pagination1"></pagination>
</template>
<style scoped lang="scss">

</style>