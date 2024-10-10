import * as THREE from 'three';

import { useState, useEffect, useRef } from 'react';
import useMapStore from '../stores/map';
import Map from '@/map/map';
import Camera from '@/map/camera';
import { getShape } from '@/map/shape';

import type { MapNodes, MapWay } from '../types/map';
function MapRenderer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('effect')
        if (typeof window !== 'undefined') {
            console.log('map')
            console.log('MapRenderer')
            // const mapeStore: any = useMapStore();

            let map = new Map(window.innerWidth, window.innerHeight);
            const points: [number, number][] = [
                [0, 0],
                [3, 0],
                [2, 1],
                [3, 3],
                [0, 3],
            ]
            const mesh = getShape(points);
            map.add(mesh);
            const points2: [number, number][] = [
                [-4, 0],
                [-1, 0],
                [-3, 1],
                [-1, 3],
                [0, 3],
            ]
            const mesh2 = getShape(points2);
            map.add(mesh2);
            map.render();

            containerRef.current?.appendChild(map.renderer.domElement);

            window.addEventListener('resize', () => {
                console.log('resize')
                map.resize(window.innerWidth, window.innerHeight)
            });
        }
    }, []);
    return <div ref={containerRef} />;
}

export default MapRenderer