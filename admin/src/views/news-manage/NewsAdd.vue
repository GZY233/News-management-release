<script setup>
import { ref, reactive } from "vue"
import editor from "@/components/editor/Editor"
import upload from "@/components/upload/Upload";
import Upload from "@/util/upload";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
const store = useStore()
const newsFormRef = ref()
const router = useRouter()
const newsForm = reactive({
    username:store.state.userIfno.username,
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
            required: true, message: "请输入内容", trigger: "blur"
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
const submit = ()=>{
    newsFormRef.value.validate(async (vali)=>{
        if (vali) {
            await Upload("/adminapi/news/add",newsForm)
            router.push("/news-manage/NewsList")
            ElMessage.success("添加成功")
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
    <el-page-header icon="" title="新闻管理">
        <template #content>
            <span class="text-large font-600 mr-3"> 添加新闻 </span>
        </template>
    </el-page-header>
    <el-form ref="newsFormRef" :model="newsForm" :rules="newrules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <editor @gzychange1="change"></editor>
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
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped>
.el-form{
    margin-top: 50px;
}
</style>