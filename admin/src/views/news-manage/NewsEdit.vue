<script setup>
import { useRouter,useRoute } from 'vue-router'
import { ref, reactive ,onMounted} from "vue"
import { ElMessage } from 'element-plus'
import editor from "@/components/editor/Editor"
import upload from "@/components/upload/Upload";
import Upload from "@/util/upload";
import axios from 'axios';

const router = useRouter()
const route = useRoute()
onMounted(async ()=>{
    const res = await axios.get(`/adminapi/news/getlist1/${route.params.id}`)

    Object.assign(newsForm,res.data.data)

})

const handleBack = () => {
    router.back()
}
const newsFormRef = ref()
//这里想用ref，想方便一点，但是不知道为什么不是响应的了
const newsForm = reactive({
    id:"",
    title: "",
    content: "",
    category: 1,
    cover: "",
    file: null,
    isPublish: 0
})
const newrules = reactive({
    title: [
        {
            required: true, message: "请输入标题", trigger: "blur"
        }
    ],
    content: [
        {
            required: true, message: "请选择内容", trigger: "blur"
        }
    ],
    category: [
        {
            required: true, message: "请选择分类", trigger: "blur"
        }
    ],
    cover: [
        {
            required: true, message: "请上传图片", trigger: "blur"
        }
    ]
})
const change = (data) => {
    newsForm.content = data
}
const changnew = file => {
    newsForm.cover = URL.createObjectURL(file);
    newsForm.file = file
}
const submit = () => {
    newsFormRef.value.validate(async (vali) => {
        if (vali) {
        
            await Upload("/adminapi/news/upload", newsForm)
            router.push("/news-manage/NewsList")
            ElMessage.success("更新成功")
        }
    })
}
const options = [{
    label: "最新动态",
    value: 1
},
{
    label: "典型案例",
    value: 2
},
{
    label: "通知公告",
    value: 3
}
]
</script>
<template>
    <el-page-header title="新闻管理" @back="handleBack()">
        <template #content>
            <span class="text-large font-600 mr-3"> 编辑新闻 </span>
        </template>
    </el-page-header>
    <el-form ref="newsFormRef" :model="newsForm" :rules="newrules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <editor @gzychange1="change" :content="newsForm.content" v-if="newsForm.content"></editor>
        </el-form-item>
        <el-form-item label="类别" prop="category">
            <el-select v-model="newsForm.category" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <upload :avatar="newsForm.cover" @gzychange="changnew"></upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit()">更新</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped>
.el-form {
    margin-top: 50px;
}
</style>