<script setup>
import { View, Avatar, User, Document, Notebook } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

let chartInstance = null // 图表实例

const dataChartRef = ref()
const dataChartInit = () => {
  if (!dataChartRef.value) return
  chartInstance = echarts.init(dataChartRef.value)
  const option = {
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
          { value: 80, name: '阅读总数' },
          { value: 10, name: '点赞总数' },
          { value: 5, name: '评论总数' },
          { value: 5, name: '收藏总数' }
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
  }
  chartInstance.setOption(option)
}

const pv_uvChartRef = ref()
const pv_uvChartInit = () => {
  if (!pv_uvChartRef.value) return
  chartInstance = echarts.init(pv_uvChartRef.value)
  const option = {
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
      },
      data: [
        '2025-04-15',
        '2025-04-16',
        '2025-04-17',
        '2025-04-18',
        '2025-04-19',
        '2025-04-20',
        '2025-04-21'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'PV',
        type: 'line',
        smooth: true,
        data: [41483, 32860, 23516, 31990, 12626, 16754, 13057]
      },
      {
        name: 'UV',
        type: 'line',
        smooth: true,
        data: [2000, 3000, 5000, 4000, 2000, 3000, 1000]
      }
    ]
  }
  chartInstance.setOption(option)
}
onMounted(() => {
  dataChartInit()
  pv_uvChartInit()
})
</script>

<template>
  <div class="data-page">
    <div class="overview">
      <div id="col1">
        <div class="title">访问总数</div>
        <el-icon><View /></el-icon>
        <div class="number">8176049</div>
      </div>
      <div id="col2">
        <div class="box" id="box1">
          <el-icon><Avatar /></el-icon>
          <div class="number">10000</div>
          <div class="title">星球用户</div>
        </div>
        <div class="box" id="box2">
          <el-icon><User /></el-icon>
          <div class="number">8344</div>
          <div class="title">用户总数</div>
        </div>
        <div class="box" id="box3">
          <el-icon><Document /></el-icon>
          <div class="number">553</div>
          <div class="title">文章总数</div>
        </div>
        <div class="box" id="box4">
          <el-icon><Notebook /></el-icon>
          <div class="number">149</div>
          <div class="title">专栏总数</div>
        </div>
      </div>
      <div id="col3">
        <div ref="dataChartRef" style="width: 100%; height: 80%"></div>
      </div>
    </div>
    <div class="pv-uv-chart">
      <div ref="pv_uvChartRef" style="width: 100%; height: 80%"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-page {
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
