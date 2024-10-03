import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';

function Sun() {
    const rays = useMemo(() => {
        const rayCount = 12; // Number of rays
        const raysArray = [];
        const rayLength = 4; // Length of the rays
        const rayWidth = 0.2; // Width of the rays

        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2; // Calculate angle for each ray
            const x = Math.cos(angle) * 2.5; // Position based on sun radius
            const z = Math.sin(angle) * 2.5;

            raysArray.push(
                <mesh key={i} position={[x, 0, z]}>
                    <cylinderGeometry args={[rayWidth, rayWidth, rayLength, 16]} />
                    <meshStandardMaterial color="#FFEB3B" />
                </mesh>
            );
        }

        return raysArray;
    }, []);

    return (
        <group>
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial color="#FFEB3B" />
            </mesh>
            {rays}
        </group>
    );
}

function App() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Sun />
        </Canvas>
    );
}

export default App;
