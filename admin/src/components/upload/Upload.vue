<script setup>
import { defineProps, defineEmits } from 'vue'
import { Plus } from "@element-plus/icons-vue"
const props = defineProps({
    avatar: String
})
const emit = defineEmits(["gzychange"])
const changuplode = (file) => {
    emit("gzychange", file.raw)
}
</script>
<template>
    <el-upload class="avatar-udploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="changuplode">
        <img v-if="props.avatar"
            :src="props.avatar.includes('blob') ? props.avatar : 'http://localhost:3000' + props.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>