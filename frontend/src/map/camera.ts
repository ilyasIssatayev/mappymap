

import * as THREE from 'three';
import Map from '@/map/map'

const speed = 2;

const handleKeyDown = (event: any, map: Map) => {
    switch (event.key) {
        case 'w':
            map.camera.position.y += speed;
            break;
        case 's':
            map.camera.position.y -= speed;
            break;
        case 'a':
            map.camera.position.x -= speed;
            break;
        case 'd':
            map.camera.position.x += speed;
            break;
        default:
            break;
    }
    map.render();
};

export { handleKeyDown };