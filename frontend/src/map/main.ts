import * as THREE from 'three';

import Map from './map';

const CreateMap = (width: number, height: number) => {
    let map  = new Map(width,height);
    return map;
}

export { CreateMap }