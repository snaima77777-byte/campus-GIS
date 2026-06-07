import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Icon from 'ol/style/Icon'
import gcoord from 'gcoord'
import { buildings } from '@/mock/buildings'
import { roadNodes } from '@/mock/roads'
import { roadEdges } from '@/mock/roadEdges'
import { dijkstra } from '@/utils/dijkstra'
import { pathToCoordinates } from '@/utils/pathToCoordinates'
import { useNavigationStore } from '@/stores/navigation'
import { useVoiceNavigation } from './useVoiceNavigation'

import startIcon from '@/assets/start.png'
import endIcon from '@/assets/end.png'

export function useNavigation() {
  const store = useNavigationStore()
  const { speak } = useVoiceNavigation()

  let startLayer: any = null
  let endLayer: any = null
  let routeLayer: any = null

  function getMapInstance() {
    return (window as any).__campusMap
  }

  function findNearestRoadNode(buildingCoordinate: number[]) {
    let nearestNode = roadNodes[0]!
    let minDistance = Infinity
    roadNodes.forEach((node) => {
      const dx = (node.coordinate?.[0] ?? 0) - (buildingCoordinate?.[0] ?? 0)
      const dy = (node.coordinate?.[1] ?? 0) - (buildingCoordinate?.[1] ?? 0)
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < minDistance) {
        minDistance = distance
        nearestNode = node
      }
    })
    return nearestNode.id
  }

  function getDistance(p1: [number, number], p2: [number, number]) {
    const dx = p1[0] - p2[0]
    const dy = p1[1] - p2[1]
    return Math.sqrt(dx * dx + dy * dy)
  }

  function getTurnDirection(
    p1: [number, number],
    p2: [number, number],
    p3: [number, number],
  ): string {
    const x1 = p2[0] - p1[0]
    const y1 = p2[1] - p1[1]
    const x2 = p3[0] - p2[0]
    const y2 = p3[1] - p2[1]
    const cross = x1 * y2 - y1 * x2
    if (cross > 0) return '左转'
    if (cross < 0) return '右转'
    return '直行'
  }

  function generateInstructions(route: [number, number][]) {
    const instructions: { index: number; text: string; played: boolean }[] = []
    if (route.length < 3) return instructions
    for (let i = 1; i < route.length - 1; i++) {
      const p1 = route[i - 1]
      const p2 = route[i]
      const p3 = route[i + 1]
      if (!p1 || !p2 || !p3) continue
      const direction = getTurnDirection(p1, p2, p3)
      if (direction === '左转') {
        instructions.push({ index: i, text: '前方左转', played: false })
      }
      if (direction === '右转') {
        instructions.push({ index: i, text: '前方右转', played: false })
      }
    }
    return instructions
  }

  function clearRouteLayers() {
    const map = getMapInstance()
    if (!map) return
    if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null }
    if (startLayer) { map.removeLayer(startLayer); startLayer = null }
    if (endLayer) { map.removeLayer(endLayer); endLayer = null }
  }

  function startNavigation(
    startNodeId?: number,
    endNodeId?: number,
    useGpsStart = false,
    gpsCoord?: [number, number],
  ) {
    const map = getMapInstance()
    if (!map) return

    store.currentTargetNodeId = endNodeId ?? null
    store.isNavigating = true
    store.hasArrivalVoice = false

    let realStartNodeId: number
    if (useGpsStart && gpsCoord) {
      realStartNodeId = findNearestRoadNode(gpsCoord)
    } else if (startNodeId !== undefined) {
      realStartNodeId = startNodeId
    } else {
      return
    }

    const targetId = endNodeId ?? store.currentTargetNodeId
    if (targetId === null) return

    const result = dijkstra(roadNodes, roadEdges, realStartNodeId, targetId)
    store.routeDistance = result.distance

    const coordinates = pathToCoordinates(result.path) as [number, number][]
    store.currentRouteCoordinates = coordinates
    store.navigationInstructions = generateInstructions(coordinates)
    store.currentGuideIndex = 0

    speak('导航开始')

    if (coordinates.length === 0) return

    clearRouteLayers()

    const startCoord = coordinates[0]!
    const endCoord = coordinates[coordinates.length - 1]!

    const startFeature = new Feature({
      geometry: new Point(
        fromLonLat(
          gcoord.transform(startCoord, gcoord.BD09, gcoord.GCJ02) as [number, number],
        ),
      ),
    })
    startFeature.setStyle(
      new Style({
        image: new Icon({ src: startIcon, scale: 0.15, anchor: [0.5, 1] }),
      }),
    )

    const endFeature = new Feature({
      geometry: new Point(
        fromLonLat(
          gcoord.transform(endCoord, gcoord.BD09, gcoord.GCJ02) as [number, number],
        ),
      ),
    })
    endFeature.setStyle(
      new Style({
        image: new Icon({ src: endIcon, scale: 0.15, anchor: [0.5, 1] }),
      }),
    )

    const routeFeature = new Feature({
      geometry: new LineString(
        coordinates.map((coord) => {
          const gcj02 = gcoord.transform(coord, gcoord.BD09, gcoord.GCJ02) as [number, number]
          return fromLonLat(gcj02)
        }),
      ),
    })

    startLayer = new VectorLayer({
      source: new VectorSource({ features: [startFeature] }),
    })
    endLayer = new VectorLayer({
      source: new VectorSource({ features: [endFeature] }),
    })
    routeLayer = new VectorLayer({
      source: new VectorSource({ features: [routeFeature] }),
      style: new Style({
        stroke: new Stroke({ color: '#e20e3c', width: 6 }),
      }),
    })

    map.addLayer(routeLayer)
    map.addLayer(startLayer)
    map.addLayer(endLayer)
  }

  function startNavigationManual(startName: string, endNodeId: number) {
    const building = buildings.find((b) => b.name === startName)
    if (!building) return
    const startNodeId = findNearestRoadNode(building.coordinate as number[])
    startNavigation(startNodeId, endNodeId)
  }

  return {
    findNearestRoadNode,
    getDistance,
    getTurnDirection,
    generateInstructions,
    clearRouteLayers,
    startNavigation,
    startNavigationManual,
    get startLayerRef() { return startLayer },
    get endLayerRef() { return endLayer },
    get routeLayerRef() { return routeLayer },
  }
}
