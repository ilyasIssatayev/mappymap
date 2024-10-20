import Map from '@/map/map';
import { create } from 'zustand'
import type { MapNodes, MapWay, MapFile } from '../types/map';
import * as Crypto from 'crypto-js';
import { toast } from 'react-hot-toast';

const onUpdate: Array<() => void> = [];

const useMapStore = create((set, get: any) => ({
  activeMapFile: {} as MapFile,

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
    toast('Loading map from the OSM');
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

    toast.success("Map is loaded!", { duration: 4000 })

    if (callback) callback(nodes, ways);
    return { nodes, ways }
  }
}))



export default useMapStore;