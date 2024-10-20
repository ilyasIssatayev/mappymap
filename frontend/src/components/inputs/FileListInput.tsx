import { useState, useEffect, useRef } from 'react';
import useMapStore from '../../stores/mapDataStore';

import type { MapNodes, MapWay, MapFile } from '../../types/map';
function FileListInput() {
    const [mapFiles, setMapFiles] = useState([]);

    useEffect(() => {
        readFiles();
    }, []);


    const readFiles = async () => {
        const response = await fetch('api/mapFiles');
        const jsonData = await response.json()
        console.log(jsonData)
        setMapFiles(jsonData);
    }



    return (
        <div className="flex flex-col max-w-sm">
            <label htmlFor="input" className="title mb-2">
                file list:
            </label>
            <div className='flex flex-col mr-auto '>
                <div className='grid grid-cols-3 py-3 w-full border-dark border-b hover:bg-transparent'>
                    <span className='font-bold'>name</span>
                    <span className='font-bold'>hash</span>
                </div>
                {mapFiles.map((mapFile: any) => (
                    <div className='file_list__cell w-full group' key={mapFile.name + mapFile.hash} >
                        <div className='flex'>
                            <span className='my-auto' >{mapFile.name}</span>
                        </div>
                        <div className='flex col-span-2 group-hover:col-span-1'>
                            <span className='my-auto truncate'>{mapFile.hash}</span>
                        </div>
                        <div className='hidden space-x-4 justify-end group-hover:col-span-1 group-hover:flex transition-all'>
                            <span className=' underline px-1 border-b-0 cursor-pointer underline-offset-4'>load</span>
                            <i className='delete-icon my-auto' ></i>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default FileListInput