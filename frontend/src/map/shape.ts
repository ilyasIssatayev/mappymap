import * as THREE from 'three';

const getShape = (): THREE.Mesh => {
    const points = [
        [0, 0],
        [3, 0],
        [3, 3],
        [0, 3],
    ]

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
    const randomMat = new THREE.MeshBasicMaterial({ color: Math.floor(Math.random() * 16777215) });
    const mesh = new THREE.Mesh(geometry, randomMat);

    return mesh;
}

export { getShape };