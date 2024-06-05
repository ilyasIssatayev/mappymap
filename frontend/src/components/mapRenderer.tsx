import * as THREE from 'three';

import { useState, useEffect,useRef } from 'react';
import useMapStore from '../stores/map';
import type { MapNodes, MapWay } from '../types/map';
function MapRenderer() {
    const mapeStore:any = useMapStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const scene = new THREE.Scene();
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.z = 0.6;
        camera.position.y= 0;
        camera.position.x= 1.5;
        const geometry = new THREE.BoxGeometry();

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x00fff0 });
        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(0.0001,0.0001,0.0001);
        scene.add(cube);

        mapeStore.getMapData( (nodes: MapNodes, ways: MapWay[])=>{
          console.log('ways',ways)
          ways.forEach( way =>{
            const points = way.nodes.map( node => nodes[node]);


            const shape = new THREE.Shape();
            points.forEach((point, index) => {
                if (index === 0) {
                    shape.moveTo(point[0], point[1]);
                } else {
                    shape.lineTo(point[0], point[1]);
                }
            });
            shape.lineTo(points[0][0], points[0][1]); // Close the shape

            // Create geometry from the shape
            const geometry = new THREE.ShapeGeometry(shape)



            console.log(way.tags);
            points.forEach(point => {
                const randomMat = new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 16777215) });
                const pointCube = new THREE.Mesh(geometry, randomMat);
                pointCube.position.x = point[0]-52;
                pointCube.position.y = point[1]-6.9;

                pointCube.position.x *= 7;
                pointCube.position.y *= 7;

                // pointCube.position.x *=4;
                // pointCube.position.y *=4;

                pointCube.scale.set(0.0001,0.0001,0.0001);
       
            })
          })

            renderer.render(scene, camera);
        });


// Initialize variables
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

const onKeyDown = (event:any) => {
    switch (event.keyCode) {
        case 87: // W
            moveForward = true;
            break;
        case 83: // S
            moveBackward = true;
            break;
        case 65: // A
            moveLeft = true;
            break;
        case 68: // D
            moveRight = true;
            break;
    }
    updateCamera();
}

const onKeyUp = (event:any)=> {
    switch (event.keyCode) {
        case 87: // W
            moveForward = false;
            break;
        case 83: // S
            moveBackward = false;
            break;
        case 65: // A
            moveLeft = false;
            break;
        case 68: // D
            moveRight = false;
            break;
    }
    updateCamera();
}

const updateCamera = ()=>{

    // Move the camera based on keyboard input
    if (moveForward) camera.position.y -= 1;
    if (moveBackward) camera.position.y += 1;
    if (moveLeft) camera.position.x -= 0.5;
    if (moveRight) camera.position.x += 0.5;
    console.log('cam ',camera.position.x, camera.position.y)
    renderer.render(scene, camera);
}

// Set up keyboard event listeners
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);


      
      // Render the scene and camera
        renderer.render(scene, camera);
      }
    }, []);
    return <div ref={containerRef} />;
}

export default MapRenderer