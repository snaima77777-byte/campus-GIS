<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">CAMPUS LIFE</p>
        <h1 class="band-title">校园生活</h1>
        <p class="band-sub">服务设施 · 活动日历 · 校园资讯</p>
      </section>

      <section class="card-section">
        <p class="section-label">校园服务</p>
        <div class="card-grid">
          <div v-for="svc in services" :key="svc.name" class="svc-card">
            <div class="svc-icon"><i :class="svc.icon"></i></div>
            <div class="svc-info">
              <span class="svc-name">{{ svc.name }}</span>
              <span class="svc-detail">{{ svc.detail }}</span>
            </div>
            <span class="svc-status" :class="svc.status === '开放' || svc.status === '值班中' || svc.status === '营业中' ? 'open' : 'closed'">{{ svc.status }}</span>
          </div>
        </div>
      </section>

      <section class="card-section">
        <p class="section-label">近期活动</p>
        <div class="event-list">
          <div v-for="evt in events" :key="evt.title" class="event-card">
            <div class="event-date">
              <span class="event-day">{{ evt.day }}</span>
              <span class="event-month">{{ evt.month }}</span>
            </div>
            <div class="event-info">
              <span class="event-title">{{ evt.title }}</span>
              <span class="event-loc">{{ evt.location }}</span>
            </div>
            <span class="badge-pill">{{ evt.tag }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const services = [
  { name: '图书馆', icon: 'fa fa-book', detail: '开放 08:00 - 22:00', status: '开放' },
  { name: '校医院', icon: 'fa fa-medkit', detail: '24小时急诊', status: '值班中' },
  { name: '校园超市', icon: 'fa fa-shopping-cart', detail: '润泽园一楼', status: '营业中' },
  { name: '快递点', icon: 'fa fa-truck', detail: '菜鸟驿站', status: '营业中' },
  { name: '打印店', icon: 'fa fa-print', detail: '行知楼1F', status: '营业中' },
  { name: '咖啡厅', icon: 'fa fa-coffee', detail: '图书馆B1', status: '已休息' },
]

const events = [
  { day: '9/1', month: 'SEP', title: '2026级新生开学典礼', location: '校友广场', tag: '典礼' },
  { day: '9/2', month: 'SEP', title: '新生军训动员大会', location: '体育场', tag: '军训' },
  { day: '9/5', month: 'SEP', title: '各院系新生见面会', location: '各教学楼', tag: '院系' },
  { day: '9/10', month: 'SEP', title: '社团招新嘉年华', location: '校友广场', tag: '社团' },
  { day: '9/15', month: 'SEP', title: '图书馆新生入馆教育', location: '图书馆报告厅', tag: '讲座' },
]
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 960px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.card-section { margin-top: var(--sp-lg); }
.section-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--text-body-strong); margin-bottom: var(--sp-xs); padding-bottom: var(--sp-xxs); border-bottom: 1px solid var(--hairline); }

.card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--hairline); }
.svc-card { display: flex; align-items: center; gap: var(--sp-xs); background: var(--bg-canvas); padding: var(--sp-sm); transition: background 0.15s; }
.svc-card:hover { background: var(--bg-canvas-elevated); }
.svc-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.svc-icon i { font-size: 16px; color: var(--primary); }
.svc-info { flex: 1; display: flex; flex-direction: column; }
.svc-name { font: var(--font-title-sm); color: var(--text-ink); }
.svc-detail { font: var(--font-caption); color: var(--text-muted); }
.svc-status { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; padding: var(--sp-xxxs) var(--sp-xxs); }
.svc-status.open { color: var(--semantic-success); }
.svc-status.closed { color: var(--text-muted); }

.event-list { display: flex; flex-direction: column; gap: 1px; background: var(--hairline); }
.event-card { display: flex; align-items: center; gap: var(--sp-xs); background: var(--bg-canvas); padding: var(--sp-sm); transition: background 0.15s; }
.event-card:hover { background: var(--bg-canvas-elevated); }
.event-date { width: 44px; display: flex; flex-direction: column; align-items: center; }
.event-day { font: var(--font-title-md); color: var(--text-ink); }
.event-month { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); }
.event-info { flex: 1; display: flex; flex-direction: column; }
.event-title { font: var(--font-title-sm); color: var(--text-ink); }
.event-loc { font: var(--font-caption); color: var(--text-muted); }
.badge-pill { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; padding: var(--sp-xxxs) var(--sp-xxs); background: var(--bg-canvas-elevated); color: var(--text-body); border-radius: var(--radius-full); white-space: nowrap; }

@media (max-width: 768px) {
  .card-grid { grid-template-columns: 1fr; }
  .page-content { padding: var(--sp-sm) var(--sp-xs); }
}
</style>
