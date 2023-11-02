<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import getedittime from "@/util/getedittime"
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue"
import pagination from '@/components/pagination/Pagination'
import { useStore } from 'vuex';
const store =useStore()
const tableData = ref([])
const previeewdata = ref({})
const dialogVisible = ref(false)
const router = useRouter()
const pagecount =ref()
const ip = store.state.userIfno.username
onMounted(async () => {
    getTableData()
    await axios.get("/adminapi/news/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
  })
})
const getTableData = async () => {
    await axios.get("/adminapi/news/pagination").then(
        (res) => {
            tableData.value = res.data.data
        }
    )
}
const getcategory = (category) => {
    const arr = ['最新动态', '典型案例', '通知公告']
    return arr[category - 1]
}
const changeswitch = async (item) => {
    await axios.put("/adminapi/news/publish", {
        _id: item._id,
        isPublish: item.isPublish
    })

}
const previeew = (item) => {
    dialogVisible.value = true
    previeewdata.value = item
}
const handleDelete = async (data) => {
    await axios.delete(`/adminapi/news/dellist/${data._id}`)
    await axios.get("/adminapi/news/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
  })
    getTableData()
}
const handleEdit =async (item)=>{
    await router.push(`/news-manage/newsedit/${item}`)
}
const pagination1 = async (newlist)=>{
    tableData.value = newlist
}
</script>
<template>
    <div>

        <el-card>
            <el-page-header :icon="null" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户列表 </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="category" label="分类" width="180">
                    <template #default="scope">
                        {{ getcategory(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" width="180">
                    <template #default="scope">
                        {{ getedittime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="isPublish" label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="changeswitch(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button title="预览" circle :icon="Star" size="small" type="success" @click="previeew(scope.row)"></el-button>
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
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <div>
                <h2>{{ previeewdata.title }}</h2>
                <div style="font-size: 13px;color: gray;"> {{ getedittime.getTime(previeewdata.editTime) }}</div>
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="previeewdata.content" class="img1">

            </div>
        </el-dialog>
    </div>
    <pagination path="/adminapi/news/pagination" :pageSize3=11 :pagecount="pagecount" @pagination="pagination1"></pagination>
</template>
<style scoped lang="scss">
::v-deep .img1 {
    img {
        max-width: 100%;
    }
}
</style>