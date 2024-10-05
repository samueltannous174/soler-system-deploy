import React, {useEffect, useState} from "react";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import planetData from "./planetData";
import "./styles.css";
import { gsap } from "gsap";
import {useNavigate} from "react-router-dom";
import { Text } from '@react-three/drei';
import PlanetCard from "./PlanetCard";
import Sun from "./Sun";
import {TextureLoader} from "three";

export default function App() {
    const [isMoving, setIsMoving] = useState(true);
    const [showPlanetInfoIndex, setShowPlanetInfoIndex] = useState(-1);
    const planetsImages=["mer.jpg","ven0aaa2.jpg","ear0xuu2.jpg","mar0kuu2.jpg","jup0vss1.jpg","sat0fds1.jpg","uran.png","nep0fds1.jpg"]
    const [number, setNumber] = useState(0);


    console.log(number)
    const pause=()=>{
        setIsMoving(false);
        if (!isMoving){
            setIsMoving(true);
        }
    }
    return (
        <div className="backgroundBack">
        <>
            <button onClick={pause} >
                {isMoving ?"Pause" : "Continue" }
            </button>

            <h3 style={{ color: "lightblue" }}>
                Tip 1: Click on Earth to show asteroids
            </h3>
            <h3 style={{ color: "lightblue" }}>
                Tip 2: click on planet to show details
            </h3>


            { showPlanetInfoIndex!== -1 && <PlanetCard planetIndex={showPlanetInfoIndex} setShowPlanetInfoIndex={setShowPlanetInfoIndex} />}

            <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Sun imageUrl={"sun2.png"} />
                {planetData.map((planet) => (
                    <Planet planet={planet} key={planet.id} isMoving={isMoving} setIsMoving={setIsMoving} setShowPlanetInfo={setShowPlanetInfoIndex} planetsImages={planetsImages} number={number}  setNumber={setNumber}  />
                ))}
                <Lights />
                <OrbitControls />
            </Canvas>
        </>
        </div>

    );
}

export function Planet({ planet: { id,color, xRadius, zRadius, size, name, velocity}, isMoving, setIsMoving, setShowPlanetInfo, planetsImages,number,setNumber}) {
    const planetRef = React.useRef();
    const { camera } = useThree();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);


    const velocityModified = velocity/10;
    if ( name === 'Uranus' || name === 'Neptune'){
        size=size/40000
    }
    else if (name === 'Saturn' || name === 'Jupiter' ){
        size=size/70000
    }
    else {
        size=size/50000
    }

    const handleClick = () => {
        if (name==='Earth'){
            setIsMoving(false);
            const planetPosition = planetRef.current.position.clone();
            const moveDirection = planetPosition.x < camera.position.x ? 'left' : 'right'
            gsap.to(camera.position, {
                x: moveDirection === 'left' ? planetPosition.x - 10 : planetPosition.x + 10,
                y: planetPosition.y + 5,
                z: planetPosition.z + 5,
                duration: 1.5,
                onUpdate: () => {
                    camera.lookAt(planetPosition);
                },
                onComplete: () => {
                    navigate(`/earth`);
                }
            })
        }
        else{
            setShowPlanetInfo(id)
        }

    };

    useFrame(({ clock }) => {
        if (isMoving) {
            const t = clock.getElapsedTime() * velocityModified;
            const x = xRadius * Math.sin(t);
            const z = zRadius * Math.cos(t);
            planetRef.current.position.x = x;
            planetRef.current.position.z = z;
            if (name === "Earth"){
                setCounter(prevCounter => prevCounter + 1)
                if (counter%500===0){
                    setNumber(prevCounter => prevCounter + 1)
                }
            }
            }

    });
    console.log(planetsImages[id])
    const texture = useLoader(TextureLoader, planetsImages[id]);

    return (
        <>
            <mesh ref={planetRef} onClick={handleClick}>
                    <Text
                        position={[0, size + 2, 0]}
                        fontSize={1}
                        color="white"
                        anchorX="center"
                        anchorY="middle">
                        {name}
                    </Text>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial map={texture} />
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
