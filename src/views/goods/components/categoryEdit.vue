<script setup lang="ts">
import useForm from '@/hooks/useForm';
import {updateUser, addUser} from '@/api/goods/category/list';

const emit = defineEmits(['refresh']);
// 初始化数据
const initData = {status: true, sort: 1};
const {
  formRef,
  title, type, dialogVisible, loading, formData,
  open,
  close,
  submitForm
} = useForm<GoodsCategoryType>({initData, updateUser, addUser}, emit);
defineExpose({
  open
});
</script>
<template>
  <el-dialog :title="`${title}分类`" center draggable v-model="dialogVisible"
             :before-close="close" width="500px" destroy-on-close>
    <div v-loading="loading">
      <el-form ref="formRef" :model="formData" label-width="85px" labelposition="right"
               status-icon label-suffix=":">
        <el-form-item label="分类名称" prop="name"
                      :rules="{required: true, message: '分类名称为必填项！',trigger: 'blur'}">
          <el-input v-model="formData.name" maxlength="30"
                    clearable show-word-limit placeholder="请输入分类名称"/>
        </el-form-item>
        <el-form-item label="分类状态" prop="status"
                      :rules="{required: true, message: '分类状态为必选项！',trigger: 'change'}">
          <el-switch v-model="formData.status" inline-prompt
                     active-text="启" inactive-text="停"/>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="formData.sort" :min="1" :max="10000"
                           class="w100"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <el-row justify="center" class="mt10">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
