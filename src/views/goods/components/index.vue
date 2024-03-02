<!-- 编辑分类 -->
<script setup lang="ts" name="GoodsCategoryEdit">
import useForm from '@/hooks/useForm';
import {updateUser, addUser, isExist, getCategoryList} from '@/api/goods/list';
import {ref, watch} from "vue";
import {pinyin} from "pinyin-pro";
import {isCode} from "@/utils/validate";

const emit = defineEmits(['refresh']);
// 初始化数据
const initData = {status: 1, sort: 1};
const {
  title, type, dialogVisible, loading, formData, oldFormData,
  formRef,
  open,
  close,
  submitForm
} = useForm<GoodsType>({initData, updateUser, addUser}, emit);
// 导出父组件访问
defineExpose({
  open
});

// 分类下拉选项
const categoryOptions = ref<{
  categoryId: string;
  categoryName: string;
}[]>([]);
watch(() => dialogVisible.value, (val) => {
  if (!val) return;
  loadCategoryOptions();
});

// 加载所有分类下框灵气
async function loadCategoryOptions() {
  try {
    loading.value = true;
    const {data} = await getCategoryList();
    categoryOptions.value = data || [];
  } catch (e) {
  } finally {
    loading.value = false;
  }
}

// 获取中文名称的商品名称的首字母拼音
// 中文快捷码（中文拼音首字母）
function setQuickCode(name:string) {
// 获取不带音调拼音首字母，分隔符空; 然后字母转成大写
  formData.value.quickCode =
      pinyin(name, {toneType: 'none', pattern: 'first', separator: '' }).toUpperCase();
}

// 校验商品编码是否存在
const codeValidator = async (rule:any, value:string, callback:Function) => {
  if (!value) return callback(new Error('商品编码为必填项！'));
  if (!isCode(value)) return callback(new Error('只允许输入3~30位数字、字母和下划线'));
  if(oldFormData.value.code != value) {
// 判断字典编码是否存在
    const {data} = await isExist({code: value});
// 存在，则重复了
    if(data) return callback(new Error('该商品编码已存在，请更换一个！'));
  }
  callback();
};
</script>

<template>
  <el-drawer :title="title+'商品信息'" v-model="dialogVisible" size="800px" :before-close="close"
             center destroy-on-close>
    <div v-loading="loading">
      <el-scrollbar max-height="calc(100vh - 170px)">
        <el-form class="pr10" ref="formRef" :model="formData" label-width="95px"
                 label-position="right" status-icon label-suffix=":">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="name"
                            :rules="{ required: true, message: '商品名称为必填项！', trigger:'blur' }">
                <el-input v-model="formData.name" maxlength="30" clearable
                          show-word-limit placeholder="请输入商品名称"
                          @change="setQuickCode"/>
              </el-form-item>
            </el-col>
            <!--商品分类下拉框-->
            <el-col :span="12">
              <el-form-item label="商品分类" prop="categoryId"
                            :rules="{ required: true, message: '商品分类为必填项！', trigger: 'change' }">
                <el-select v-model="formData.categoryId" clearable filterable placeholder="请选择商品分类"
                           style="width: 100px" class="w100">
                  <el-option v-for="item in categoryOptions" :key="item.categoryId"
                             :label="item.categoryName" :value="item.categoryId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品编码" prop="code" :rules="{ required: true, validator: codeValidator, trigger: 'blur' }">
                <el-input v-model="formData.code" maxlength="30"
                          clearable placeholder="请输入(支持条码枪)">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品规格" prop="specsName">
                <el-input v-model="formData.specsName" maxlength="20"
                          clearable show-word-limit placeholder="请输入规格名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存数量" prop="stockNum"
                            :rules="{ required: true, message: '库存数量为必填项！', trigger:'blur' }">
                <el-input-number v-model="formData.stockNum" :min="0"
                                 :max="99999999" placeholder="请输入库存数量" class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品单位" prop="unitName">
                <el-input v-model="formData.unitName" placeholder="请输入商品单位"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售价格" prop="price"
                            :rules="{ required: true, message: '销售价格为必填项！', trigger:'blur' }">
                <el-input-number v-model="formData.price" :precision="2" :step="1"
                                 :min="0" :max="99999999999" placeholder="0.00"
                                 class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品特价" prop="discountPrice">
                <el-input-number v-model="formData.discountPrice" :precision="2" :step="1"
                                 :min="0" :max="99999999999" placeholder="0.00"
                                 class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成本价格" prop="cost">
                <el-input-number v-model="formData.cost" :precision="2" :step="1" :min="0"
                                 :max="99999999999" placeholder="0.00" class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="获得积分" prop="score">
                <el-input-number v-model="formData.score" :min="0.1" :precision="2"
                                 :step="1"
                                 :max="99999999999" placeholder="请输入可获得积分"
                                 class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品状态" prop="status">
                <el-radio-group v-model="formData.status">
                  <el-radio :label="1" border>上架</el-radio>
                  <el-radio :label="0" border>下架</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌名称" prop="brand">
                <el-input v-model="formData.brand" maxlength="30" clearable
                          show-word-limit placeholder="请输入品牌名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品简码" prop="quickCode">
                <el-input v-model="formData.quickCode" maxlength="30" clearable
                          show-word-limit placeholder="请输入，方便快速搜索商品"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品产地" prop="address">
                <el-input v-model="formData.address" maxlength="100" clearable
                          show-word-limit placeholder="商品产地最多输入100个字"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号" prop="sort">
                <el-input-number v-model="formData.sort" :min="-900000000"
                                 :max="900000000" placeholder="按数字小到大排序"
                                 class="w100"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注信息" prop="remark">
                <el-input v-model="formData.remark" maxlength="100" clearable
                          show-word-limit placeholder="备注信息最多输入100个字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="商品主图" prop="imageUrl">
              <!-- 上传商品主图 -->
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品详情" prop="goodsDetail">
              <!-- 富文件编辑器 -->
            </el-form-item>
          </el-row>
        </el-form>
      </el-scrollbar>
      <el-row justify="center" class="mt20">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">保 存</el-button>
      </el-row>
    </div>
  </el-drawer>
</template>
<style>
</style>
