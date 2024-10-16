import Map from '@/map/map';
import { create } from 'zustand'
import type { MapNodes, MapWay,MapFile } from '../types/map';

const area = "Enschede";

let activeMapFile: MapFile;
const onUpdate:Array<()=>void> = [];

const useMapStore = create((set, get: any) => ({
  query: `[out:json];
  area[name="${area}"]->.searchArea;
  (
    way["building"](area.searchArea);
  );
  out body;
  >;
  out skel qt;` as string,

  setQuery: (newQuery: string) => set({ query: newQuery }),

  setActiveMapFile: (newMapFile: MapFile) => set({ activeMapFile: newMapFile }),

  attachOnUpdate: (callback:()=>void)=> {
    if(!get().onUpdate) set({onUpdate:[]})
    get().onUpdate.push(callback);
  },

  callOnUpdate: ()=>{
    get().onUpdate.forEach(
      (callback:()=>void)=>callback()
    );
  },

  getMapData: async (
    callback: (nodes: MapNodes, ways: MapWay[]) => void
  ) => {
    console.log('request start')
    const encodedQuery: string = encodeURIComponent(get().activeMapFile.query);
    const cacheMeta = {
      file: 'map_' + get().activeMapFile.file+".json"
    };
    const data = { query: encodedQuery, cacheMeta };

    const response = await fetch('api/overpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();

    var nodes: MapNodes = {};
    var ways: MapWay[] = [];

    jsonData.elements.forEach((element: any) => {
      if (element.type === 'node') {
        nodes[element.id] = [element.lat, element.lon];
      } else if (element.type === 'way') {
        ways.push(element);
      }
    });

    if (callback) callback(nodes, ways);
    return { nodes, ways }
  }
}))

export default useMapStore;