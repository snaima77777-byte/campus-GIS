interface RoadNode {
  id: number;
  name: string;
  coordinate: number[];
}

interface RoadEdge {
  start: number;
  end: number;
  distance: number;
}

export function dijkstra(
  nodes: RoadNode[],
  edges: RoadEdge[],
  startId: number,
  endId: number,
) {
  const distances = new Map<number, number>();

  const previous = new Map<number, number | null>();

  const visited = new Set<number>();

  // 初始化

  nodes.forEach((node) => {
    distances.set(node.id, Infinity);

    previous.set(node.id, null);
  });

  distances.set(startId, 0);

  while (true) {
    let current = -1;

    let minDistance = Infinity;

    // 找当前最近节点

    nodes.forEach((node) => {
      const distance = distances.get(node.id);

      if (
        distance !== undefined &&
        !visited.has(node.id) &&
        distance < minDistance
      ) {
        minDistance = distance;

        current = node.id;
      }
    });

    // 没有可访问节点

    if (current === -1) {
      break;
    }

    // 到达终点

    if (current === endId) {
      break;
    }

    visited.add(current);

    // 获取邻居

    const neighbors = edges.filter(
      (edge) => edge.start === current || edge.end === current,
    );

    neighbors.forEach((edge) => {
      const neighbor = edge.start === current ? edge.end : edge.start;

      const currentDistance = distances.get(current);

      if (currentDistance === undefined) {
        return;
      }

      const newDistance = currentDistance + edge.distance;

      const oldDistance = distances.get(neighbor);

      if (oldDistance !== undefined && newDistance < oldDistance) {
        distances.set(neighbor, newDistance);

        previous.set(neighbor, current);
      }
    });
  }

  // 回溯路径

  const path: number[] = [];

  let current: number | null = endId;

  while (current !== null) {
    path.unshift(current);

    current = previous.get(current) ?? null;
  }

  return {
    path,

    distance: distances.get(endId) ?? Infinity,
  };
}
