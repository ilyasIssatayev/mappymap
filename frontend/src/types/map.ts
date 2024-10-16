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


export type { MapNodes, MapWay,MapFile };