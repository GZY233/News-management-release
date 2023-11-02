<script setup>
import { ref, onMounted, reactive } from 'vue'
import pagination from '@/components/pagination/Pagination'
import axios from 'axios';
const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref()
const pagecount =ref()

const userForm = ref({
    id: "",
    username: "",
    password: "",
    gender: 0,
    role: 2,
    introduction: "",
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
})
onMounted(async() => {
    getTableData()
    await axios.get("/adminapi/user/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
  })
    
})
const getTableData = async () => {
    await axios.get("/adminapi/user/pagination").then(
        (res) => {
            tableData.value = res.data.data
        }
    )
}
const handleEdit = async (data) => {
    dialogVisible.value = true
    await axios.get(`/adminapi/user/list/${data._id}`).then(
        (res) => {
            userForm.value = res.data
        }
    )
}
const handleDelete = async (data) => {
    await axios.delete(`/adminapi/user/list/${data._id}`)
    await axios.get("/adminapi/user/paginatio").then(res=>{
  pagecount.value =Math.ceil(res.data.data/7)
 
  })
    getTableData()
}
const dialogVisible1 = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //ref通过value获取值reactive不用
            await axios.put(`/adminapi/user/list/${userForm.value.id}`, userForm.value)
            dialogVisible.value = false //后端不返回东西，下面代码不执行
             getTableData()
        }
    })
   
}
const pagination1 =(newlist)=>{
    tableData.value = newlist
}
</script>
<template>
    <el-card>
        <el-page-header :icon="null" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 用户列表 </span>
            </template>
        </el-page-header>
        <el-table  :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="name" label="头像" width="180">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="角色">
                <template #default="scope">
                    <el-tag v-if="scope.row.role === 1" class="ml-2" type="success">管理员</el-tag>
                    <el-tag v-else class="ml-2" type="danger">编辑</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">

                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除吗?"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
        <el-form ref="userFormRef" :model="userForm" :rules="userrules" label-width="120px" class="demo-ruleForm"
            status-icon>
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
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible1">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
    <pagination path="/adminapi/user/pagination" :pageSize3=7 :pagecount="pagecount" @pagination="pagination1"></pagination>
</template>