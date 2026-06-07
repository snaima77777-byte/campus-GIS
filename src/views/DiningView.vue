<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">DINING</p>
        <h1 class="band-title">餐饮指南</h1>
        <p class="band-sub">食堂查询 · 菜单预览 · 就餐指引</p>
      </section>

      <div class="canteen-list">
        <div v-for="c in canteens" :key="c.name" class="canteen-card">
          <div class="canteen-header">
            <div class="canteen-icon"><i class="fa fa-cutlery"></i></div>
            <div class="canteen-title-row">
              <h3 class="canteen-name">{{ c.name }}</h3>
              <span class="canteen-loc">{{ c.location }}</span>
            </div>
            <div class="crowd-block">
              <div class="crowd-bar">
                <div class="crowd-fill" :style="{ width: c.crowdLevel + '%' }" :class="c.crowdClass"></div>
              </div>
              <span class="crowd-text">{{ c.crowdText }}</span>
            </div>
          </div>

          <div class="canteen-menu">
            <div class="menu-row"><span class="menu-label">早餐</span><span class="menu-items">{{ c.breakfast }}</span></div>
            <div class="menu-row"><span class="menu-label">午餐</span><span class="menu-items">{{ c.lunch }}</span></div>
            <div class="menu-row"><span class="menu-label">晚餐</span><span class="menu-items">{{ c.dinner }}</span></div>
          </div>

          <div class="canteen-footer">
            <span class="hours">{{ c.hours }}</span>
            <router-link to="/navigation" class="cta-link">导航前往 →</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const canteensRaw = [
  { name: '第一食堂', location: '行知楼B区东侧', hours: '06:30 - 20:30',
    breakfast: '包子 · 油条 · 豆浆 · 鸡蛋饼 · 粥', lunch: '盖浇饭 · 刀削面 · 麻辣烫 · 炒菜套餐',
    dinner: '炒饭 · 饺子 · 砂锅 · 凉皮', crowdLevel: 65 },
  { name: '第二食堂', location: '土木楼北侧', hours: '07:00 - 21:00',
    breakfast: '煎饼果子 · 面包 · 牛奶 · 茶叶蛋', lunch: '兰州拉面 · 黄焖鸡 · 石锅拌饭 · 麻辣香锅',
    dinner: '烧烤 · 米线 · 馄饨 · 炸鸡饭', crowdLevel: 40 },
  { name: '第三食堂', location: '三公寓南侧', hours: '06:30 - 20:00',
    breakfast: '肉夹馍 · 烧饼 · 小米粥 · 豆腐脑', lunch: '自选快餐 · 铁板烧 · 酸菜鱼 · 煲仔饭',
    dinner: '锅贴 · 蛋炒饭 · 汤面 · 小炒', crowdLevel: 80 },
]

const canteens = computed(() =>
  canteensRaw.map((c) => ({
    ...c,
    crowdText: c.crowdLevel > 70 ? '拥挤' : c.crowdLevel > 40 ? '适中' : '空闲',
    crowdClass: c.crowdLevel > 70 ? 'crowded' : c.crowdLevel > 40 ? 'moderate' : 'quiet',
  })),
)
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 900px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.canteen-list { display: flex; flex-direction: column; gap: 1px; background: var(--hairline); }
.canteen-card { background: var(--bg-canvas); padding: var(--sp-md); }

.canteen-header { display: flex; align-items: center; gap: var(--sp-xs); margin-bottom: var(--sp-sm); }
.canteen-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.canteen-icon i { font-size: 16px; color: var(--primary); }
.canteen-title-row { flex: 1; }
.canteen-name { font: var(--font-title-md); color: var(--text-ink); margin: 0; }
.canteen-loc { font: var(--font-caption); color: var(--text-muted); }

.crowd-block { width: 72px; }
.crowd-bar { height: 3px; background: var(--hairline); margin-bottom: 3px; }
.crowd-fill { height: 100%; }
.crowd-fill.quiet { background: var(--semantic-success); }
.crowd-fill.moderate { background: #f59e0b; }
.crowd-fill.crowded { background: var(--semantic-warning); }
.crowd-text { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); }

.canteen-menu { display: flex; flex-direction: column; gap: var(--sp-xxs); padding: var(--sp-xs) 0; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); }
.menu-row { display: flex; gap: var(--sp-xxs); }
.menu-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); min-width: 32px; }
.menu-items { font: var(--font-body-sm); color: var(--text-body); }

.canteen-footer { display: flex; justify-content: space-between; align-items: center; margin-top: var(--sp-xs); }
.hours { font: var(--font-caption); color: var(--text-muted); }
.cta-link { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); text-decoration: none; }

@media (max-width: 768px) {
  .page-content { padding: var(--sp-sm) var(--sp-xs); }
  .canteen-card { padding: var(--sp-sm); }
}
</style>
