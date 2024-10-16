import * as THREE from 'three';
import {colors} from './style';

const getShape = (points:[number,number][]): THREE.Mesh => {
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
    const randomMat = new THREE.MeshBasicMaterial({ color: colors.primary });
    const mesh = new THREE.Mesh(geometry, randomMat);

    return mesh;
}

export { getShape };