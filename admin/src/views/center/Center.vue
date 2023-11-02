<script setup>
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';
import upload from '@/util/upload';
import { ElMessage } from 'element-plus'
import Upload from '@/components/upload/Upload.vue';
const store = useStore()
const { username, gender, introduction, avatar,id } = store.state.userIfno
const centerFormRef = ref()
const centerForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null,
    id
})
const centerrules = reactive({
    username: [
        {
            required: true, message: "请输入用户名", trigger: "blur"
        }
    ],
    gender: [
        {
            required: true, message: "请选择性别", trigger: "blur"
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
const avatarUrl = computed(() =>
    store.state.userIfno.avatar ?"http://localhost:3000"+store.state.userIfno.avatar : `https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`
)

const changuplode = (file)=>{
    centerForm.avatar = URL.createObjectURL(file)
    centerForm.file = file
}
const submit = ()=>{
    centerFormRef.value.validate( async (valid)=>{
        if(valid){
       const res =  await upload("/adminapi/user/upload",centerForm)
            if (res.data) {
                store.commit("changeUserInfo",res.data)
                ElMessage.success("更新成功")
            }
          
        }
    })
}
</script>
<template>
    <div>
        <el-page-header icon="" title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
    </div>
    <el-row class="el-row" :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="100" :src="avatarUrl" />
                <h3>{{ store.state.userIfno.username }}</h3>
                <h5>{{ store.state.userIfno.role === 1 ? "管理员" : "编辑" }}</h5>
            </el-card>
        </el-col>
        <el-col :span="16" class="box">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                    </div>
                </template>
                <el-form ref="centerFormRef" :model="centerForm" :rules="centerrules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="centerForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="centerForm.gender" class="m-2" placeholder="Select" size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="介绍" prop="introduction">
                        <el-input type="textarea" v-model="centerForm.introduction" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        
                        <upload :avatar="centerForm.avatar" @gzychange="changuplode"></upload>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="submit()">提交</el-button>
                </el-form-item>
                </el-form>
            </el-card>

        </el-col>
    </el-row>
</template>
<style>
.box-card {

    text-align: center;
}

.el-row {
    margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
    width: 178px;
  height: 178px;
}
</style>