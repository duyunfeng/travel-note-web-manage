<template>
  <div id="main" class="echarts"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { nextTick } from 'vue';

type EChartsOption = echarts.EChartsOption;

const option: EChartsOption = {
  title: {
    text: '访客数量'
  },
  tooltip: {
    trigger: 'axis'
  },
  dataZoom: {
    type: 'slider'
  },
  xAxis: {
    type: 'category',
    data: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260, 330, 292, 200, 150, 150],
      type: 'line'
    }
  ]
};

nextTick(() => {
  const chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom);
  window.addEventListener('resize', function () {
    myChart.resize();
  });
  option && myChart.setOption(option);
});
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>
