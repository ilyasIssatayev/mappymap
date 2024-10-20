import './../style/main.css'
import { useState, useEffect } from 'react';
import type { MapNodes, MapWay } from '../types/map';
import { Toaster } from "react-hot-toast";
import DataCollector from '@/components/dataCollector';
import MapRenderer from '@/components/MapRenderer';

function LandingPage() {

    return (
        <div className="w-screen h-screen flex flex-col">
            <Toaster containerStyle={{
                position: 'fixed',
                top:20,
                left:'auto',
                bottom: 'auto',
                right: 80,
                maxWidth: 300,
                minWidth: 200,
            }} />
            <DataCollector></DataCollector>
            <MapRenderer></MapRenderer>
        </div>
    );
}

export default LandingPage