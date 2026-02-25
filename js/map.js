export async function initMap(parks, types) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8293, lng: -98.5795 },
        zoom: 5,
        scrollwheel: false,
        mapTypeControl: false,
        mapId: "59465a2252ededec98830f0d",
    });

    const { AdvancedMarkerElement, PinElement } =
    await google.maps.importLibrary("marker");

    parks.forEach(park => {

        const infowindow = new google.maps.InfoWindow({
            content: buildPopup(park),
            ariaLabel: park.name,
        })
        const position = { lat: park.lat, lng: park.lng };
        const marker = new AdvancedMarkerElement({
        map,
        position,
        title: park.name,
        });

        // create pin element
        const pin = new PinElement({
            scale: 1,
            background: types[park.type].background,
            borderColor: types[park.type].accent,
            glyphColor: types[park.type].accent,
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
            <h3>${park.name}</h3>
            <p>${park.state}</p>
            <p>${park.type}</p>
        </div>
    `
}

