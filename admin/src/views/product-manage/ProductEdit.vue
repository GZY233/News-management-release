<script setup>
import { useRouter,useRoute } from 'vue-router'
import { ref, reactive ,onMounted} from "vue"
import { ElMessage } from 'element-plus'
import upload from "@/components/upload/Upload";
import Upload from "@/util/upload";
import axios from 'axios';

const router = useRouter()
const route = useRoute()
onMounted(async ()=>{
    const res = await axios.get(`/adminapi/product/getlist/${route.params.id}`)
    Object.assign(productForm,res.data.data)

})
const handleBack = () => {
    router.back()
}
const productFormRef = ref()
const productForm = reactive({
    id:"",
    title: "",
    introduction: "",
    detail:"",
    cover: "",
    file: null
})
const productrules = reactive({
    title: [
        {
            required: true, message: "请输入产品名称", trigger: "blur"
        }
    ],
    introduction: [
        {
            required: true, message: "请输入简要描述", trigger: "blur"
        }
    ],
    detail: [
        {
            required: true, message: "请输入详细描述", trigger: "blur"
        }
    ],
    cover: [
        {
            required: true, message: "请上传产品图片", trigger: "blur"
        }
    ]
})
const changadd = file => {
    productForm.cover = URL.createObjectURL(file);
    productForm.file = file
}
const submit = () => {
    productFormRef.value.validate(async (vali) => {
        if (vali) {
        
            await Upload("/adminapi/product/upload", productForm)
            router.push("/product-manage/ProductList")
            ElMessage.success("更新成功")
        }
    })
}

</script>
<template>
    <div><el-page-header @back="handleBack()" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header></div>
    <el-form ref="productFormRef" :model="productForm" :rules="productrules" label-width="120px" class="demo-ruleForm"
       status-icon>
        <el-form-item label="产品名称" prop="title">
            <el-input v-model="productForm.title" />
        </el-form-item>
        <el-form-item label="产品简要描述" prop="introduction">
            <el-input v-model="productForm.introduction" />
        </el-form-item>
        <el-form-item label="产品详细描述" prop="detail">
            <el-input type="textarea" v-model="productForm.detail" />
        </el-form-item>
        <el-form-item label="产品图片" prop="cover">
            <upload :avatar="productForm.cover" @gzychange="changadd"></upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>