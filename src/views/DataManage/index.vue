<script setup>
import { View, Avatar, User, Document, Notebook } from '@element-plus/icons-vue'
// Echarts按需导入
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import {
  getArticleNumAPI,
  getCategoryNumAPI,
  getDataChartInfoAPI,
  getPVDataAPI,
  getUserNumAPI,
  getUVDataAPI,
  getVisitNumAPI
} from '@/api/data'
use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  PieChart,
  LineChart,
  CanvasRenderer
])

// 访问总数
const visitNum = ref(0)
const getVisitNum = async () => {
  const { data } = await getVisitNumAPI()
  visitNum.value = data.loginNumber
}
onMounted(() => {
  getVisitNum()
})

// 用户总数
const userNum = ref(0)
const getUserNum = async () => {
  const { data } = await getUserNumAPI()
  userNum.value = data.userNumber
}
onMounted(() => {
  getUserNum()
})

// 文章总数
const articleNum = ref(0)
const getArticleNum = async () => {
  const { data } = await getArticleNumAPI()
  articleNum.value = data.articleNumber
}
onMounted(() => {
  getArticleNum()
})

// 专栏总数
// 文章总数
const categoryNum = ref(0)
const getCategoryNum = async () => {
  const { data } = await getCategoryNumAPI()
  categoryNum.value = data.categoryNumber
}
onMounted(() => {
  getCategoryNum()
})

// 数据统计图表
const dataChartOption = ref({
  title: {
    text: '数据统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 20,
    bottom: 0
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      label: {
        show: false
      },
      data: [
        { value: 0, name: '收藏总数', itemStyle: { color: '#37a2da' } },
        { value: 0, name: '点赞总数', itemStyle: { color: '#66e0e3' } },
        { value: 0, name: '阅读总数', itemStyle: { color: '#ffdb5c' } },
        { value: 0, name: '评论总数', itemStyle: { color: '#ff9f7f' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
const getDataChartInfo = async () => {
  const {
    data: { favoriteNumber, likeNumber, viewNumber, commentNumber }
  } = await getDataChartInfoAPI()
  const info = [favoriteNumber, likeNumber, viewNumber, commentNumber]
  dataChartOption.value.series[0].data.forEach((item, index) => {
    item.value = info[index]
  })
}
onMounted(() => {
  getDataChartInfo()
})

// PV-UV图表
const PVUVChartOption = ref({
  title: {
    text: 'PV/UV数据'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['PV', 'UV']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'PV',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#37a2da'
      }
    },
    {
      name: 'UV',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ffd95c'
      }
    }
  ]
})
const getLastSevenDate = () => {
  const current = new Date()
  const xAxis = []
  for (let i = 6; i >= 0; i--) {
    const newDate = new Date(current)
    newDate.setDate(current.getDate() - i)
    xAxis.push([newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('-'))
  }
  PVUVChartOption.value.xAxis.data = xAxis
}
const pvLoading = ref(true)
const getPVData = async () => {
  pvLoading.value = true
  const {
    data: { pvNumber }
  } = await getPVDataAPI()
  PVUVChartOption.value.series[0].data = pvNumber
  pvLoading.value = false
}
const uvLoading = ref(true)
const getUVData = async () => {
  uvLoading.value = true
  const {
    data: { uvNumber }
  } = await getUVDataAPI()
  PVUVChartOption.value.series[1].data = uvNumber
  uvLoading.value = false
}
onMounted(() => {
  getLastSevenDate()
  getPVData()
  getUVData()
})
</script>

<template>
  <div class="data-page">
    <div class="overview">
      <div id="col1">
        <div class="title">访问总数</div>
        <el-icon><View /></el-icon>
        <div class="number">{{ visitNum }}</div>
      </div>
      <div id="col2">
        <div class="box" id="box1">
          <el-icon><Avatar /></el-icon>
          <div class="number">10000</div>
          <div class="title">星球用户</div>
        </div>
        <div class="box" id="box2">
          <el-icon><User /></el-icon>
          <div class="number">{{ userNum }}</div>
          <div class="title">用户总数</div>
        </div>
        <div class="box" id="box3">
          <el-icon><Document /></el-icon>
          <div class="number">{{ articleNum }}</div>
          <div class="title">文章总数</div>
        </div>
        <div class="box" id="box4">
          <el-icon><Notebook /></el-icon>
          <div class="number">{{ categoryNum }}</div>
          <div class="title">专栏总数</div>
        </div>
      </div>
      <div id="col3">
        <v-chart :option="dataChartOption" autoresize />
      </div>
    </div>
    <div class="pv-uv-chart">
      <v-chart v-if="!pvLoading && !uvLoading" :option="PVUVChartOption" autoresize />
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-page {
  padding: 20px 10px 10px;
  background-color: #ffffff;

  .overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 330px;

    .el-icon {
      width: 50px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 20px;
      font-size: 35px;
    }

    .number {
      font-weight: 700;
    }

    #col1 {
      padding: 30px 20px;
      width: 260px;
      height: 100%;
      background: linear-gradient(to bottom, #5889eb, #b8cdf9);
      border-radius: 10px;
      color: #ffffff;

      .title {
        font-size: 20px;
      }

      .el-icon {
        margin-top: 20px;
        color: #d81f06;
      }

      .number {
        margin-top: 10px;
        font-size: 30px;
      }
    }

    #col2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      width: 350px;
      height: 100%;

      .box {
        padding: 15px;
        width: 160px;
        border-radius: 10px;

        .number {
          margin-top: 10px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a37;
        }

        .title {
          font-weight: 500;
        }
      }

      #box1 {
        background-color: #e8faea;
      }
      #box2 {
        background-color: #e7e1fb;
      }
      #box3 {
        background-color: #f4e4d4;
      }
      #box4 {
        background-color: #d4e2f0;
      }
    }

    #col3 {
      display: flex;
      align-items: center;
      padding: 20px 5px;
      width: 475px;
      height: 100%;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
    }
  }

  .pv-uv-chart {
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 445px;
  }
}
</style>
