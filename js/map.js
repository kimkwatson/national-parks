let map;
let markers = [];
let allParks = [];
let typesConfig = [];

export async function initMap(parks, types) {
    allParks = parks;
    typesConfig = types;
    
    const isMobile = window.innerWidth <= 860;
    const zoomLevel = isMobile ? 3.2 : 5;
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 36.8293, lng: -95.5795 },
        zoom: zoomLevel,
        scrollwheel: false,
        mapTypeControl: false,
        mapId: "59465a2252ededec98830f0d",
    });

    await google.maps.importLibrary("marker");

    renderMarkers();
}

export function renderMarkers() {
    // clear old markers
    markers.forEach(marker => (marker.map = null));
    markers = [];

    // determine type/designation
    const selectedType = document.querySelector('#animated li.active')?.dataset.designation ?? "all";

    const isMobile = window.innerWidth <= 860;
    const pinScale = isMobile ? .4 : 1;

    const { AdvancedMarkerElement, PinElement } = google.maps.marker;

    allParks.forEach(park => {

        // filtering
        if (selectedType === "default" && typesConfig[park.designation]) return;

        if (selectedType !== "all" &&
            selectedType !== "default" &&
            park.designation !== selectedType) return;

        // get position in lat/long
        const lat = Number(park.latitude);
        const lng = Number(park.longitude);
        const position = { lat: lat, lng: lng };

        // get type/designation
        const style = typesConfig[park.designation] ?? typesConfig.default;
        
        // create marker
        const marker = new AdvancedMarkerElement({
            map,
            position,
            title: park.fullName,
            });

        const pin = new PinElement({
            scale: pinScale,
            background: style.background,
            borderColor: style.accent,
            glyphColor: style.accent,
        });

        marker.content = pin;

        const infowindow = new google.maps.InfoWindow({
            content: buildPopup(park),
            ariaLabel: park.fullName,
        })
    
        marker.addListener('click', () => {
            infowindow.open({
                anchor: marker,
                map,
            })
            infowindow.focus()
        });
        
        markers.push(marker);
    });
}

function buildPopup(park) {
    return `
        <div id="popup">
            <h3 id="popup-name">${park.fullName}</h3>
            ${park.images?.[0]?.url ? `<img id="popup-image" src="${park.images[0].url}" alt="${park.fullName}"/>` : ""}
            <p id="popup-description">${park.description}</p>
            <p id="popup-states"><strong>States:</strong> ${park.states}</p>
            <a id="popup-link" href="${park.url}" target="_blank">Official site</a>
            
        </div>
    `
}

