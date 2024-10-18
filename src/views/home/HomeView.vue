<template>
  <div>
    <div class="header">
      <el-row :gutter="16">
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="693700">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  访客数量
                  <el-tooltip effect="dark" content="每月访客数量" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>月同比</span>
                <span class="red">
                  12%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  总用户数
                  <el-tooltip effect="dark" content="注册用户数" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>月同比</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="72000" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">文章数量</div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>月同比</span>
                <span class="green">
                  16%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <el-statistic :value="1000" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">视频数量</div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>月同比</span>
                <span class="red">
                  8%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <div class="content">
      <div class="left">
        <LineEcharts />
      </div>
      <div class="right">
        <el-card>
          <template #header>
            <div class="card-header">
              <div class="header-title">文章热搜</div>
              <el-link type="primary">查看更多</el-link>
            </div>
          </template>
          <el-link class="link" href="#" v-for="(item, key) in articles" :key="key">
            <span>{{ key + 1 }}. {{ item.name }}</span>
            <span>{{ item.viewNumber }}</span>
          </el-link>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const articles = ref([
  { name: '文章1', viewNumber: '1000' },
  { name: '文章2', viewNumber: '2000' },
  { name: '文章3', viewNumber: '3000' },
  { name: '文章4', viewNumber: '4000' },
  { name: '文章5', viewNumber: '5000' },
  { name: '文章6', viewNumber: '6000' },
  { name: '文章7', viewNumber: '7000' },
  { name: '文章8', viewNumber: '8000' },
  { name: '文章9', viewNumber: '9000' },
  { name: '文章10', viewNumber: '10000' }
]);
</script>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  text-align: center;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
.content {
  display: flex;
  margin-top: 20px;
}
.left {
  flex: 2;
}
.right {
  flex: 1;
}
li {
  list-style: none;
}
.link {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.link:nth-child(n + 2) {
  margin-top: 20px;
}

/deep/ .link > span {
  width: 100%;
  justify-content: space-between;
}
.header-title {
  font-size: 14px;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
