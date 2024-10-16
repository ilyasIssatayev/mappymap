import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';

import type { MapNodes, MapWay, MapFile } from '../types/map';
function DataCollector() {
    const LocalStorageKey = "mapFileInput"
    const mapeStore: any = useMapStore();

    const [textAreaValue, setTextAreaValue] = useState('');
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        //restore previous input values just in case
        const storedInputValues = localStorage.getItem(LocalStorageKey);
        if (storedInputValues) {
            const parsed = JSON.parse(storedInputValues);
            setInputValue(parsed.name);
            setTextAreaValue(parsed.query);
        }

    }, [])

    const handleSubmit = () => {
        // Handle form submit logic here, for example:
        console.log('Textarea:', textAreaValue);
        console.log('Input:', inputValue);

        const mapFile: MapFile = {
            name: inputValue,
            query: textAreaValue,
            file: inputValue,
            preloaded: () => false
        }

        localStorage.setItem(LocalStorageKey, JSON.stringify(mapFile));

        mapeStore.setActiveMapFile(mapFile);
        mapeStore.callOnUpdate();
    };

    useEffect(()=>{
        const mapFile: MapFile = {
            name: inputValue,
            query: textAreaValue,
            file: inputValue,
            preloaded: () => false
        }

        localStorage.setItem(LocalStorageKey, JSON.stringify(mapFile));
        console.log("on updated")
    },[textAreaValue,inputValue])



    return (
        <div className="flex flex-row space-x-4 min-h-screen bg-white p-6">
            <div className="flex flex-col mr-auto">
                <h2 className="text-2xl font-semibold mb-4 text-start">Ilyas maps</h2>


                <label htmlFor="input" className="block text-gray-700 mb-2">
                    map title:
                </label>
                <input
                    id="input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-100 mb-4"
                />

                <label htmlFor="textarea" className="block text-gray-700 mb-2">
                    query:
                </label>
                <textarea
                    id="textarea"
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    className="w-full p-3 min-h-64 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-100 mb-4"
                    rows={5}
                />



                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 transition"
                >
                    Render Map
                </button>
            </div>
            <div className="flex flex-col mr-auto">

            </div>
        </div>
    );
}

export default DataCollector