<script setup>
import { ref, reactive } from "vue"
import upload from "@/util/upload";
import Upload from '@/components/upload/Upload.vue';
import router from "@/router";
import { ElMessage } from 'element-plus'
import axios from "axios";
const userFormRef = ref()
const userForm = reactive({
    username: "",
    password: "",
    gender: 0,
    role: 2,
    introduction: "",
    avatar: "",
    file: null
})
const userrules = reactive({
    username: [
        {
            required: true, message: "请输入用户名", trigger: "blur"
        }
    ],
    password: [
        {
            required: true, message: "请输入密码", trigger: "blur"
        }
    ],
    gender: [
        {
            required: true, message: "请选择性别", trigger: "blur"
        }
    ],
    role: [
        {
            required: true, message: "请选择身份", trigger: "blur"
        }
    ],
    introduction: [
        {
            required: true, message: "请输入介绍", trigger: "blur"
        }
    ],
    avatar: [
        {
            required: true, message: "请上传头像", trigger: "blur"
        }
    ]
})
const options = [
    {
        value: 1,
        label: "管理员"
    },
    {
        value: 2,
        label: "编辑"
    }
]
const options1 = [
    {
        value: 0,
        label: "保密"
    },
    {
        value: 1,
        label: "男"
    },
    {
        value: 2,
        label: "女"
    }
]
const changadd = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}
const submit = () => {
    userFormRef.value.validate(
        async (valid) => {
            if (valid) {
                await axios.post('/adminapi/user/jwt', { username: userForm.username }).then(async res => {
                    if (!res.data.data) {
                        const res1 = await upload("/adminapi/user/add", userForm)
                        if (res1.data) {
                            ElMessage.success("添加成功")
                            router.push('/user-manage/UserList')
                        }
                    }
                    else{
                        ElMessage.error("用户名已存在")
                    }

                })


            }
        }
    )
}
</script>
<template>
    <div><el-page-header :icon="null" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加用户 </span>
            </template>
        </el-page-header></div>
    <el-form ref="userFormRef" :model="userForm" :rules="userrules" label-width="120px" class="demo-ruleForm" status-icon>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="role">
            <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
            <el-input type="textarea" v-model="userForm.introduction" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <upload :avatar="userForm.avatar" @gzychange="changadd"></upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<style scoped>
.el-form {
    margin-top: 50px;
}
</style>