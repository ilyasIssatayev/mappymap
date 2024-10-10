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
            const mesh = getShape();
            map.add(mesh);
            map.render();


            containerRef.current?.appendChild(map.renderer.domElement);


            // let mouseX = 0;
            // let mouseY = 0;

            // let targetRotationX = 0;
            // let targetRotationY = 0;

            // document.addEventListener('mousemove', (event) => {
            //     // Normalize mouse position to [-1, 1]
            //     mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            //     mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            //     // Update target rotation based on mouse position
            //     targetRotationY = mouseX * Math.PI * 0.5; // Horizontal rotation (left/right)
            //     targetRotationX = mouseY * Math.PI * 0.5; // Vertical rotation (up/down)
            // });

            // const animate = () => {
            //     requestAnimationFrame(animate);
            //     console.log('aa')

            //     // Smoothly rotate the camera towards the target rotation
            //     map.camera.persepectiveCamera.rotation.y += (targetRotationY - map.camera.persepectiveCamera.rotation.y) * 0.05;
            //     map.camera.persepectiveCamera.rotation.x += (targetRotationX - map.camera.persepectiveCamera.rotation.x) * 0.05;

            //     // Render the scene
            //     map.render()
            // }

            // animate();

            window.addEventListener('resize', () => {
                console.log('resize')
                map.resize(window.innerWidth, window.innerHeight)
            });
        }
    }, []);
    return <div ref={containerRef} />;
}

export default MapRenderer