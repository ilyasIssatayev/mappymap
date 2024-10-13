import './../style/main.css'
import { useState, useEffect } from 'react';
import type { MapNodes, MapWay } from '../types/map';

import DataCollector from '@/components/dataCollector';
import MapRenderer from '@/components/MapRenderer';

function LandingPage() {

    return (
        <div className="w-screen h-screen flex flex-col">
            <DataCollector></DataCollector>
            <MapRenderer></MapRenderer>
        </div>
    );
}

export default LandingPage