<script setup>
import { ref, reactive } from "vue"
import upload from "@/util/upload";
import Upload from '@/components/upload/Upload.vue';
import router from "@/router";
import { ElMessage } from 'element-plus'
const productFormRef = ref()
const productForm = reactive({
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

const changadd = (file) => {
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}
const submit = () => {
    productFormRef.value.validate(
        async (valid) => {
            if (valid) {
                const res = await upload("/adminapi/product/add", productForm)
                if (res.data) {
                    ElMessage.success("添加成功")
                    router.push('/product-manage/ProductList')
                }

            }
        }
    )
}
</script>
<template>
    <div><el-page-header :icon="null" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加产品 </span>
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