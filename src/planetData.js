import {data} from "./data";


const planetData = data.Sheet1.map((planet, index) => ({
        id: index,
    name: planet.Planet,
    size: planet.D,
    distanceFromSun: planet.A,
    velocity: planet.V,
    eccentricity: planet.E,
    inclination: planet.I,
    color: planet.color,
    xRadius:  planet.A+4,
    zRadius:  planet.A+4,
}));

export default planetData;
