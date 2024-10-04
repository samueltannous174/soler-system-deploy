import React from 'react';
const data = [
    {
        planet: "Mercury",
        diameter: 4879.4, // in km
        semiMajorAxis: 0.39, // in AU
        velocity: 47.87, // in km/s
        eccentricity: 0.206,
        inclination: 7, // in degrees
        description: "Mercury is the smallest planet in our solar system and closest to the Sun. It has a very thin atmosphere and experiences extreme temperature variations."
        ,imageUrl:"https://cdn.mos.cms.futurecdn.net/jQKcQhpHzSq7JSJ2987Hoa-1200-80.jpg"
    },
    {
        planet: "Venus",
        diameter: 12104, // in km
        semiMajorAxis: 0.72, // in AU
        velocity: 35.02, // in km/s
        eccentricity: 0.007,
        inclination: 3.4, // in degrees
        description: "Venus is similar in size to Earth but has a thick, toxic atmosphere that traps heat, making it the hottest planet. It rotates in the opposite direction of most planets."
        ,imageUrl:"https://science.nasa.gov/wp-content/uploads/2023/06/Venus-jpeg.webp?w=4096&format=png&crop=1"

    },
    {
        planet: "Earth",
        diameter: 12742, // in km
        semiMajorAxis: 1, // in AU
        velocity: 29.78, // in km/s
        eccentricity: 0.017,
        inclination: 0, // in degrees
        description: "Earth is the third planet from the Sun and the only planet known to support life. It has a moderate climate, water, and a protective atmosphere."
        ,imageUrl:"https://cdn.mos.cms.futurecdn.net/FaWKMJQnr2PFcYCmEyfiTm-1200-80.jpg"

    },
    {
        planet: "Mars",
        diameter: 6779, // in km
        semiMajorAxis: 1.52, // in AU
        velocity: 24.077, // in km/s
        eccentricity: 0.094,
        inclination: 1.8, // in degrees
        description: "Mars is known as the Red Planet due to iron oxide on its surface. It has the largest volcano and canyon in the solar system and may have had liquid water in the past."
        ,imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOXems5hecNN2eFScMMeDSGTgZBCJ4jCNHw&s"

    },
    {
        planet: "Jupiter",
        diameter: 139820, // in km
        semiMajorAxis: 5.2, // in AU
        velocity: 13.07, // in km/s
        eccentricity: 0.049,
        inclination: 1.31, // in degrees
        description: "Jupiter is the largest planet in the solar system and has a strong magnetic field. It has at least 79 moons and is famous for its Great Red Spot, a massive storm."
        ,imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOXems5hecNN2eFScMMeDSGTgZBCJ4jCNHw&s"
    },
    {
        planet: "Saturn",
        diameter: 116464, // in km
        semiMajorAxis: 9.54, // in AU
        velocity: 9.69, // in km/s
        eccentricity: 0.052,
        inclination: 2.5, // in degrees
        description: "Saturn is best known for its extensive ring system, made of ice and rock. It has 83 moons and is the second-largest planet in the solar system."
        ,imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/290px-Jupiter_New_Horizons.jpg"

    },
    {
        planet: "Uranus",
        diameter: 50724, // in km
        semiMajorAxis: 19.2, // in AU
        velocity: 6.81, // in km/s
        eccentricity: 0.047,
        inclination: 0.8, // in degrees
        description: "Uranus is a gas giant that rotates on its side, which is unique among planets. It has a faint ring system and 27 known moons."
        ,imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/290px-Jupiter_New_Horizons.jpg"
    },
    {
        planet: "Neptune",
        diameter: 49244, // in km
        semiMajorAxis: 30.1, // in AU
        velocity: 5.43, // in km/s
        eccentricity: 0.01,
        inclination: 1.8, // in degrees
        description: "Neptune is the farthest planet from the Sun and is known for its deep blue color. It has strong winds and a storm similar to Jupiter's Great Red Spot."
        ,imageUrl:"https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg?w=4096&format=jpeg&crop=1"
    }
];



function PlanetCard({planetIndex,setShowPlanetInfoIndex}) {
    const index =planetIndex
    return (
        <div className="planet-container">
            <button className="buttonClose" onClick={()=> setShowPlanetInfoIndex(-1)}>
                X
            </button>
            <h2>{data[index].planet}</h2>
            <img src={data[index].imageUrl} alt={`${data[index].planet}`} style={{ width: '300px', height: 'auto' }} />
            <p><strong>Diameter:</strong> {data[index].diameter} km</p>
            <p><strong>Semi-Major Axis:</strong> {data[index].semiMajorAxis} AU</p>
            <p><strong>Orbital Velocity:</strong> {data[index].velocity} km/s</p>
            <p><strong>Eccentricity:</strong> {data[index].eccentricity}</p>
            <p><strong>Inclination:</strong> {data[index].inclination}°</p>
            <p><strong>Description:</strong> {data[index].description}</p>
        </div>
    );
}

export default PlanetCard;
