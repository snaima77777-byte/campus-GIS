import { roadNodes } from "./roads";

import { calculateDistance } from "../utils/distances";

// 创建边函数

function createEdge(start: number, end: number) {
  // 找起点节点

  const startNode = roadNodes.find((item) => item.id === start);

  // 找终点节点

  const endNode = roadNodes.find((item) => item.id === end);

  // 防止节点不存在

  if (!startNode || !endNode) {
    throw new Error(`节点不存在: ${start} -> ${end}`);
  }

  // 返回边

  return {
    start,

    end,

    distance: calculateDistance(
      startNode.coordinate,

      endNode.coordinate,
    ),
  };
}

// 路网边

export const roadEdges = [
  // 东门区域

  createEdge(1, 25),

  createEdge(3, 4),

  createEdge(4, 24),

  createEdge(24, 27),

  createEdge(24, 23),

  createEdge(23, 22),
  createEdge(22, 21),

  createEdge(22, 15),

  createEdge(15, 16),
  createEdge(16, 20),

  createEdge(19, 20),

  createEdge(19, 18),

  createEdge(18, 17),
  createEdge(17, 16),

  createEdge(18, 12),

  createEdge(11, 10),

  createEdge(10, 9),

  createEdge(9, 8),

  createEdge(11, 12),

  createEdge(12, 14),

  createEdge(14, 13),

  createEdge(2, 25),

  createEdge(25, 26),

  createEdge(23, 68),
  createEdge(68, 28),

  createEdge(28, 29),

  createEdge(29, 31),

  createEdge(31, 32),

  createEdge(31, 30),

  createEdge(30, 33),

  createEdge(33, 34),

  createEdge(34, 35),

  // 行知楼区域

  createEdge(35, 36),

  createEdge(36, 37),

  createEdge(37, 38),
  createEdge(38, 35),

  createEdge(37, 39),

  createEdge(35, 40),

  createEdge(40, 41),

  createEdge(41, 42),

  createEdge(42, 43),

  createEdge(43, 44),
  createEdge(44, 33),

  createEdge(43, 48),

  createEdge(47, 48),

  createEdge(48, 49),

  // 北部教学区

  createEdge(49, 50),

  createEdge(50, 62),

  createEdge(61, 62),

  createEdge(61, 58),

  createEdge(57, 56),

  createEdge(56, 55),

  createEdge(56, 52),

  createEdge(52, 53),

  createEdge(53, 54),
  createEdge(54, 55),

  createEdge(57, 58),

  createEdge(58, 59),

  createEdge(59, 60),

  createEdge(61, 63),

  createEdge(63, 64),

  createEdge(63, 65),

  createEdge(65, 66),

  createEdge(47, 46),

  createEdge(46, 67),
  createEdge(67, 65),

  createEdge(50, 51),

  createEdge(41, 45),

  createEdge(27, 5),
  createEdge(5, 6),
  createEdge(6, 51),
  createEdge(2, 3),
  createEdge(4, 15),
  createEdge(7, 8),
  createEdge(2, 7),
  createEdge(11, 13),
  createEdge(3, 14),
  createEdge(6, 28),
  createEdge(29, 49),
  createEdge(42, 46),
  createEdge(61, 67),
  createEdge(33, 69),
];
