import { ref, type Ref } from 'vue'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import gcoord from 'gcoord'
import { roadNodes } from '@/mock/roads'
import { useNavigationStore } from '@/stores/navigation'
import { useVoiceNavigation } from './useVoiceNavigation'

import gpsIcon from '@/assets/student.png'

import type { useNavigation } from './useNavigation'

export function useGeolocation() {
  const currentGpsCoordinate: Ref<[number, number] | null> = ref(null)
  const userLon = ref(0)
  const userLat = ref(0)
  const watchId: Ref<number | null> = ref(null)
  let userLayer: any = null

  const navStore = useNavigationStore()
  const { speak } = useVoiceNavigation()

  let navMethods: ReturnType<typeof useNavigation> | null = null

  function setNavMethods(methods: ReturnType<typeof useNavigation>) {
    navMethods = methods
  }

  function getMapInstance() {
    return (window as any).__campusMap
  }

  function getGpsBD09(): [number, number] | null {
    if (!currentGpsCoordinate.value) return null
    return gcoord.transform(
      currentGpsCoordinate.value,
      gcoord.WGS84,
      gcoord.BD09,
    ) as [number, number]
  }

  function getDistance(p1: [number, number], p2: [number, number]) {
    const dx = p1[0] - p2[0]
    const dy = p1[1] - p2[1]
    return Math.sqrt(dx * dx + dy * dy)
  }

  function updateUserLocation(lon: number, lat: number) {
    userLon.value = lon
    userLat.value = lat
    currentGpsCoordinate.value = [lon, lat]

    const map = getMapInstance()
    if (!map) return

    if (userLayer) {
      map.removeLayer(userLayer)
    }

    const gcj02 = gcoord.transform([lon, lat], gcoord.WGS84, gcoord.GCJ02) as [number, number]
    const feature = new Feature({
      geometry: new Point(fromLonLat(gcj02)),
    })
    feature.setStyle(
      new Style({
        image: new Icon({ src: gpsIcon, scale: 0.15, anchor: [0.5, 0.5] }),
      }),
    )

    userLayer = new VectorLayer({
      source: new VectorSource({ features: [feature] }),
    })
    map.addLayer(userLayer)
  }

  function isOffRoute(gps: [number, number]): boolean {
    const coords = navStore.currentRouteCoordinates
    if (coords.length === 0) return false
    let minDistance = Infinity
    coords.forEach((point) => {
      const d = getDistance(gps, point)
      if (d < minDistance) minDistance = d
    })
    return minDistance > 0.00015
  }

  function autoReplan() {
    if (!navStore.isNavigating) return
    if (!currentGpsCoordinate.value) return
    const targetId = navStore.currentTargetNodeId
    if (targetId === null) return

    const now = Date.now()
    if (now - navStore.lastReplanTime < 5000) return

    const gpsBD09 = getGpsBD09()
    if (!gpsBD09) return

    if (isOffRoute(gpsBD09)) {
      navStore.lastReplanTime = now
      speak('您已偏离路线，正在重新规划')
      console.log('偏航 — 重新规划')

      if (navMethods) {
        navMethods.startNavigation(undefined, targetId, true, gpsBD09)
      }
    }
  }

  function checkGuideVoice() {
    if (!currentGpsCoordinate.value) return
    const gpsBD09 = getGpsBD09()
    if (!gpsBD09) return
    const route = navStore.currentRouteCoordinates
    if (route.length < 3) return

    const index = navStore.currentGuideIndex
    if (index >= route.length - 2) return

    const targetPoint = route[index + 1]
    if (!targetPoint) return

    const distance = getDistance(gpsBD09, targetPoint)
    if (distance < 0.00005) {
      speak('请继续直行')
      navStore.currentGuideIndex++
    }
  }

  function checkNavigationVoice() {
    if (!currentGpsCoordinate.value) return
    const gpsBD09 = getGpsBD09()
    if (!gpsBD09) return

    navStore.navigationInstructions.forEach((item) => {
      if (item.played) return
      const point = navStore.currentRouteCoordinates[item.index]
      if (!point) return
      const distance = getDistance(gpsBD09, point)
      if (distance < 0.00012) {
        speak(item.text)
        item.played = true
      }
    })
  }

  function checkArrival() {
    if (!currentGpsCoordinate.value) return
    const targetId = navStore.currentTargetNodeId
    if (targetId === null) return

    const targetNode = roadNodes.find((item) => item.id === targetId)
    if (!targetNode) return

    const gpsBD09 = getGpsBD09()
    if (!gpsBD09) return

    const distance = getDistance(
      currentGpsCoordinate.value,
      targetNode.coordinate as [number, number],
    )

    if (distance < 0.0002 && !navStore.hasArrivalVoice) {
      speak('即将到达目的地')
      navStore.hasArrivalVoice = true
    }
    if (distance < 0.00005) {
      speak('您已到达目的地')
      alert('到达目的地')
      navStore.isNavigating = false
    }
  }

  function startWatch() {
    if (!navigator.geolocation) {
      alert('当前设备不支持GPS')
      return
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const lon = position.coords.longitude
        const lat = position.coords.latitude
        updateUserLocation(lon, lat)
        autoReplan()
        checkGuideVoice()
        checkNavigationVoice()
        checkArrival()
      },
      (error) => {
        console.error('GPS error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
    watchId.value = id
  }

  function stopWatch() {
    if (watchId.value !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId.value)
      watchId.value = null
    }
  }

  return {
    currentGpsCoordinate,
    userLon,
    userLat,
    getGpsBD09,
    updateUserLocation,
    isOffRoute,
    autoReplan,
    checkGuideVoice,
    checkNavigationVoice,
    checkArrival,
    startWatch,
    stopWatch,
    setNavMethods,
  }
}
