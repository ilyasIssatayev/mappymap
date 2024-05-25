type MapNodes = {
    [key: string]: [number, number];
};

type MapWay = {
    id: number,
    nodes: number[],
    tags: any,
    type: "way",
}

export type { MapNodes, MapWay };