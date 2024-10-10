import * as THREE from 'three';

import Camera from './camera';

export default class Map {

    camera: Camera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;

    constructor(width: number, height: number) {
        this.scene = new THREE.Scene();

        //3 axes xyz
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new Camera(perspectiveCamera);
        this.camera.setPosition(0,0,5);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // cube.position.x =0
        // cube.position.y = 0;

        // this.scene.add(cube);

        console.log('Map constructed')
        //this.render();
    }

    render(): void {
        console.log(this.scene.children);
        this.renderer.render(this.scene, this.camera.persepectiveCamera);
    }

    add(mesh: THREE.Mesh): void {
        console.log('ADD ',this.scene)
        this.scene.add(mesh);
    }

}
