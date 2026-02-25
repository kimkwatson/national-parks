export async function initMap(parks, types) {
    const isMobile = window.innerWidth <= 860;
    const zoomLevel = isMobile ? 3.2 : 5;
    const pinScale = isMobile ? .4 : 1;
    
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 36.8293, lng: -95.5795 },
        zoom: zoomLevel,
        scrollwheel: false,
        mapTypeControl: false,
        mapId: "59465a2252ededec98830f0d",
    });

    const { AdvancedMarkerElement, PinElement } =
    await google.maps.importLibrary("marker");

    types = {
    "National Park": { "background": "#fe5f55", "accent": "#ff9a93" },
    "National Monument": { "background": "#70ae6e", "accent": "#a6d3a4" },
    "National Recreation Area": { "background": "#fabc3c", "accent": "#ffe29a" },
    "National Seashore": { "background": "#4ea5d9", "accent": "#8fc9ea" },
    "National Lakeshore": { "background": "#4ea5d9", "accent": "#8fc9ea" },
    "National Historic Site": { "background": "#ef8a17", "accent": "#f4b46a" },
    "National Preserve": { "background": "#add9f4", "accent": "#d8ecfa" },
    "National Memorial": { "background": "#df7373", "accent": "#f0aaaa" },
    default: { "background": "#7776bc", "accent": "#b1b0e0" },
    }

    parks.forEach(park => {

        const infowindow = new google.maps.InfoWindow({
            content: buildPopup(park),
            ariaLabel: park.fullName,
        })
        const lat = Number(park.latitude);
        const lng = Number(park.longitude);
        const position = { lat: lat, lng: lng };
        const marker = new AdvancedMarkerElement({
        map,
        position,
        title: park.fullName,
        });

        // create pin element
        const typeKey = park.designation ?? "default";
        const style = types[typeKey] ?? types.default;

        const pin = new PinElement({
            scale: pinScale,
            background: style.background,
            borderColor: style.accent,
            glyphColor: style.accent,
        });
        marker.content = pin;
    
        marker.addListener('click', () => {
                infowindow.open({
                    anchor: marker,
                    map,
                })
                infowindow.focus()
        });
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

