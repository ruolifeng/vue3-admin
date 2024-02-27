<script setup lang="ts">
import {reactive, ref, toRefs} from 'vue'

const visible = ref(true)
const state = reactive({
  formData: {
    type: '',
    path: '',
    name: '',
    redirect: '',
    isLink:'',
    meta: {
      // title: '',
      // code: '',
      // icon: '',
      // hidden: '',
      // cache:'',
      // linkTo:''
    } as SysMenuType
  }
})
const {formData} = {...toRefs(state)}

// 关闭窗口之前触发的方法
function close() {
  visible.value = false
}
function changeIsLink(val:boolean){
  state.formData.meta.linkTo = ''
}
</script>

<template>
  <el-drawer v-model="visible" title="新增菜单" :direction="'rtl'" :before-close="close" size="650px">
    <el-form ref="formRef" :model="formData" label-width="85px" label-position="right" status-icon label-suffix=":">
      <el-form-item label="上级菜单" prop="parentId">
        <!--        级联选择器-->
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio v-model="formData.type" label="1" border>菜单</el-radio>
        <el-radio v-model="formData.type" label="2" border>按钮</el-radio>
      </el-form-item>
      <el-form-item label="菜单名称" prop="meta.title" :rules="{required:true,message:'请输入菜单名称',trigger:'blur'}">
        <el-input v-model="formData.meta.title" placeholder="请输入菜单名称" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" placeholder="请输入权限标识" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="path" :rules="{required:true,message:'请输入路由地址path',trigger:'blur'}">
        <el-input v-model="formData.path" placeholder="请输入路由地址path" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="路由名称" prop="name" :rules="{required:true,message:'请输入路由名称',trigger:'blur'}">
        <el-input v-model="formData.name" placeholder="请输入路由名称" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="meta.icon">
        <el-input v-model="formData.meta.icon" placeholder="请输入菜单图标ele-" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="重定向" prop="redirect">
        <el-input v-model="formData.redirect" placeholder="请输入路由重定向地址" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否隐藏" prop="meta.hidden" :rules="{required:true,message:'请选择',trigger:'change'}">
            <el-radio-group v-model="formData.meta.hidden">
              <el-radio :label="false">不隐藏</el-radio>
              <el-radio :label="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存" prop="meta.cache" :rules="{required:true,message:'请选择',trigger:'change'}">
            <el-radio-group v-model="formData.meta.cache">
              <el-radio :label="false">不缓存</el-radio>
              <el-radio :label="true">缓存</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="显示导航" prop="meta.isBreadcrumd">
        <el-radio-group v-model="formData.meta.isBreadcrumd">
          <el-radio :label="false">不显示</el-radio>
          <el-radio :label="true">显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="8">
      <el-form-item label="是否外链" prop="isLink">
        <el-radio-group v-model="formData.isLink">
          <el-radio :label="false" @click="changeIsLink">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
        </el-col>
        <el-col :span="16">
      <el-form-item label="外链地址" prop="isLink" v-if="formData.isLink">
        <el-input v-model="formData.meta.linkTo" placeholder="请输入外链地址" maxlength="300" show-word-limit></el-input>
      </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序" prop="meta.sort">
        <el-input-number v-model="formData.meta.sort" :min="1" max="100000" style="width: 300px"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注信息" maxlength="50" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row>
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </el-row>
    </template>
  </el-drawer>
</template>

<style scoped>

</style>
