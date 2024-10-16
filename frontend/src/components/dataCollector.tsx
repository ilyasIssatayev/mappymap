import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';
import MapFileInput from './inputs/MapFileInput';

import type { MapNodes, MapWay, MapFile } from '../types/map';
function DataCollector() {
    return (
        <div className="flex flex-row space-x-4 min-h-screen bg-white p-6">
            <div className="flex flex-col mr-auto">
                <h2 className="text-2xl font-semibold mb-4 text-start">Ilyas maps</h2>
                <MapFileInput/>
            </div>
            <div className="flex flex-col mr-auto">
            </div>
        </div>
    );
}

export default DataCollector