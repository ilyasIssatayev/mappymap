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
                display: 'flex',
                top:20,
                left:'auto',
                bottom: 'auto',
                right: 20,
                width: 280,
            }} toastOptions ={{
                className: 'w-full'
            }} />
            <DataCollector></DataCollector>
            <MapRenderer></MapRenderer>
        </div>
    );
}

export default LandingPage