// Sun.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Sun({ imageUrl }) {
    // Load the sun texture image using the provided imageUrl prop
        const texture = useLoader(TextureLoader, imageUrl);

    return (
        <mesh>
            <sphereGeometry args={[3.5, 33, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}

export default Sun;
