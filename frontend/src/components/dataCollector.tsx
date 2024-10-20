import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';
import MapFileInput from './inputs/MapFileInput';
import FileListInput from './inputs/FileListInput';

import type { MapNodes, MapWay, MapFile } from '../types/map';
function DataCollector() {
    return (
        <div className="flex flex-col min-h-screen bg-white p-6 justify-start">
            <div className="flex flex-col">
                <h1 className="mb-4 text-start">ART MAP</h1>
            </div>
            <div className="flex space-x-6 ">
                <MapFileInput />
                <FileListInput />
            </div>
        </div>
    );
}

export default DataCollector