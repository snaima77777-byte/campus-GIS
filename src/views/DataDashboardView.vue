<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">DATA DASHBOARD</p>
        <h1 class="band-title">数据看板</h1>
        <p class="band-sub">报到统计 · 实时数据 · 趋势分析</p>
      </section>

      <div class="spec-row">
        <div v-for="stat in stats" :key="stat.label" class="spec-cell">
          <span class="spec-num" :style="{ color: stat.color }">{{ stat.value }}</span>
          <span class="spec-lab">{{ stat.label }}</span>
          <span class="spec-sub">{{ stat.sub }}</span>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-card">
          <p class="card-label">各学院报到情况</p>
          <div class="bar-chart">
            <div v-for="bar in collegeData" :key="bar.name" class="bar-row">
              <span class="bar-lab">{{ bar.name }}</span>
              <div class="bar-track"><div class="bar-fill" :style="{ width: bar.percent + '%', background: bar.color }"></div></div>
              <span class="bar-val">{{ bar.count }}人</span>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <p class="card-label">生源地区分布</p>
          <div class="province-list">
            <div v-for="p in provinceData" :key="p.name" class="prov-row">
              <span class="prov-name">{{ p.name }}</span>
              <span class="prov-count">{{ p.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <p class="card-label">实时动态</p>
        <div class="alert-list">
          <div v-for="(alert, i) in alerts" :key="i" class="alert-row">
            <span class="alert-time">{{ alert.time }}</span>
            <span class="alert-type" :class="alert.type">{{ alert.type === 'info' ? '信息' : alert.type === 'warn' ? '提醒' : '完成' }}</span>
            <span class="alert-msg">{{ alert.msg }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '3,842', label: '已报到', sub: '应到 4,200 · 91.5%', color: '#03904a' },
  { value: '358', label: '待报到', sub: '剩余名额', color: '#f59e0b' },
  { value: '1,240', label: '已入住', sub: '宿舍入住率 82%', color: '#4c98b9' },
  { value: '13', label: '院系', sub: '全部开放报到', color: '#da291c' },
]

const collegeData = [
  { name: '土木学院', count: 520, percent: 92, color: '#4c98b9' }, { name: '测绘学院', count: 480, percent: 88, color: '#03904a' },
  { name: '机电学院', count: 440, percent: 94, color: '#f59e0b' }, { name: '汽车学院', count: 380, percent: 90, color: '#da291c' },
  { name: '电气学院', count: 350, percent: 91, color: '#7c3aed' }, { name: '计算机学院', count: 620, percent: 96, color: '#06b6d4' },
  { name: '经管学院', count: 400, percent: 87, color: '#ec4899' }, { name: '艺术学院', count: 180, percent: 82, color: '#f97316' },
  { name: '外语学院', count: 160, percent: 89, color: '#14b8a6' }, { name: '理学院', count: 200, percent: 84, color: '#8b5cf6' },
]

const provinceData = [
  { name: '黑龙江省', count: 1840 }, { name: '吉林省', count: 420 }, { name: '辽宁省', count: 380 },
  { name: '河北省', count: 280 }, { name: '山东省', count: 240 }, { name: '河南省', count: 210 }, { name: '其他省份', count: 830 },
]

const alerts = [
  { time: '14:32', type: 'info', msg: '测绘工程学院报到率达到90%' },
  { time: '14:15', type: 'warn', msg: '五公寓剩余床位不足10个' },
  { time: '13:58', type: 'info', msg: '校园网账号批量激活 1,200 个' },
  { time: '13:40', type: 'success', msg: '南2门迎新接站大巴已发车' },
  { time: '13:22', type: 'info', msg: '2026级新生数据同步至学籍系统' },
  { time: '13:05', type: 'warn', msg: '一食堂午餐时段就餐人数超800人' },
  { time: '12:50', type: 'success', msg: '东门迎新通道运行正常' },
]
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 1100px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.spec-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--hairline); margin-bottom: var(--sp-md); }
.spec-cell { background: var(--bg-canvas); padding: var(--sp-sm); text-align: center; }
.spec-num { display: block; font: 700 36px/1 var(--font-family); color: var(--text-ink); letter-spacing: -0.5px; }
.spec-lab { font: var(--font-body-sm); color: var(--text-body); margin-top: var(--sp-xxxs); }
.spec-sub { font: var(--font-caption); color: var(--text-muted); }

.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 1px; background: var(--hairline); margin-bottom: var(--sp-md); }
.chart-card { background: var(--bg-canvas); padding: var(--sp-sm); }
.card-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--text-body-strong); margin: 0 0 var(--sp-xs); }

.bar-chart { display: flex; flex-direction: column; gap: var(--sp-xxs); }
.bar-row { display: flex; align-items: center; gap: var(--sp-xxs); }
.bar-lab { font: var(--font-body-sm); color: var(--text-body); width: 72px; text-align: right; }
.bar-track { flex: 1; height: 6px; background: var(--hairline); }
.bar-fill { height: 100%; }
.bar-val { font: var(--font-caption); color: var(--text-muted); width: 36px; }

.province-list { display: flex; flex-direction: column; }
.prov-row { display: flex; justify-content: space-between; padding: var(--sp-xxs) 0; border-bottom: 1px solid var(--hairline); }
.prov-row:last-child { border-bottom: none; }
.prov-name { font: var(--font-body-sm); color: var(--text-body); }
.prov-count { font: var(--font-body-sm); color: var(--text-ink); }

.alert-list { display: flex; flex-direction: column; }
.alert-row { display: flex; align-items: center; gap: var(--sp-xxs); padding: var(--sp-xxs) 0; border-bottom: 1px solid var(--hairline); font: var(--font-body-sm); }
.alert-row:last-child { border-bottom: none; }
.alert-time { color: var(--text-muted); }
.alert-type { font: var(--font-caption-uppercase); letter-spacing: 1.1px; padding: 1px var(--sp-xxs); }
.alert-type.info { color: var(--semantic-info); }
.alert-type.warn { color: var(--semantic-warning); }
.alert-type.success { color: var(--semantic-success); }
.alert-msg { color: var(--text-body); flex: 1; }

@media (max-width: 768px) { .spec-row { grid-template-columns: repeat(2, 1fr); } .charts-row { grid-template-columns: 1fr; } .page-content { padding: var(--sp-sm) var(--sp-xs); } }
</style>
