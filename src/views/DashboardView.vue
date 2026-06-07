<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <!-- Header — cinematic editorial band -->
      <section class="editorial-band">
        <p class="band-label">DASHBOARD</p>
        <h1 class="band-title">同学，欢迎你</h1>
        <p class="band-name">{{ studentStore.name }}</p>
        <p class="band-subtitle">{{ studentStore.college }}</p>
      </section>

      <!-- Stat cells — Ferrari spec-cell inspired -->
      <section class="spec-row">
        <div class="spec-cell">
          <span class="spec-number">4</span>
          <span class="spec-label">报到流程</span>
        </div>
        <div class="spec-cell">
          <span class="spec-number">24</span>
          <span class="spec-label">校园建筑</span>
        </div>
        <div class="spec-cell">
          <span class="spec-number">3</span>
          <span class="spec-label">食堂</span>
        </div>
        <div class="spec-cell">
          <span class="spec-number">8</span>
          <span class="spec-label">公寓</span>
        </div>
      </section>

      <!-- Quick action tiles — Ferrari feature-card grid -->
      <section class="tile-section">
        <p class="section-label">快捷功能</p>
        <div class="tile-grid">
          <QuickActionTile
            v-for="tile in tiles"
            :key="tile.route"
            :icon="tile.icon"
            :title="tile.title"
            :description="tile.description"
            :route="tile.route"
          />
        </div>
      </section>

      <!-- Bottom row: mini map + announcements -->
      <section class="bottom-row">
        <div class="feature-card">
          <div class="card-header">
            <p class="card-label">校园地图预览</p>
            <router-link to="/navigation" class="text-link">打开导航 →</router-link>
          </div>
          <CampusMapThumbnail />
        </div>
        <div class="feature-card">
          <p class="card-label">通知公告</p>
          <div class="announcement-list">
            <div v-for="(item, i) in announcements" :key="i" class="announcement-item">
              <span class="ann-icon">{{ item.icon }}</span>
              <span class="ann-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import QuickActionTile from '@/components/QuickActionTile.vue'
import CampusMapThumbnail from '@/components/CampusMapThumbnail.vue'

const studentStore = useStudentStore()

const tiles = [
  { icon: 'fa fa-map-signs', title: '校园导航', description: 'GPS定位 · 路径规划 · 语音导航', route: '/navigation' },
  { icon: 'fa fa-pencil-square-o', title: '报到注册', description: '信息采集 · 在线报到', route: '/register' },
  { icon: 'fa fa-cutlery', title: '餐饮指南', description: '食堂查询 · 菜单预览', route: '/dining' },
  { icon: 'fa fa-futbol-o', title: '体育场馆', description: '场地查询 · 预约', route: '/sports' },
  { icon: 'fa fa-user', title: '个人信息', description: '资料查看 · 修改', route: '/profile' },
  { icon: 'fa fa-bed', title: '宿舍分配', description: '房源查询 · 舍友预览', route: '/room-assignment' },
  { icon: 'fa fa-tree', title: '校园生活', description: '服务设施 · 活动日历', route: '/campus-life' },
  { icon: 'fa fa-bar-chart', title: '数据看板', description: '报到统计 · 趋势分析', route: '/data' },
]

const announcements = [
  { icon: '📢', text: '2026级新生请提前完成线上信息采集' },
  { icon: '🏫', text: '报到当天火车站设有迎新接站点 (6:30-22:00)' },
  { icon: '📌', text: '宿舍分配可通过「宿舍分配」功能提前查看' },
  { icon: '🗺️', text: '使用校园导航功能可快速找到报到地点' },
  { icon: '📱', text: '请关注学院公众号获取最新迎新动态' },
]
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg-canvas);
}
.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--sp-lg) var(--sp-md);
}

/* Editorial band */
.editorial-band {
  margin-bottom: var(--sp-lg);
  padding-bottom: var(--sp-md);
  border-bottom: 1px solid var(--hairline);
}
.band-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--sp-xxs);
}
.band-title {
  font: var(--font-display-xl);
  color: var(--text-ink);
  margin: 0;
  letter-spacing: -0.36px;
}
.band-name {
  font: var(--font-display-md);
  color: var(--text-ink);
  margin: var(--sp-xxxs) 0 0;
}
.band-subtitle {
  font: var(--font-body-md);
  color: var(--text-body);
  margin: var(--sp-xxxs) 0 0;
}

/* Spec cells — Ferrari style number-display */
.spec-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-bottom: var(--sp-lg);
  background: var(--hairline);
}
.spec-cell {
  background: var(--bg-canvas);
  padding: var(--sp-sm);
  text-align: center;
}
.spec-number {
  display: block;
  font: var(--font-number);
  color: var(--text-ink);
}
.spec-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: var(--sp-xxxs);
}

/* Section label */
.section-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-body);
  margin-bottom: var(--sp-xs);
}

/* Tile grid */
.tile-section {
  margin-bottom: var(--sp-md);
}
.tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--hairline);
}

/* Feature cards */
.bottom-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1px;
  background: var(--hairline);
}
.feature-card {
  background: var(--bg-canvas);
  padding: var(--sp-sm);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sp-xs);
}
.card-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-body-strong);
}
.text-link {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--primary);
  text-decoration: none;
  transition: opacity 0.15s;
}
.text-link:hover {
  opacity: 0.8;
}
.announcement-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-xxs);
}
.announcement-item {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-xxs);
  font: var(--font-body-sm);
  color: var(--text-body);
  padding: var(--sp-xxs) 0;
  border-bottom: 1px solid var(--hairline);
}
.announcement-item:last-child {
  border-bottom: none;
}
.ann-icon { flex-shrink: 0; }
.ann-text { line-height: 1.5; }

@media (max-width: 1024px) {
  .tile-grid { grid-template-columns: repeat(3, 1fr); }
  .bottom-row { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .dashboard-content { padding: var(--sp-sm) var(--sp-xs); }
  .spec-row { grid-template-columns: repeat(2, 1fr); }
  .tile-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
