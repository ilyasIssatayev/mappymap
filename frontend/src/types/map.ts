type MapNodes = {
    [key: string]: [number, number];
};

type MapWay = {
    id: number,
    nodes: number[],
    tags: any,
    type: "way",
}

type MapFile = {
    name:string,
    query: string, 
    file:string,
    preloaded: ()=> boolean,
}

enum State {
    IDLE,
    DOWNLOADING,
    DOWNLOADED,
    GENERATING,
    GENERATED,
    FAILED,
  }
  


export type { MapNodes, MapWay,MapFile };
export { State}