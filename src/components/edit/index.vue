<script setup lang="ts">
import {onBeforeUnmount, ref, shallowRef, onMounted, reactive, watch, nextTick} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import type {IDomEditor} from "@wangeditor/editor"; // 引入 css
import {uploadImages} from "@/api/common/media";
import * as url from "url";

interface Props {
  modelValue: string,
  text?: string,
  placeholder?: string,
  model?: 'default' | 'simple',
  disable?: boolean
}

const props = withDefaults(defineProps < Props >(), {
  modelValue: '',
  text: 'hello word',
  placeholder: '请输入内容',
  model: 'default',
  disable: false
})

const emit = defineEmits([
  'update:modelValue',
    'update:text'
])

const state = reactive({
  editorVal:  props.modelValue,
  editorConfig: {
    placeholder: props.placeholder,
    MENU_CONF: {} as any
  }
})

type InsertFnType = (url: string, alt?: string, href?: string) => void
state.editorConfig.MENU_CONF['uploadImage'] ={
  customUpload: async function async (file: File, insertFn: InsertFnType) {  // TS 语法
    // async customUpload(file, insertFn) {                   // JS 语法
    // file 即选中的文件
    // 自己实现上传，并得到图片 url alt href
    // 最后插入图片
    let formData = new FormData();
    formData.append('file', file);
    formData.append('data',JSON.stringify({sourceType: 'goods_img'}))
    const {data: url} = await uploadImages(formData)
    insertFn(url)
  }
}

function handleChange(editor: IDomEditor){
  emit('update:modelValue',editor.getHtml())
  emit('update:text', editor.getText())
}
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(()=>props.disable,(bool)=>{
  nextTick(()=>{
    const editor = editorRef.value
    if (editor == null)return
    bool? editor.disable():editor.enable()
  })
},{immediate: true})
</script>

<template>
  <div style="border: 1px solid #ccc" class="editor-container">
    <Toolbar
        class="editor-toolbar"
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :mode="props.model"
    />
    <Editor
        style="height: 500px;"
        v-model="state.editorVal"
        :defaultConfig="state.editorConfig"
        :mode="props.model"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>

<style scoped>

</style>
