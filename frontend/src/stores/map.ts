import Map from '@/map/map';
import { create } from 'zustand'
import type { MapNodes, MapWay, MapFile } from '../types/map';
import * as Crypto from 'crypto-js';

const area = "Enschede";

let activeMapFile: MapFile;
const onUpdate: Array<() => void> = [];

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

  attachOnUpdate: (callback: () => void) => {
    if (!get().onUpdate) set({ onUpdate: [] })
    get().onUpdate.push(callback);
  },

  callOnUpdate: () => {
    get().onUpdate.forEach(
      (callback: () => void) => callback()
    );
  },

  reqeustMapLoad: async (mapFile: MapFile) => {
    get().setActiveMapFile(mapFile);
    get().callOnUpdate();
  },

  getMapData: async (
    callback: (nodes: MapNodes, ways: MapWay[]) => void
  ) => {
    console.log('request start')
    const encodedQuery: string = encodeURIComponent(get().activeMapFile.query);

    //generate a hash out of query
    const hash = Crypto.SHA256(encodedQuery).toString(Crypto.enc.Hex);

    const cacheMeta = {
      file: get().activeMapFile.file,
      hash
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
    console.log('>', jsonData);

    var nodes: MapNodes = {};
    var ways: MapWay[] = [];

    //todo check if jsonData can be empty
    if (jsonData != {}) {
      jsonData.elements.forEach((element: any) => {
        if (element.type === 'node') {
          nodes[element.id] = [element.lat, element.lon];
        } else if (element.type === 'way') {
          ways.push(element);
        }
      });
    }


    if (callback) callback(nodes, ways);
    return { nodes, ways }
  }
}))



export default useMapStore;