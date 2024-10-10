

import * as THREE from 'three';

export default class Camera {
    persepectiveCamera: THREE.PerspectiveCamera;

    constructor(persepectiveCamera: THREE.PerspectiveCamera) {
        this.persepectiveCamera = persepectiveCamera;
        this.setPosition(0,0,0);
    }

    setPosition(x: number, y: number, z: number): void {
        this.persepectiveCamera.position.x = x;
        this.persepectiveCamera.position.y = y;
        this.persepectiveCamera.position.z = z;
    }
}