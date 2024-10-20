type MapNodes = {
    [key: string]: [number, number];
};

type MapWay = {
    id: number,
    nodes: number[],
    tags: any,
    type: "way",
}

type MapFile = ({ type: 'MapRequest' } & MapRequest) | ({ type: 'PreloadedMap' } & PreloadedMap);

type MapRequest = {
    name: string,
    query: string,
}
type PreloadedMap = {
    name: string,
    hash: string,
}

enum State {
    IDLE,
    DOWNLOADING,
    DOWNLOADED,
    GENERATING,
    GENERATED,
    FAILED,
}



export type { MapNodes, MapWay, MapFile };
export { State }