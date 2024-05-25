import { useState, useEffect } from 'react';
import useMapStore from '../stores/map';
import type { MapNodes, MapWay } from '../types/map';
function LandingPage() {
    const mapeStore:any = useMapStore();
    mapeStore.getMapData( (nodes: MapNodes, ways: MapWay[])=>{
        console.log('response',ways[0])
        const way = ways[0];
        const points = way.nodes.map( node => nodes[node]);
        console.log('points',points)
    });


    
    return (
        <div>mappymap</div>
    );
}

export default LandingPage