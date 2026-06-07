<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">SPORTS</p>
        <h1 class="band-title">体育场馆</h1>
        <p class="band-sub">场地查询 · 开放时间 · 设施概览</p>
      </section>

      <div class="venue-grid">
        <div v-for="v in venues" :key="v.name" class="venue-card">
          <div class="venue-icon"><i :class="v.icon"></i></div>
          <div class="venue-body">
            <div class="venue-top">
              <h3 class="venue-name">{{ v.name }}</h3>
              <span class="badge-pill" :class="v.available ? 'available' : 'unavailable'">
                {{ v.available ? '可用' : '维护中' }}
              </span>
            </div>
            <p class="venue-desc">{{ v.description }}</p>
            <div class="venue-bottom">
              <span class="venue-info"><i class="fa fa-clock-o"></i> {{ v.hours }}</span>
              <span class="venue-info"><i class="fa fa-map-marker"></i> {{ v.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const venues = [
  { name: '田径运动场', icon: 'fa fa-flag', description: '标准400米跑道 · 足球场 · 看台座位', hours: '06:00 - 21:00', location: '校园南部', available: true },
  { name: '体育馆', icon: 'fa fa-building', description: '篮球 · 排球 · 羽毛球 · 乒乓球', hours: '08:00 - 22:00', location: '图书馆东侧', available: true },
  { name: '室外篮球场', icon: 'fa fa-circle-o', description: '6片标准篮球场地 · 灯光照明', hours: '全天开放', location: '三公寓后', available: true },
  { name: '网球场', icon: 'fa fa-circle', description: '2片标准网球场地', hours: '08:00 - 20:00', location: '明德楼东侧', available: false },
  { name: '游泳馆', icon: 'fa fa-tint', description: '标准50米泳池 · 恒温系统', hours: '14:00 - 21:00', location: '体育馆B1', available: true },
  { name: '健身房', icon: 'fa fa-heartbeat', description: '器械区 · 自由重量区 · 有氧区', hours: '09:00 - 22:00', location: '体育馆2F', available: true },
]
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 900px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.venue-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--hairline); }
.venue-card { display: flex; gap: var(--sp-xs); background: var(--bg-canvas); padding: var(--sp-sm); transition: background 0.15s; }
.venue-card:hover { background: var(--bg-canvas-elevated); }
.venue-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.venue-icon i { font-size: 18px; color: var(--primary); }
.venue-body { flex: 1; display: flex; flex-direction: column; gap: var(--sp-xxs); }
.venue-top { display: flex; justify-content: space-between; align-items: center; }
.venue-name { font: var(--font-title-md); color: var(--text-ink); margin: 0; }
.badge-pill { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; padding: var(--sp-xxxs) var(--sp-xxs); border-radius: var(--radius-full); }
.badge-pill.available { color: var(--semantic-success); }
.badge-pill.unavailable { color: var(--semantic-warning); }
.venue-desc { font: var(--font-body-sm); color: var(--text-body); margin: 0; }
.venue-bottom { display: flex; gap: var(--sp-xs); }
.venue-info { font: var(--font-caption); color: var(--text-muted); }

@media (max-width: 768px) { .venue-grid { grid-template-columns: 1fr; } .page-content { padding: var(--sp-sm) var(--sp-xs); } }
</style>
