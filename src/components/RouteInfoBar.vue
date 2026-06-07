<template>
  <div class="route-info" v-if="navStore.isNavigating || navStore.routeDistance > 0">
    <div class="info-item">
      <span class="info-label">距离</span>
      <strong class="info-value">{{ navStore.routeDistance }}<small>m</small></strong>
    </div>
    <div class="info-divider"></div>
    <div class="info-item">
      <span class="info-label">步行</span>
      <strong class="info-value">{{ navStore.walkTime }}<small>min</small></strong>
    </div>
    <div class="info-divider"></div>
    <div class="info-item">
      <span class="info-label">状态</span>
      <strong class="info-value status" :class="{ active: navStore.isNavigating }">
        {{ navStore.isNavigating ? '导航中' : '就绪' }}
      </strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'

const navStore = useNavigationStore()
</script>

<style scoped>
.route-info {
  display: flex;
  align-items: center;
  gap: var(--sp-xxs);
  background: var(--bg-canvas);
  border: 1px solid var(--hairline);
  padding: var(--sp-xs) var(--sp-sm);
  pointer-events: auto;
}
.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.info-label {
  font: var(--font-caption-uppercase);
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.info-value {
  font: var(--font-display-md);
  color: var(--text-ink);
  font-weight: 500;
}
.info-value small {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-muted);
}
.info-value.status {
  color: var(--semantic-warning);
}
.info-value.status.active {
  color: var(--semantic-success);
}
.info-divider {
  width: 1px;
  height: 28px;
  background: var(--hairline);
}
</style>
