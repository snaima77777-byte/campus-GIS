<template>
  <div class="page">
    <div id="map"></div>

    <div class="overlay">
      <div class="hero">
        <div class="hero-tag">FRESHMAN GUIDE</div>

        <h1>黑龙江工程学院</h1>

        <p>欢迎你 {{ studentInfo.name }}</p>

        <span>
          {{ studentInfo.college }}
        </span>
      </div>

      <div class="control-card">
        <div class="form-group">
          <label>定位方式</label>

          <select v-model="locationMode">
            <option value="manual">手动选择</option>

            <option value="gps">自动定位</option>
          </select>
        </div>

        <div v-if="locationMode === 'manual'" class="form-group">
          <label>当前位置</label>

          <select v-model="startBuilding">
            <option
              v-for="item in buildings"
              :key="item.name"
              :value="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="action-grid">
          <button @click="goRegistration">入学登记</button>

          <button @click="showDormitoryModal = true">宿舍入住</button>

          <button @click="showDiningModal = true">校园就餐</button>

          <button @click="showFreeNavigationModal = true">自由导航</button>
        </div>
        <div v-if="showDormitoryModal" class="modal-mask">
          <div class="modal-card">
            <h3>选择宿舍</h3>

            <select v-model="dormitoryId">
              <option
                v-for="item in dormitories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>

            <div class="modal-buttons">
              <button @click="confirmDormitory">开始导航</button>

              <button class="cancel-btn" @click="showDormitoryModal = false">
                取消
              </button>
            </div>
          </div>
        </div>
        <div v-if="showDiningModal" class="modal-mask">
          <div class="modal-card">
            <h3>选择食堂</h3>

            <select v-model="diningId">
              <option
                v-for="item in diningOptions"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>

            <div class="modal-buttons">
              <button @click="confirmDining">开始导航</button>

              <button class="cancel-btn" @click="showDiningModal = false">
                取消
              </button>
            </div>
          </div>
        </div>
        <div v-if="showFreeNavigationModal" class="modal-mask">
          <div class="modal-card">
            <h3>自由导航</h3>

            <label>起点</label>

            <select v-model="freeStartBuilding">
              <option
                v-for="item in buildings"
                :key="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>

            <label style="margin-top: 10px"> 终点 </label>

            <select v-model="freeEndBuilding">
              <option
                v-for="item in buildings"
                :key="item.name"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>

            <div class="modal-buttons">
              <button @click="confirmFreeNavigation">开始导航</button>

              <button
                class="cancel-btn"
                @click="showFreeNavigationModal = false"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div>
          <span>距离</span>

          <strong>
            {{ routeDistance }}
            m
          </strong>
        </div>

        <div>
          <span>步行时间</span>

          <strong>
            {{ walkTime }}
            min
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "ol/style/Icon";

import startIcon from "../assets/start.png";
import endIcon from "../assets/end.png";
import gpsIcon from "../assets/student.png";
import { onMounted, ref, computed } from "vue";

import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";

import { fromLonLat } from "ol/proj";

import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";

import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import gcoord from "gcoord";
import { buildings } from "../mock/buildings";
import { roadNodes } from "../mock/roads";
import { roadEdges } from "../mock/roadEdges";

import { dijkstra } from "../utils/dijkstra";
import { pathToCoordinates } from "../utils/pathToCoordinates";
import { startLocationWatch } from "../utils/location";
const currentGuideIndex = ref(0);
const navigationInstructions = ref<
  {
    index: number;
    text: string;
    played: boolean;
  }[]
>([]);
const userLon = ref(0);

const userLat = ref(0);
const freeStartBuilding = ref(buildings[0]!.name);

const freeEndBuilding = ref(buildings[1]!.name);
const showFreeNavigationModal = ref(false);
const startBuilding = ref("东门");
const locationMode = ref("manual");
const currentGpsCoordinate = ref<[number, number] | null>(null);
const dormitoryId = ref(20);
const dormitories = [
  { name: "一公寓", id: 20 },
  { name: "二公寓", id: 17 },
  { name: "三公寓", id: 13 },
  { name: "四公寓", id: 8 },
  { name: "五公寓", id: 26 },
  { name: "六公寓", id: 27 },
  { name: "七公寓", id: 64 },
  { name: "八公寓", id: 62 },
];
const diningId = ref(45);
const diningOptions = [
  {
    name: "第一食堂",
    id: 45,
  },
  {
    name: "第二食堂",
    id: 57,
  },
  {
    name: "第三食堂",
    id: 23,
  },
];
const showDormitoryModal = ref(false);

const showDiningModal = ref(false);
const endId = ref(66);
const routeDistance = ref(0);
const studentInfo = JSON.parse(localStorage.getItem("studentInfo") || "{}");
const walkTime = computed(() => {
  return Math.round(routeDistance.value / 80);
});

let map: any;
let userLayer: any = null;

let routeLayer: any = null;

let startLayer: any = null;

let endLayer: any = null;
// 当前导航终点
const currentTargetNodeId = ref<number | null>(null);

// 当前路径坐标
const currentRouteCoordinates = ref<[number, number][]>([]);

// 上次重规划时间
let lastReplanTime = 0;

// 是否正在导航
const isNavigating = ref(false);
const hasArrivalVoice = ref(false);
function speak(text: string) {
  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "zh-CN";

  speech.rate = 1;

  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
function findNearestRoadNode(buildingCoordinate: number[]) {
  let nearestNode = roadNodes[0]!;

  let minDistance = Infinity;

  roadNodes.forEach((node) => {
    const dx = (node.coordinate?.[0] ?? 0) - (buildingCoordinate?.[0] ?? 0);

    const dy = (node.coordinate?.[1] ?? 0) - (buildingCoordinate?.[1] ?? 0);

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;

      nearestNode = node;
    }
  });

  return nearestNode.id;
}

function updateUserLocation(lon: number, lat: number) {
  userLon.value = lon;
  userLat.value = lat;
  currentGpsCoordinate.value = [lon, lat];
  if (userLayer) {
    map.removeLayer(userLayer);
  }
  const gcj02 = gcoord.transform([lon, lat], gcoord.WGS84, gcoord.GCJ02) as [
    number,
    number,
  ];
  const feature = new Feature({
    geometry: new Point(fromLonLat(gcj02)),
  });
  feature.setStyle(
    new Style({
      image: new Icon({
        src: gpsIcon,

        scale: 0.15,

        anchor: [0.5, 0.5],
      }),
    }),
  );

  userLayer = new VectorLayer({
    source: new VectorSource({
      features: [feature],
    }),
  });

  map.addLayer(userLayer);
}
function startNavigation(startNodeId?: number, endNodeId?: number) {
  if (!map) return;
  currentTargetNodeId.value = endNodeId ?? endId.value;

  isNavigating.value = true;

  let realStartNodeId;
  if (locationMode.value === "manual") {
    const building = buildings.find(
      (item) => item.name === startBuilding.value,
    );

    if (!building) return;

    realStartNodeId = findNearestRoadNode(building.coordinate as number[]);
  } else {
    const gpsBD09 = getGpsBD09();

    if (!gpsBD09) {
      alert("GPS定位未完成");
      return;
    }

    realStartNodeId = findNearestRoadNode(gpsBD09);
  }

  const result = dijkstra(
    roadNodes,
    roadEdges,
    startNodeId ?? realStartNodeId,
    endNodeId ?? endId.value,
  );
  routeDistance.value = result.distance;

  const coordinates = pathToCoordinates(result.path);
  currentRouteCoordinates.value = coordinates;
  navigationInstructions.value = generateInstructions(
    coordinates as [number, number][],
  );

  console.log(navigationInstructions.value);
  currentGuideIndex.value = 0;
  speak("导航开始");
  if (coordinates.length === 0) {
    return;
  }

  const startCoord = coordinates[0] as [number, number];

  const endCoord = coordinates[coordinates.length - 1] as [number, number];
  const startFeature = new Feature({
    geometry: new Point(
      fromLonLat(
        gcoord.transform(startCoord as any, gcoord.BD09, gcoord.GCJ02) as [
          number,
          number,
        ],
      ),
    ),
  });
  startFeature.setStyle(
    new Style({
      image: new Icon({
        src: startIcon,

        scale: 0.15,

        anchor: [0.5, 1],
      }),
    }),
  );
  const endFeature = new Feature({
    geometry: new Point(
      fromLonLat(
        gcoord.transform(endCoord, gcoord.BD09, gcoord.GCJ02) as [
          number,
          number,
        ],
      ),
    ),
  });
  endFeature.setStyle(
    new Style({
      image: new Icon({
        src: endIcon,

        scale: 0.15,

        anchor: [0.5, 1],
      }),
    }),
  );

  const routeFeature = new Feature({
    geometry: new LineString(
      coordinates.map((coord: any) => {
        const gcj02 = gcoord.transform(
          coord as any,
          gcoord.BD09,
          gcoord.GCJ02,
        ) as any;

        return fromLonLat(gcj02);
      }),
    ),
  });

  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  if (startLayer) {
    map.removeLayer(startLayer);
  }

  if (endLayer) {
    map.removeLayer(endLayer);
  }
  startLayer = new VectorLayer({
    source: new VectorSource({
      features: [startFeature],
    }),
  });
  endLayer = new VectorLayer({
    source: new VectorSource({
      features: [endFeature],
    }),
  });

  routeLayer = new VectorLayer({
    source: new VectorSource({
      features: [routeFeature],
    }),

    style: new Style({
      stroke: new Stroke({
        color: "#ff0000",
        width: 6,
      }),
    }),
  });

  map.addLayer(routeLayer);

  map.addLayer(startLayer);

  map.addLayer(endLayer);
}
function getDistance(p1: [number, number], p2: [number, number]) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];

  return Math.sqrt(dx * dx + dy * dy);
}
function getTurnDirection(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
) {
  const x1 = p2[0] - p1[0];
  const y1 = p2[1] - p1[1];

  const x2 = p3[0] - p2[0];
  const y2 = p3[1] - p2[1];

  const cross = x1 * y2 - y1 * x2;

  if (cross > 0) {
    return "左转";
  }

  if (cross < 0) {
    return "右转";
  }

  return "直行";
}
function generateInstructions(route: [number, number][]) {
  const instructions: {
    index: number;
    text: string;
    played: boolean;
  }[] = [];

  if (route.length < 3) {
    return instructions;
  }

  for (let i = 1; i < route.length - 1; i++) {
    const p1 = route[i - 1];
    const p2 = route[i];
    const p3 = route[i + 1];

    if (!p1 || !p2 || !p3) {
      continue;
    }

    const direction = getTurnDirection(p1, p2, p3);

    if (direction === "左转") {
      instructions.push({
        index: i,
        text: "前方左转",
        played: false,
      });
    }

    if (direction === "右转") {
      instructions.push({
        index: i,
        text: "前方右转",
        played: false,
      });
    }
  }

  return instructions;
}
function isOffRoute(gps: [number, number]) {
  if (currentRouteCoordinates.value.length === 0) {
    return false;
  }

  let minDistance = Infinity;

  currentRouteCoordinates.value.forEach((point) => {
    const d = getDistance(gps, point);

    if (d < minDistance) {
      minDistance = d;
    }
  });

  return minDistance > 0.00015;
}
function autoReplan() {
  if (!isNavigating.value) return;

  if (!currentGpsCoordinate.value) return;

  if (!currentTargetNodeId.value) return;

  const now = Date.now();

  if (now - lastReplanTime < 5000) {
    return;
  }
  const gpsBD09 = getGpsBD09();

  if (!gpsBD09) return;

  if (isOffRoute(gpsBD09)) {
    lastReplanTime = now;

    speak("您已偏离路线，正在重新规划");

    console.log("偏航");

    startNavigation(undefined, currentTargetNodeId.value);
  }
}

onMounted(() => {
  // 创建建筑点

  const features = buildings.map((item) => {
    // 百度坐标 → GCJ02

    const gcj02 = gcoord.transform(
      item.coordinate as [number, number],
      gcoord.BD09,
      gcoord.GCJ02,
    ) as [number, number];

    return new Feature({
      // OpenLayers 必须使用 fromLonLat

      geometry: new Point(fromLonLat(gcj02)),

      name: item.name,

      type: item.type,
    });
  });

  // 黑工程中心点（百度坐标）

  const campusCenter = gcoord.transform(
    [126.695063, 45.791513] as [number, number],
    gcoord.BD09,
    gcoord.GCJ02,
  ) as [number, number];

  // 创建地图

  map = new Map({
    target: "map",

    layers: [
      // 高德地图底图

      new TileLayer({
        source: new XYZ({
          url:
            "https://webrd01.is.autonavi.com/appmaptile?" +
            "lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        }),
      }),
    ],

    view: new View({
      // 中心点必须投影转换

      center: fromLonLat(campusCenter),

      zoom: 17,
    }),
  });

  // 点击建筑显示名称

  map.on("click", function (evt: any) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
      alert("建筑名称：" + feature.get("name"));
    });
  });
  startLocationWatch((lon, lat) => {
    updateUserLocation(lon, lat);
    autoReplan();
    checkGuideVoice();
    checkNavigationVoice();
    checkArrival();
  });
});
function checkGuideVoice() {
  if (!currentGpsCoordinate.value) return;

  const gpsBD09 = getGpsBD09();

  if (!gpsBD09) return;

  const route = currentRouteCoordinates.value;

  if (route.length < 3) return;

  const index = currentGuideIndex.value;

  if (index >= route.length - 2) return;

  const targetPoint = route[index + 1];
  if (!targetPoint) {
    return;
  }
  const distance = getDistance(gpsBD09, targetPoint);

  if (distance < 0.00005) {
    speak("请继续直行");

    currentGuideIndex.value++;
  }
}
function goRegistration() {
  startNavigation(undefined, 30);
}
function confirmDormitory() {
  showDormitoryModal.value = false;

  startNavigation(undefined, dormitoryId.value);
}

function confirmDining() {
  showDiningModal.value = false;

  startNavigation(undefined, diningId.value);
}
function confirmFreeNavigation() {
  if (!freeStartBuilding.value || !freeEndBuilding.value) {
    return;
  }

  const startBuildingObj = buildings.find(
    (item) => item.name === freeStartBuilding.value,
  );

  const endBuildingObj = buildings.find(
    (item) => item.name === freeEndBuilding.value,
  );

  if (!startBuildingObj || !endBuildingObj) {
    return;
  }

  const startNodeId = findNearestRoadNode(
    startBuildingObj.coordinate as number[],
  );

  const endNodeId = findNearestRoadNode(endBuildingObj.coordinate as number[]);

  showFreeNavigationModal.value = false;

  if (locationMode.value === "gps") {
    startNavigation(undefined, endNodeId);
  } else {
    startNavigation(startNodeId, endNodeId);
  }
}
function checkNavigationVoice() {
  if (!currentGpsCoordinate.value) {
    return;
  }

  const gpsBD09 = getGpsBD09();

  if (!gpsBD09) {
    return;
  }

  navigationInstructions.value.forEach((item) => {
    if (item.played) {
      return;
    }

    const point = currentRouteCoordinates.value[item.index];

    if (!point) {
      return;
    }

    const distance = getDistance(gpsBD09, point);

    if (distance < 0.00012) {
      speak(item.text);

      item.played = true;
    }
  });
}
function checkArrival() {
  if (!currentGpsCoordinate.value) {
    return;
  }

  if (!currentTargetNodeId.value) {
    return;
  }
  const targetNode = roadNodes.find(
    (item) => item.id === currentTargetNodeId.value,
  );

  if (!targetNode) return;
  const gpsBD09 = getGpsBD09();

  if (!gpsBD09) return;
  const distance = getDistance(
    currentGpsCoordinate.value as [number, number],
    targetNode.coordinate as [number, number],
  );
  if (distance < 0.0002 && !hasArrivalVoice.value) {
    speak("即将到达目的地");

    hasArrivalVoice.value = true;
  }
  if (distance < 0.00005) {
    speak("您已到达目的地");

    alert("到达目的地");

    isNavigating.value = false;
  }
}
function getGpsBD09() {
  if (!currentGpsCoordinate.value) {
    return null;
  }

  return gcoord.transform(
    currentGpsCoordinate.value,
    gcoord.WGS84,
    gcoord.BD09,
  ) as [number, number];
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;

  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;

  background: #181818;
}

.page {
  width: 100%;
  height: 100vh;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.hero {
  position: absolute;

  top: 30px;
  left: 24px;

  color: white;

  pointer-events: auto;
}

.hero-tag {
  color: #da291c;

  font-size: 12px;

  letter-spacing: 3px;

  margin-bottom: 8px;
}

.hero h1 {
  margin: 0;

  font-size: 34px;

  font-weight: 500;
}

.hero p {
  margin-top: 10px;

  font-size: 18px;
}

.hero span {
  color: #999;
}

.control-card {
  position: absolute;

  left: 20px;
  right: 20px;
  bottom: 100px;

  background: rgba(24, 24, 24, 0.95);

  border: 1px solid #303030;

  padding: 20px;

  pointer-events: auto;
}

.control-card label {
  display: block;

  color: white;

  margin-bottom: 10px;

  font-size: 13px;

  letter-spacing: 2px;
}

.control-card select {
  width: 100%;

  height: 48px;

  background: #303030;

  color: white;

  border: none;

  padding-left: 12px;

  margin-bottom: 15px;
}

.action-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 10px;
}

.action-grid button {
  height: 52px;

  border: none;

  background: #da291c;

  color: white;

  font-weight: 700;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.info-card {
  position: absolute;

  left: 20px;
  right: 20px;
  bottom: 20px;

  height: 60px;

  background: rgba(48, 48, 48, 0.95);

  color: white;

  display: flex;

  justify-content: space-around;

  align-items: center;

  pointer-events: auto;
}

.info-card span {
  display: block;

  font-size: 12px;

  color: #999;
}

.info-card strong {
  font-size: 22px;

  font-weight: 500;
}
.modal-mask {
  position: fixed;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.55);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 9999;
}

.modal-card {
  width: 80%;

  background: #222;

  padding: 20px;

  border-radius: 12px;
}

.modal-card h3 {
  color: white;

  margin-top: 0;
}

.modal-card select {
  width: 100%;

  height: 45px;

  background: #333;

  color: white;

  border: none;

  margin-top: 10px;
}

.modal-buttons {
  display: flex;

  gap: 10px;

  margin-top: 20px;
}

.modal-buttons button {
  flex: 1;

  height: 45px;

  border: none;

  border-radius: 8px;

  background: #da291c;

  color: white;
}

.cancel-btn {
  background: #555 !important;
}
</style>
