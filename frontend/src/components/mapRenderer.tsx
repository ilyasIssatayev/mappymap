import * as THREE from 'three';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import useMapStore from '../stores/mapDataStore';
import Map from '@/map/map';
import { handleKeyDown } from '@/map/camera';
import { getShape } from '@/map/shape';
import type { MapNodes, MapWay } from '../types/map';
import { State } from '../types/map';

function MapRenderer() {


    const mapeStore: any = useMapStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let map = new Map(window.innerWidth, window.innerHeight);
        setMap(map);
        map.render();

        if (containerRef.current) containerRef.current.innerHTML = '';
        containerRef.current?.appendChild(map.renderer.domElement);

        mapeStore.attachOnUpdate(() => {
            setIsLoading(true)
        })

        mapeStore.attachOnDownloaded((nodes: MapNodes, ways: MapWay[])=>{
            proccessPoints(nodes, ways, map)
        })

        const handleResize = () => {
            console.log('resize');
            map.resize(window.innerWidth, window.innerHeight);
        };

        const handleKeyDownEvent = (event: KeyboardEvent) => {
            handleKeyDown(event, map);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('keydown', handleKeyDownEvent);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDownEvent);
        };
    }, []);

    const proccessPoints = (nodes: MapNodes, ways: MapWay[], map: Map) => {
        mapeStore.setState(State.GENERATING)
        map.clear();
        console.log('nodes', nodes);
        console.log('ways', ways)
        if (nodes == {} || ways.length == 0) {
            console.log("Did not find anything :((");
            map.render();
            mapeStore.setState(State.FAILED)
            return;
        }

        const multiplier = 100;
        const firstPoint = ways[0].nodes.map(node => nodes[node])[0];
        ways.forEach(way => {
            let points = way.nodes.map(node => nodes[node]);
            points = points.map((point) => [
                (point[0] - firstPoint[0]) * multiplier,
                (point[1] - firstPoint[1]) * multiplier])

            const mesh = getShape(points);
            map.add(mesh);
        })

        map.render();
        mapeStore.setState(State.GENERATED)
        setIsLoading(false)
        mapeStore.setState(State.IDLE);
    }

   

    return (
        <div className='relative w-screen h-screen'>
            <div className={isLoading ? 'blur-md' : ''} ref={containerRef} />
            {isLoading ? <div className='absolute flex top-0 left-0 z-10 w-full h-full bg-transparent '>
                <span className='m-auto text-4xl font-black text-primary-500'>Loading ...</span>
            </div> : ''}
        </div>);
}

export default MapRenderer