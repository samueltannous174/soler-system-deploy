import React from 'react';
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

function Asteroid({index,data,currentType}) {
    console.log(data)
    const planetRef = React.useRef();
    useFrame(({clock}) => {
        const t = clock.getElapsedTime();
        let position = calculatePosition(data, t);
        planetRef.current.position.x = position.X;
        planetRef.current.position.z = position.Z;
    })


    return (
        <>
            <mesh ref={planetRef}>
                <sphereGeometry args={[data.diameter / 100, 32, 32]}/>
                {index<3 && currentType ==="Near" ?   <meshStandardMaterial  color="gold" /> : <meshStandardMaterial /> }
            </mesh>

            {/*<Ecliptic xRadius={12} zRadius={6}/>*/}
        </>
    );
}
    function Ecliptic({xRadius = 4, zRadius = 4}) {
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
                <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10}/>
            </line>
        );
    }
function calculatePosition(data, time) {
    // Extract orbital parameters
    let {  a,  e,  i, ma, w,  om, epoch } = data;
    a=a*15
    let mu=398600

    // Convert degrees to radians
    i = degToRad(i);
    ma = degToRad(ma);
    w = degToRad(w);
    om = degToRad(om);

    // Mean Motion (n)
    let n = Math.sqrt(mu / Math.pow(a, 3));

    // Mean Anomaly (M) at current time
    let M = om + n * (time - epoch);

    // Solve Kepler's Equation for Eccentric Anomaly (E)
    let E = solveEccentricAnomaly(M, e);

    // True Anomaly (nu)
    let trueAnomaly = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));

    // Distance from Earth (r)
    let r = a * (1 - e * Math.cos(E));

    // Position in the orbital plane (x_orb, y_orb)
    let x_orb = r * Math.cos(trueAnomaly);
    let y_orb = r * Math.sin(trueAnomaly);

    // Rotate to 3D Space using inclination, longitude of ascending node, and argument of perigee
    let cosO = Math.cos(ma);
    let sinO = Math.sin(ma);
    let cosI = Math.cos(i);
    let sinI = Math.sin(i);
    let cosW = Math.cos(w);
    let sinW = Math.sin(w);

    let X = x_orb * (cosO * cosW - sinO * sinW * cosI) - y_orb * (cosO * sinW + sinO * cosW * cosI);
    let Y = x_orb * (sinO * cosW + cosO * sinW * cosI) + y_orb * (cosO * cosW * cosI - sinO * sinW);
    let Z = x_orb * sinW * sinI + y_orb * cosW * sinI;
    return { X, Y, Z };
}
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
function solveEccentricAnomaly(M, e) {
    let E = M; // Initial guess
    let delta = 1e-6; // Convergence threshold
    while (true) {
        let dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= dE;
        if (Math.abs(dE) < delta) break;
    }
    return E;
}

export default Asteroid;


