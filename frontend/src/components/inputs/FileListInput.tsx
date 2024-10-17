import { useState, useEffect, useRef } from 'react';
import useMapStore from '../../stores/map';

import type { MapNodes, MapWay, MapFile } from '../../types/map';
function FileListInput() {

    useEffect(() => {
        readFiles();
    }, []);


    const readFiles = async () => {
        const response = await fetch('api/mapFiles');
        const jsonData = await response.json()
        console.log(jsonData)
    }



    return (
        <div className="flex flex-col ">
            <label htmlFor="input" className="block font-bold text-gray-700 mb-2">
                File list:
            </label>
            <div className='flex flex-col space-y-4'>

            </div>
        </div>
    );
}

export default FileListInput