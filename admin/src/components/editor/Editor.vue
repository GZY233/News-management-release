<script setup>


import { onBeforeUnmount, ref, shallowRef, onMounted, defineEmits ,defineProps} from 'vue'

import E from "wangeditor"
const emit = defineEmits(["gzychange1"])

const props = defineProps({
    content:String
})

onMounted(() => {
    const editor = new E("#div1")
editor.create()
props.content && editor.txt.html(props.content)
editor.config.onchange =function (newhtml){
    emit("gzychange1", newhtml)
}
})
</script>
<template>
    <div style="border: 1px solid #ccc" id="div1">

    </div>
</template>