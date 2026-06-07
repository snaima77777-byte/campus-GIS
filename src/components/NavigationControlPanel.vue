<template>
  <div class="control-panel">
    <p class="panel-label">定位方式</p>
    <div class="mode-toggle">
      <button
        :class="{ active: locationMode === 'manual' }"
        @click="$emit('update:locationMode', 'manual')"
      >
        手动选择
      </button>
      <button
        :class="{ active: locationMode === 'gps' }"
        @click="$emit('update:locationMode', 'gps')"
      >
        <i class="fa fa-location-arrow"></i>
        GPS 自动
      </button>
    </div>

    <div v-if="locationMode === 'manual'" class="field">
      <label class="panel-label">当前位置</label>
      <select
        class="form-select"
        :value="startBuilding"
        @change="$emit('update:startBuilding', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="b in buildings" :key="b.name" :value="b.name">
          {{ b.name }}
        </option>
      </select>
    </div>

    <div class="action-grid">
      <button class="action-btn" @click="$emit('goRegistration')">
        入学登记
      </button>
      <button class="action-btn" @click="$emit('goDormitory')">
        宿舍入住
      </button>
      <button class="action-btn" @click="$emit('goDining')">
        校园就餐
      </button>
      <button class="action-btn primary" @click="$emit('goFreeNavigation')">
        自由导航
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buildings } from '@/mock/buildings'

defineProps<{
  locationMode: string
  startBuilding: string
}>()

defineEmits<{
  'update:locationMode': [value: string]
  'update:startBuilding': [value: string]
  goRegistration: []
  goDormitory: []
  goDining: []
  goFreeNavigation: []
}>()
</script>

<style scoped>
.control-panel {
  background: var(--bg-canvas);
  border: 1px solid var(--hairline);
  padding: var(--sp-sm);
  pointer-events: auto;
}

.panel-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-body);
  margin-bottom: var(--sp-xxs);
}

.mode-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--hairline);
  margin-bottom: var(--sp-xs);
}

.mode-toggle button {
  height: 40px;
  border: none;
  background: var(--bg-canvas-elevated);
  color: var(--text-body);
  font: 600 12px/1.0 var(--font-family);
  letter-spacing: 0.65px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
}

.mode-toggle button.active {
  background: var(--primary);
  color: var(--text-on-primary);
}

.field {
  margin-bottom: var(--sp-xs);
}

.form-select {
  width: 100%;
  height: 40px;
  background: var(--bg-canvas-elevated);
  border: 1px solid var(--hairline);
  color: var(--text-ink);
  padding: 0 var(--sp-xxs);
  font: var(--font-body-md);
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary);
}

.form-select option {
  background: var(--bg-canvas-elevated);
  color: var(--text-ink);
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-xxs);
}

.action-btn {
  height: var(--cta-height);
  border: 1px solid var(--hairline);
  background: var(--bg-canvas-elevated);
  color: var(--text-body);
  font: var(--font-button);
  letter-spacing: var(--font-button-spacing);
  text-transform: var(--font-button-transform);
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn:hover {
  color: var(--text-ink);
  border-color: var(--text-muted);
}

.action-btn.primary {
  border-color: var(--primary);
  color: var(--primary);
}

.action-btn.primary:hover {
  background: var(--primary);
  color: var(--text-on-primary);
}
</style>
