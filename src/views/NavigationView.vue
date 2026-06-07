<template>
  <div class="navigation-page">
    <div id="nav-map" class="nav-map"></div>

    <div class="nav-overlay">
      <NavigationControlPanel
        :location-mode="locationMode"
        :start-building="startBuilding"
        @update:location-mode="onLocationModeChange"
        @update:start-building="startBuilding = $event"
        @go-registration="goRegistration"
        @go-dormitory="showDormitoryModal = true"
        @go-dining="showDiningModal = true"
        @go-free-navigation="showFreeNavigationModal = true"
      />
      <RouteInfoBar />
    </div>

    <DestinationModal
      v-if="showDormitoryModal"
      title="选择宿舍"
      :options="dormitoryOptions"
      :model-value="dormitoryName"
      @update:model-value="dormitoryName = $event"
      @confirm="confirmDormitory"
      @cancel="showDormitoryModal = false"
    />
    <DestinationModal
      v-if="showDiningModal"
      title="选择食堂"
      :options="diningOptions"
      :model-value="diningName"
      @update:model-value="diningName = $event"
      @confirm="confirmDining"
      @cancel="showDiningModal = false"
    />
    <DestinationModal
      v-if="showFreeNavigationModal"
      title="自由导航"
      :options="freeNavOptions"
      :model-value="freeEndBuilding"
      @update:model-value="freeEndBuilding = $event"
      :show-start="true"
      :start-value="freeStartBuilding"
      @update:start-value="freeStartBuilding = $event"
      @confirm="confirmFreeNavigation"
      @cancel="showFreeNavigationModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useMap } from '@/composables/useMap'
import { useNavigation } from '@/composables/useNavigation'
import { useGeolocation } from '@/composables/useGeolocation'
import { useStudentStore } from '@/stores/student'
import { buildings } from '@/mock/buildings'
import NavigationControlPanel from '@/components/NavigationControlPanel.vue'
import RouteInfoBar from '@/components/RouteInfoBar.vue'
import DestinationModal from '@/components/DestinationModal.vue'

const { initMap, getMap } = useMap()
const nav = useNavigation()
const geo = useGeolocation()
const studentStore = useStudentStore()

geo.setNavMethods(nav)

const locationMode = ref<'manual' | 'gps'>('manual')
const startBuilding = ref('东门')
const showDormitoryModal = ref(false)
const showDiningModal = ref(false)
const showFreeNavigationModal = ref(false)
const dormitoryName = ref('一公寓')
const diningName = ref('第一食堂')
const freeStartBuilding = ref(buildings[0]?.name ?? '东门')
const freeEndBuilding = ref(buildings[1]?.name ?? '图书馆')

const dormitoryOptions = [
  { name: '一公寓' }, { name: '二公寓' }, { name: '三公寓' }, { name: '四公寓' },
  { name: '五公寓' }, { name: '六公寓' }, { name: '七公寓' }, { name: '八公寓' },
]

const diningOptions = [
  { name: '第一食堂' }, { name: '第二食堂' }, { name: '第三食堂' },
]

const freeNavOptions = buildings.map((b) => ({ name: b.name }))

// Map names to road node IDs
function getDormitoryNodeId(name: string): number {
  const map: Record<string, number> = {
    '一公寓': 20, '二公寓': 17, '三公寓': 13, '四公寓': 8,
    '五公寓': 26, '六公寓': 27, '七公寓': 64, '八公寓': 62,
  }
  return map[name] ?? 20
}

function getDiningNodeId(name: string): number {
  const map: Record<string, number> = {
    '第一食堂': 45, '第二食堂': 57, '第三食堂': 23,
  }
  return map[name] ?? 45
}

function getBuildingNodeId(name: string): number {
  const building = buildings.find((b) => b.name === name)
  if (!building) return 30
  return nav.findNearestRoadNode(building.coordinate as number[])
}

function onLocationModeChange(val: string) {
  locationMode.value = val as 'manual' | 'gps'
}

function goRegistration() {
  nav.startNavigationManual(startBuilding.value, 30)
}

function confirmDormitory() {
  showDormitoryModal.value = false
  const nodeId = getDormitoryNodeId(dormitoryName.value)
  if (locationMode.value === 'gps') {
    nav.startNavigation(undefined, nodeId)
  } else {
    nav.startNavigationManual(startBuilding.value, nodeId)
  }
}

function confirmDining() {
  showDiningModal.value = false
  const nodeId = getDiningNodeId(diningName.value)
  if (locationMode.value === 'gps') {
    nav.startNavigation(undefined, nodeId)
  } else {
    nav.startNavigationManual(startBuilding.value, nodeId)
  }
}

function confirmFreeNavigation() {
  if (!freeStartBuilding.value || !freeEndBuilding.value) return
  const startNodeId = getBuildingNodeId(freeStartBuilding.value)
  const endNodeId = getBuildingNodeId(freeEndBuilding.value)
  showFreeNavigationModal.value = false
  if (locationMode.value === 'gps') {
    nav.startNavigation(undefined, endNodeId)
  } else {
    nav.startNavigation(startNodeId, endNodeId)
  }
}

watch(locationMode, (mode) => {
  if (mode === 'gps') {
    geo.startWatch()
  } else {
    geo.stopWatch()
  }
})

onMounted(() => {
  const map = initMap('nav-map')
  ;(window as any).__campusMap = map
  studentStore.hydrate()
})

onBeforeUnmount(() => {
  geo.stopWatch()
  const map = getMap()
  if (map) map.setTarget(undefined)
  ;(window as any).__campusMap = null
})
</script>

<style scoped>
.navigation-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.nav-map {
  width: 100%;
  height: 100%;
}

.nav-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--control-panel-width);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-lg);
  gap: var(--space-sm);
}

@media (max-width: 768px) {
  .nav-overlay {
    width: 100%;
    padding: var(--space-sm);
  }
}
</style>
