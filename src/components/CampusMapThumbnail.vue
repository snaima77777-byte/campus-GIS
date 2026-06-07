<template>
  <div class="thumbnail-map">
    <div id="dashboard-mini-map" class="map-target"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useMap } from '@/composables/useMap'

const { initMap, getMap } = useMap()

onMounted(() => {
  initMap('dashboard-mini-map', { interactive: false, zoom: 15 })
})

onBeforeUnmount(() => {
  const map = getMap()
  if (map) {
    map.setTarget(undefined)
  }
})
</script>

<style scoped>
.thumbnail-map {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.map-target {
  width: 100%;
  height: 100%;
}

:deep(.ol-control) {
  display: none;
}

:deep(.ol-attribution) {
  display: none !important;
}
</style>
