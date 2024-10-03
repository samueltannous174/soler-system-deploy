import React, {useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./styles.css";
import { gsap } from "gsap";
import {random} from "gsap/gsap-core";

export default function EarthPlanet() {
    const planet={
        id: 1,
        color: "blue",
        xRadius: (1 + 1.5) * 4,
        zRadius: (1 + 1.5) * 2,
        size: random(0.5, 1)
    }
    const [isMoving, setIsMoving] = useState(true);

    return (
        <div className="backgroundBack">
            <>

                <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                    <Sun />
                    <Planet planet={planet} key={planet.id} isMoving={isMoving} setIsMoving={setIsMoving} />
                    <Lights />
                    <OrbitControls />
                </Canvas>
            </>
        </div>

    );
}
function Sun() {
    return (
        <mesh>
            <sphereGeometry args={[2.5, 33, 32]} />
            <meshStandardMaterial color="#FFEB3B"  className="shadow"  />
        </mesh>
    )
}
function Planet({ planet: { color, xRadius, zRadius, size }, isMoving, setIsMoving }) {
    const planetRef = React.useRef();
    const { camera } = useThree();

    const handleClick = () => {
        setIsMoving(false); // Stop the movement of all planets

        // Get the position of the planet
        const planetPosition = planetRef.current.position.clone();

        gsap.to(camera.position, {
            x: planetPosition.x+10,
            y: planetPosition.y+5,
            z: planetPosition.z+5,
            duration: 1.5,
            onUpdate: () => {
                camera.lookAt(planetPosition);
            },
            onComplete: () => {
                window.location.href = `/planet`;
            },
        });
    };


    useFrame(({ clock }) => {
        if (isMoving) {
            const t = clock.getElapsedTime();
            const x = xRadius * Math.sin(t);
            const z = zRadius * Math.cos(t);
            planetRef.current.position.x = x;
            planetRef.current.position.z = z;
        }
    });

    return (
        <>
            <mesh ref={planetRef} onClick={handleClick}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Ecliptic xRadius={xRadius} zRadius={zRadius} />
        </>
    );
}


function Lights() {
    return (
        <>
            <ambientLight />
            <pointLight position={[0, 0, 0]} />
        </>
    );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
    const points = [];
    for (let index = 0; index < 64; index++) {
        const angle = (index / 64) * 2 * Math.PI;
        const x = xRadius * Math.cos(angle);
        const z = zRadius * Math.sin(angle);
        points.push(new THREE.Vector3(x, 0, z));
    }

    points.push(points[0]);

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
        </line>
    );
}
