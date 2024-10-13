import { create } from 'zustand'
import type { MapNodes, MapWay } from '../types/map';

const area = "Enschede";

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
  getMapData: async (
    callback: (nodes: MapNodes, ways: MapWay[]) => void
  ) => {
    console.log('request start')
    const encodedQuery: string = encodeURIComponent(get().query);
    const cacheMeta = {
      file: 'map_' + area
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