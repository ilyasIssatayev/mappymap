import { create } from 'zustand'
import * as Crypto from 'crypto-js';
import { toast } from 'react-hot-toast';

import type { MapNodes, MapWay, MapFile } from '../types/map';
import { State } from '../types/map';

import Map from '@/map/map';


const toastDuration = 6000;

const useMapStore = create((set, get: any) => ({
  onUpdate: [] as Array<() => void>,
  onDownloaded: [] as Array<(nodes: MapNodes, ways: MapWay[]) => void>,

  activeMapFile: {} as MapFile,
  state: State.IDLE as State,

  setState: (state: State, descripion = '' as string) => {
    switch (state) {
      case State.IDLE:
        break;
      case State.DOWNLOADING:
        toast('Downloading map data...', { duration: toastDuration });
        break;
      case State.DOWNLOADED:
        toast.success("Map is downloaded", { duration: toastDuration })
        break;
      case State.GENERATING:
        toast("Generating map", { duration: toastDuration })
        break;
      case State.GENERATED:
        toast.success("Map is ready to use!", { duration: toastDuration })
        break;
      case State.FAILED:
        toast.error("Fuck, " + descripion == '' ? 'something got broken' : descripion, { duration: 4000 })
        break;
    }

    set({ state })
  },

  reqeustMapLoad: async (mapFile: MapFile) => {
    if (get().state != State.IDLE) {
      toast.error("Wait for the previous map to load first")
      return;
    }
    get().setActiveMapFile(mapFile);
    get().callOnUpdate();

    const { nodes, ways } = await get().getMapData();
    get().callOnDownloaded(nodes, ways);
  },


  getMapData: async () => {
    if (get().state != State.IDLE) {
      toast.error("Wait for the previous map to load first")
      return;
    }
    get().setState(State.DOWNLOADING);

    const mapFile: MapFile = get().activeMapFile;


    let hash;
    let encodedQuery: string = '';

    if (mapFile.type === 'MapRequest') {
      encodedQuery = encodeURIComponent(get().activeMapFile.query);
      //generate a hash out of query
      hash = Crypto.SHA256(encodedQuery).toString(Crypto.enc.Hex);
    }
    else hash = mapFile.hash;



    const cacheMeta = {
      name: mapFile.name,
      hash,
      preload: mapFile.type === 'PreloadedMap',
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
    else toast("Oh No... Empty MAP :(")


    get().setState(State.DOWNLOADED);
    return { nodes, ways }
  },

  setActiveMapFile: (newMapFile: MapFile) => set({ activeMapFile: newMapFile }),

  attachOnUpdate: (callback: () => void) => {
    if (!get().onUpdate) set({ onUpdate: [] })
    get().onUpdate.push(callback);
  },

  attachOnDownloaded: (callback: () => void) => {
    if (!get().onDownloaded) set({ onDownloaded: [] })
    get().onDownloaded.push(callback);
  },

  callOnUpdate: () => {
    get().onUpdate.forEach(
      (callback: () => void) => callback()
    );
  },

  callOnDownloaded: (nodes: MapNodes, ways: MapWay[]) => {
    get().onDownloaded.forEach(
      (callback: (nodes: MapNodes, ways: MapWay[]) => void) => callback(nodes, ways)
    );
  },
}))



export default useMapStore;