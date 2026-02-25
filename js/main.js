import { initMap as buildMap } from "./map.js";

window.initMap = async () => {
    const response = await fetch("./data/parks.json");
    const data = await response.json();

    const parks = data.parks;
    const types = data.types;

    buildMap(parks, types);
};
