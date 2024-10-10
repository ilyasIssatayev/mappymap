import * as THREE from 'three';

import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';
import Map from '@/map/map';
import {handleKeyDown} from '@/map/camera';
import { getShape } from '@/map/shape';

import type { MapNodes, MapWay } from '../types/map';
function MapRenderer() {
    const mapeStore: any = useMapStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let map = new Map(window.innerWidth, window.innerHeight);
        setMap(map);
        map.render();

        containerRef.current?.appendChild(map.renderer.domElement);

        mapeStore.getMapData((nodes: MapNodes, ways: MapWay[]) => proccessPoints(nodes, ways, map));

        window.addEventListener('resize', () => {
            console.log('resize')
            map.resize(window.innerWidth, window.innerHeight)
        });

        window.addEventListener('keydown', (event)=>{
            handleKeyDown(event,map)
        });

    }, []);

    const proccessPoints = (nodes: MapNodes, ways: MapWay[], map: Map) => {
        console.log('ways', ways)
        console.log('map', map);

        const multiplier = 100;
        const firstPoint = ways[0].nodes.map(node => nodes[node])[0];
        ways.forEach(way => {
            let points = way.nodes.map(node => nodes[node]);
            points = points.map((point) => [
                (point[0] - firstPoint[0]) * multiplier,
                (point[1] - firstPoint[1]) * multiplier])
            console.log(points)
            const mesh = getShape(points);
            map.add(mesh);
        })

        map.render();
    }

    return <div ref={containerRef} />;
}

export default MapRenderer