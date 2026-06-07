<template>
  <div class="page">
    <div class="page-content">
      <section class="editorial-band">
        <p class="band-label">ROOM ASSIGNMENT</p>
        <h1 class="band-title">宿舍分配</h1>
        <p class="band-sub">房源查询 · 舍友预览 · 公寓信息</p>
      </section>

      <div class="dorm-tabs">
        <button v-for="d in dormitories" :key="d.id" class="dorm-tab" :class="{ active: selectedDorm === d.id }" @click="selectedDorm = d.id">
          {{ d.name }}
        </button>
      </div>

      <div v-if="selectedDormData" class="dorm-card">
        <div class="dorm-header">
          <h2 class="dorm-name">{{ selectedDormData.name }}</h2>
          <span class="badge-pill">标准四人间</span>
        </div>

        <div class="spec-row">
          <div class="spec-cell"><span class="spec-num">{{ selectedDormData.floors }}</span><span class="spec-lab">楼层</span></div>
          <div class="spec-cell"><span class="spec-num">{{ selectedDormData.rooms }}</span><span class="spec-lab">房间数</span></div>
          <div class="spec-cell"><span class="spec-num">87%</span><span class="spec-lab">已分配</span></div>
          <div class="spec-cell accent"><span class="spec-num">{{ selectedDormData.availableBeds }}</span><span class="spec-lab">剩余床位</span></div>
        </div>

        <div class="floor-section">
          <p class="floor-title">5层 平面图 (示例)</p>
          <div class="floor-grid">
            <div v-for="room in floorRooms" :key="room.id" class="room-cell" :class="room.status">
              <span class="room-number">{{ room.id }}</span>
              <span class="room-beds">{{ room.filled }}/4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedDorm = ref(20)
const dormitories = [
  { name: '一公寓', id: 20, floors: 6, rooms: 96, availableBeds: 12 },
  { name: '二公寓', id: 17, floors: 6, rooms: 96, availableBeds: 8 },
  { name: '三公寓', id: 13, floors: 7, rooms: 112, availableBeds: 20 },
  { name: '四公寓', id: 8, floors: 7, rooms: 112, availableBeds: 15 },
  { name: '五公寓', id: 26, floors: 6, rooms: 96, availableBeds: 5 },
  { name: '六公寓', id: 27, floors: 6, rooms: 96, availableBeds: 3 },
  { name: '七公寓', id: 64, floors: 8, rooms: 128, availableBeds: 30 },
  { name: '八公寓', id: 62, floors: 8, rooms: 128, availableBeds: 25 },
]

const selectedDormData = computed(() => dormitories.find((d) => d.id === selectedDorm.value) ?? null)

const floorRooms = Array.from({ length: 16 }, (_, i) => {
  const roomNum = 501 + i
  const statuses = ['full','available','partial','full','available','available','partial','full','available','partial','available','full','available','full','partial','available']
  const status = statuses[i] ?? 'available'
  const filled = status === 'full' ? 4 : status === 'partial' ? 3 : Math.floor(Math.random() * 2)
  return { id: String(roomNum), status, filled }
})
</script>

<style scoped>
.page { width: 100%; height: 100vh; overflow-y: auto; background: var(--bg-canvas); }
.page-content { max-width: 900px; margin: 0 auto; padding: var(--sp-lg) var(--sp-md); }

.editorial-band { margin-bottom: var(--sp-lg); padding-bottom: var(--sp-md); border-bottom: 1px solid var(--hairline); }
.band-label { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--primary); margin-bottom: var(--sp-xxs); }
.band-title { font: var(--font-display-xl); color: var(--text-ink); margin: 0; letter-spacing: -0.36px; }
.band-sub { font: var(--font-body-md); color: var(--text-body); margin-top: var(--sp-xxxs); }

.dorm-tabs { display: flex; gap: var(--sp-xxxs); flex-wrap: wrap; margin-bottom: var(--sp-md); }
.dorm-tab { height: 36px; padding: 0 var(--sp-xs); font: var(--font-caption-uppercase); letter-spacing: 0.65px; text-transform: uppercase; background: transparent; border: 1px solid var(--hairline); color: var(--text-muted); cursor: pointer; transition: all 0.15s; }
.dorm-tab:hover { color: var(--text-ink); }
.dorm-tab.active { border-color: var(--primary); color: var(--primary); }

.dorm-card { background: var(--bg-canvas); border: 1px solid var(--hairline); padding: var(--sp-md); }
.dorm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--sp-md); }
.dorm-name { font: var(--font-display-md); color: var(--text-ink); margin: 0; font-weight: 500; }
.badge-pill { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; padding: var(--sp-xxxs) var(--sp-xxs); background: var(--bg-canvas-elevated); color: var(--text-body); border-radius: var(--radius-full); }

.spec-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--hairline); margin-bottom: var(--sp-md); }
.spec-cell { background: var(--bg-canvas-elevated); padding: var(--sp-sm); text-align: center; }
.spec-num { display: block; font: 700 36px/1 var(--font-family); color: var(--text-ink); letter-spacing: -0.5px; }
.spec-lab { font: var(--font-caption-uppercase); letter-spacing: 1.1px; color: var(--text-muted); margin-top: var(--sp-xxxs); }
.spec-cell.accent .spec-num { color: var(--primary); }

.floor-section { margin-top: var(--sp-sm); }
.floor-title { font: var(--font-caption-uppercase); letter-spacing: 1.1px; text-transform: uppercase; color: var(--text-body-strong); margin: 0 0 var(--sp-xs); }

.floor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--hairline); }
.room-cell { display: flex; flex-direction: column; align-items: center; padding: var(--sp-sm); background: var(--bg-canvas); transition: background 0.15s; }
.room-cell.full { opacity: 0.35; }
.room-cell.available { background: rgba(3, 144, 74, 0.05); }
.room-cell.available:hover { background: rgba(3, 144, 74, 0.1); }
.room-cell.partial { background: rgba(245, 158, 11, 0.05); }
.room-number { font: var(--font-title-sm); color: var(--text-ink); }
.room-beds { font: var(--font-caption); color: var(--text-muted); }
.room-cell.available .room-beds { color: var(--semantic-success); }

@media (max-width: 768px) { .spec-row { grid-template-columns: repeat(2, 1fr); } .floor-grid { grid-template-columns: repeat(2, 1fr); } .page-content { padding: var(--sp-sm) var(--sp-xs); } }
</style>
