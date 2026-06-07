import { ref, shallowRef } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import gcoord from 'gcoord'
import { buildings } from '@/mock/buildings'

export function useMap() {
  const map = shallowRef<any>(null)
  const buildingLayer = shallowRef<any>(null)

  const campusCenter = gcoord.transform(
    [126.695063, 45.791513] as [number, number],
    gcoord.BD09,
    gcoord.GCJ02,
  ) as [number, number]

  function createBuildingFeatures() {
    return buildings.map((item) => {
      const gcj02 = gcoord.transform(
        item.coordinate as [number, number],
        gcoord.BD09,
        gcoord.GCJ02,
      ) as [number, number]

      const feature = new Feature({
        geometry: new Point(fromLonLat(gcj02)),
        name: item.name,
        type: item.type,
      })

      // Invisible markers — still clickable but not visible on map
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({ color: 'rgba(0,0,0,0)' }),
            stroke: new Stroke({ color: 'rgba(0,0,0,0)', width: 0 }),
          }),
        }),
      )

      return feature
    })
  }

  function initMap(target: string, options?: { interactive?: boolean; zoom?: number }) {
    const isInteractive = options?.interactive ?? true
    const zoom = options?.zoom ?? 17

    if (map.value) {
      map.value.setTarget(target)
      return map.value
    }

    const features = createBuildingFeatures()

    buildingLayer.value = new VectorLayer({
      source: new VectorSource({ features }),
    })

    const instance = new Map({
      target,
      layers: [
        new TileLayer({
          source: new XYZ({
            url:
              'https://webrd01.is.autonavi.com/appmaptile?' +
              'lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          }),
        }),
        buildingLayer.value,
      ],
      view: new View({
        center: fromLonLat(campusCenter),
        zoom,
      }),
      interactions: isInteractive ? undefined : [],
    })

    // Click building -> show name (features are invisible but still clickable)
    instance.on('click', function (evt: any) {
      instance.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
        const name = feature.get('name')
        if (name) {
          alert('建筑名称：' + name)
        }
      })
    })

    map.value = instance
    return instance
  }

  function addLayer(layer: any) {
    if (map.value) {
      map.value.addLayer(layer)
    }
  }

  function removeLayer(layer: any) {
    if (map.value && layer) {
      map.value.removeLayer(layer)
    }
  }

  function getMap() {
    return map.value
  }

  return { map, buildingLayer, campusCenter, initMap, addLayer, removeLayer, getMap }
}
