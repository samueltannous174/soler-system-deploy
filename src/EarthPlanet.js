import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {OrbitControls, Text} from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import data from './Updated_NEO_Astr.json';
import dataPHA from './Update_PHA.json';

import Asteroid from "./Astroid";


export default function EarthPlanet() {
    const [saveData,setSaveData]=useState([])
    const [saveDataPHA,setSaveDataPHA]=useState([])

    const [showList,setShowList]=useState(false)
    const [currentType,setCurrentType]=useState("Near")


    useEffect(() => {
        setSaveData(JSON.stringify(data, null, 2))
        setSaveDataPHA(JSON.stringify(dataPHA, null, 2))

    }, []);
    const earth = {
        id: 1,
        name:"Earth",
        color: "blue",
        imageUrl: "ear0xuu2.jpg",
        xRadius: 0,
        zRadius: 0,
        size: 1,
    };

    const moon = {
        id: 1,
        name:"Moon",
        color: "gray",
        imageUrl: "moon.jpg",
        xRadius: (1 + 1.5) * 8,
        zRadius: (1 + 1.5) * 4,
        size: 0.55,
    };

    const navigate = useNavigate();
    const asteroidData = currentType === "Near" ? data : dataPHA;


    return (

        <div className="backgroundBack">
            <>
                <button onClick={() => navigate(`/`)}>
                    Back
                </button>
                <button onClick={() => setShowList(true)}>
                    Show List
                </button>
                <button className="typeButton"  onClick={() => setCurrentType("Near")}>
                    Near
                </button>
                <button  className="typeButton2" onClick={() => setCurrentType("Hazard")}>
                    Potential Hazard
                </button>
                <h3 className="typeText" style={{ color: currentType === "Near" ? "orange" : " #3cb4e7" }}>
                    Type Is {currentType}
                </h3>

                {showList && (
                    <div className="planet-container">
                        <ul>
                            {(() => {
                                const selectedData = currentType === "Near" ? data : dataPHA;
                                return selectedData.map((asteroid, index) => (
                                    <li key={index}>{asteroid   .fullName}</li>
                                ));
                            })()}
                        </ul>
                    </div>
                )}


                <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
                    <Planet planet={earth} key={earth.id} isMoving={false} />
                    <Planet planet={moon} isMoving={true} />
                    {asteroidData.map((asteroid, index) => (
                        <Asteroid key={ index} index={index} data={asteroid} currentType={currentType} />
                    ))}

                <Lights />
                    <OrbitControls />
                </Canvas>
            </>
        </div>
    );
}

function Planet({ planet: { name,xRadius, zRadius, size, imageUrl }, isMoving }) {
    const planetRef = React.useRef();
    const texture = useLoader(TextureLoader, imageUrl);

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
            <mesh ref={planetRef}>
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
