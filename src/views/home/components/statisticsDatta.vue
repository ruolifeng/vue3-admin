<script setup lang="ts" name="Statistics">
import {getStatistics} from "@/api/home";
import {reactive, onMounted} from "vue";

/**
 * 将静态数据转换成响应式数据
 */
const state = reactive({
  loading: false,
  statisticsData: {
    totalIncomeMoney: 0,
    totalOrderNum: 0,
    totalReturnedMoney: 0,
    totalSaleMoney: 0
  } as any
})
// 数据块
const blockList = [
  {
    name: '订单笔数',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    unit: '笔',
    colum: 'totalOrderNum',
    startColor: '#00ba26',
    endColor: '#00ba26a1'
  },
  {
    name: '销售金额',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    unit: '元',
    colum: 'totalSaleMoney',
    startColor: '#f81a1a',
    endColor: '#0011c7'
  },
  {
    name: '退款笔数',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    unit: '元',
    colum: 'totalReturnedMoney',
    startColor: '#bcd7a9',
    endColor: 'rgba(58,179,255,0.63)'
  },
  {
    name: '综合收入',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    unit: '元',
    colum: 'totalIncomeMoney',
    startColor: '#d6e04e',
    endColor: 'rgba(161,0,186,0.63)'
  },
]
onMounted(() => {
  loadStatistics();
})

async function loadStatistics() {
  try {
    state.loading = true;
    const {data} = await getStatistics()
    state.statisticsData = data;
  } catch (error) {

  } finally {
    state.loading = false;
  }
}
</script>

<template>
  <div class="home-statistics">
    <div class="home-statistics-title">营业数据统计</div>
    <el-row :gutter="15" v-loading="state.loading">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" v-for="(item,index) in blockList" :key="index">
        <el-card
            class="home-statistics-card"
            shadow="hover"
            :style="{'background-image':`linear-gradient(to right,${item.startColor},${item.endColor})`}"
        >
          <div class="home-business-title">
            <span>{{ item.name }}</span>
            <el-tooltip :content='item.content' placement="top">
              <SvgIcon name="ele-QuestionFilled"></SvgIcon>
            </el-tooltip>
          </div>
          <div class="item-num">
            <span>{{ state.statisticsData[item.colum] }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </el-card>
      </el-col
      >
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.home-statistics {
  .home-statistics-title {
    font-size: 18px;
    height: 25px;
    line-height: 25px;
    border-left: 2px solid var(--el-color-primary);
    padding-left: 10px;
    margin: 15px 0;
  }
}

.home-statistics-card {
  margin-bottom: 15px;
  padding-left: 9px;
  color: white;
  line-height: 30px;
  cursor: pointer;

  .home-business-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .item-num {
    font-size: 26px;
    font-weight: 600;
  }

  .unit {
    font-size: 13px;
    line-height: 16px;
    margin-left: 2px;
  }
}
</style>
