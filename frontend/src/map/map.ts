import * as THREE from 'three';


export default class Map {

    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;

    constructor(width: number, height: number) {
        this.scene = new THREE.Scene();

        //3 axes xyz
        // const axesHelper = new THREE.AxesHelper(500);
        // this.scene.add(axesHelper);


        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10;
        
        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,   // left
            frustumSize * aspect / 2,    // right
            frustumSize / 2,             // top
            -frustumSize / 2,            // bottom
            0.1,                         // near
            1000                         // far
        );
        this.camera.position.z = 10;
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
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render()
    }

}
