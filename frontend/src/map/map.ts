import * as THREE from 'three';

import Camera from './camera';

export default class Map {

    camera: Camera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;

    constructor(width: number, height: number) {
        this.scene = new THREE.Scene();

        //3 axes xyz
        const axesHelper = new THREE.AxesHelper(500);
        this.scene.add(axesHelper);

        const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new Camera(perspectiveCamera);
        this.camera.setPosition(0,0,1);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
    }

    render(): void {
        console.log(this.scene.children);
        this.renderer.render(this.scene, this.camera.persepectiveCamera);
    }

    add(mesh: THREE.Mesh): void {
        this.scene.add(mesh);
    }

    resize(width: number, height: number):void{
        this.camera.persepectiveCamera.aspect = window.innerWidth / window.innerHeight;
        this.camera.persepectiveCamera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render()
    }

}
