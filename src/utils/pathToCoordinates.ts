import { roadNodes } from "../mock/roads";

export function pathToCoordinates(path: number[]): [number, number][] {
  return path.map((id) => {
    const node = roadNodes.find((item) => item.id === id);

    return node!.coordinate as [number, number];
  });
}
