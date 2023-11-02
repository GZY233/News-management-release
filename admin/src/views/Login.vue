<script setup>
import { loadFull } from "tsparticles"
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import axios from "axios"
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
const loginref = ref();
const loginForm = reactive({
    username: '',
    password: ''
})
const loginrules = reactive({
    username: [
        {
            required: true, message: "请输入用户名", trigger: "blur"
        }
    ],
    password: [
        {
            required: true, message: "请输入密码", trigger: "blur"
        }
    ]
})
const particlesInit = async (engine) => {
    await loadFull(engine)
}
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
const submitForm = function () {
    loginref.value.validate((valid) => {
        if (valid) {

            axios.post("/adminapi/user/login", loginForm).then(res => {
             if (res.data.gzy === "ok") {
                    router.push("/index")
                    store.commit("changeUserInfo",res.data.data)
                    store.commit("changeGetterRouter",false)
                } else {
                    ElMessage({
                        showClose: true,
                        message: '用户名或密码错误',
                        type: 'error',
                    })
                }
            })
        }
    })

}
</script>
<template>
    <div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
            :options=options />
        <div class="formContainer">
            <h3>企业门户网站管理系统</h3>
            <el-form ref="loginref" :model="loginForm" status-icon :rules="loginrules" label-width="80px"
                class="demo-ruleForm"> <el-form-item label="用户名" prop="username" class="elitem">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password" class="elitem">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                
            </el-form>
            <div class="bt"> <el-button class="bt1" type="primary" @click="submitForm()">登录</el-button></div>
        </div>
    </div>
    <!-- <button @click="denlu">login</button> -->
</template>

<style lang="scss" scoped>
.elitem{
    margin-top: 20px;
    margin-right: 10px;
}
 .bt{
position: relative;
margin: 0;
 .bt1{
    margin: 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
 }
}
.formContainer {
    padding: 0;
    width: 500px;
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);

    h3 {
        text-align: center;
        color: white;
        font-size: 30px;
        margin: 10px;
    }
}
::v-deep .el-form-item__content{
    margin-left: 0;
}
::v-deep .el-form-item__label {
    color: white;
}
</style>