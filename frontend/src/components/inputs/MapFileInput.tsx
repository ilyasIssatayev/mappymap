import { useState, useEffect, useRef } from 'react';
import useMapStore from '../../stores/map';

import type { MapNodes, MapWay, MapFile } from '../../types/map';
function MapFileInput() {
    const LocalStorageKey = "mapFileInput"
    const mapeStore: any = useMapStore();

    const [textAreaValue, setTextAreaValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedInputValues = localStorage.getItem(LocalStorageKey);
        if (storedInputValues) {
            const parsed = JSON.parse(storedInputValues);
            setInputValue(parsed.name);
            setTextAreaValue(parsed.query);
        }

    }, [])

    const handleSubmit = () => {
        const mapFile: MapFile = {
            name: inputValue,
            query: textAreaValue,
            file: inputValue,
            preloaded: () => false
        }
        localStorage.setItem(LocalStorageKey, JSON.stringify(mapFile));
        mapeStore.reqeustMapLoad(mapFile);
    };

    useEffect(() => {
        const mapFile: MapFile = {
            name: inputValue,
            query: textAreaValue,
            file: inputValue,
            preloaded: () => false
        }
        localStorage.setItem(LocalStorageKey, JSON.stringify(mapFile));
    }, [textAreaValue, inputValue])



    return (
        <div className="flex flex-col ">
            <label htmlFor="input" className="title mb-2">
                map title:
            </label>
            <input
                id="input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-100 mb-4"
            />

            <label htmlFor="textarea" className="title mb-2">
                query:
            </label>
            <textarea
                id="textarea"
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-100 mb-4"
                rows={16}
            />
            <button
                onClick={handleSubmit}
                className="w-full bg-dark text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-500 transition"
            >
                Render Map
            </button>
        </div>
    );
}

export default MapFileInput