<template>
  <router-link :to="route" class="tile">
    <div class="tile-icon">
      <i :class="icon"></i>
    </div>
    <div class="tile-body">
      <span class="tile-title">{{ title }}</span>
      <span class="tile-desc">{{ description }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  route: string
}>()
</script>

<style scoped>
.tile {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-xs);
  background: var(--bg-canvas);
  padding: var(--sp-sm);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s;
}

.tile:hover {
  background: var(--bg-canvas-elevated);
}

.tile-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tile-icon i {
  font-size: 18px;
  color: var(--primary);
}

.tile-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.tile-title {
  font: var(--font-title-sm);
  color: var(--text-ink);
}

.tile-desc {
  font: var(--font-caption);
  color: var(--text-muted);
}
</style>
