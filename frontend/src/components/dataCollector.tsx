import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';
import MapFileInput from './inputs/MapFileInput';
import FileListInput from './inputs/FileListInput';

import type { MapNodes, MapWay, MapFile } from '../types/map';
function DataCollector() {
    return (
        <div className="flex flex-row space-x-4 min-h-screen bg-white p-6 justify-start">
            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 text-start">Ilyas maps</h2>
                <MapFileInput/>
            </div>
            <div className="flex flex-col">
                <FileListInput/>
            </div>
        </div>
    );
}

export default DataCollector