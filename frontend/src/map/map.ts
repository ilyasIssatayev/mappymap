import * as THREE from 'three';


export default class Map {

    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;

    constructor(width: number, height: number) {
        this.scene = new THREE.Scene();

        //3 axes xyz
        // const axesHelper = new THREE.AxesHelper(500);
        // this.scene.add(axesHelper);

        const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0);
    }

    render(): void {
        console.log(this.scene.children.length);
        this.renderer.render(this.scene, this.camera);
    }

    add(mesh: THREE.Mesh): void {
        this.scene.add(mesh);
    }

    clear(): void {
        this.scene.clear();
    }

    resize(width: number, height: number): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render()
    }

}
