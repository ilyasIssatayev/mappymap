import { useState, useEffect } from 'react';
import useMapStore from '../stores/map';

function LandingPage() {

    const mapeStore:any = useMapStore();
    const mapData:any = mapeStore.getMapData( (res:any)=>{
        console.log('response',res)
    });
    return (
        <div>mappymap</div>
    );
}

export default LandingPage