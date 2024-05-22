import { create } from 'zustand'

const useMapStore = create((set, get: any) => ({
    query: `[out:json];
  area[name="Enschede"]->.searchArea;
  (
    //node["building"](area.searchArea);
    way["building"](area.searchArea);
    //relation["building"](area.searchArea);
  );
  out body;
  >;
  out skel qt;` as string,
    setQuery: (newQuery: string) => set({ query: newQuery }),
    getMapData: async (callback: any) => {
        console.log('request start')
        const encodedQuery: string = encodeURIComponent(get().query);
        const data = { query: encodedQuery };

        const response = await fetch('api/overpass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const jsonData = await response.json();
        console.log(jsonData);
        callback(jsonData);
    }
}))

export default useMapStore;