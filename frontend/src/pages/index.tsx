import { useState, useEffect } from 'react';
import type { MapNodes, MapWay } from '../types/map';

import MapRenderer from '@/components/mapRenderer';

function LandingPage() {

    return (
        <div className="w-screen h-screen flex">
            <MapRenderer></MapRenderer>
        </div>
    );
}

export default LandingPage