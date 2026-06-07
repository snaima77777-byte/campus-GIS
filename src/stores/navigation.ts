import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface NavigationInstruction {
  index: number
  text: string
  played: boolean
}

export const useNavigationStore = defineStore('navigation', () => {
  const routeDistance = ref(0)
  const currentTargetNodeId = ref<number | null>(null)
  const isNavigating = ref(false)
  const hasArrivalVoice = ref(false)
  const currentRouteCoordinates = ref<[number, number][]>([])
  const navigationInstructions = ref<NavigationInstruction[]>([])
  const currentGuideIndex = ref(0)
  const lastReplanTime = ref(0)

  const walkTime = computed(() => Math.round(routeDistance.value / 80))

  function reset() {
    routeDistance.value = 0
    currentTargetNodeId.value = null
    isNavigating.value = false
    hasArrivalVoice.value = false
    currentRouteCoordinates.value = []
    navigationInstructions.value = []
    currentGuideIndex.value = 0
    lastReplanTime.value = 0
  }

  return {
    routeDistance,
    currentTargetNodeId,
    isNavigating,
    hasArrivalVoice,
    currentRouteCoordinates,
    navigationInstructions,
    currentGuideIndex,
    lastReplanTime,
    walkTime,
    reset,
  }
})
