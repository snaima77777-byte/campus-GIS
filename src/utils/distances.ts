export function calculateDistance(
  coord1: number[],

  coord2: number[],
) {
  const lon1: number = coord1[0]!;

  const lat1: number = coord1[1]!;

  const lon2: number = coord2[0]!;

  const lat2: number = coord2[1]!;

  // 地球半径（米）

  const R = 6371000;

  // 转弧度

  const radLat1 = (lat1 * Math.PI) / 180;

  const radLat2 = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;

  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine公式

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),

      Math.sqrt(1 - a),
    );

  return Math.round(R * c);
}
