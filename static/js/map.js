function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    // default maps UK lat & long
    center: { lat: 54.378, lng: -5.436 },
    zoom: 5,

    // bound the map to the area of the UK
    restriction: {
      latLngBounds: {
        north: 60,
        south: 48,
        east: 5,
        west: -20,
      },
    },
  });
  infoWindow = new google.maps.InfoWindow();

  // adding ab button that finds the current location of the person using the maps 
  const locationButton = document.createElement("button");
  findLocation(locationButton)

  // creating a button that finds the crime within your area
  const findCrimesButtons = document.createElement("button");
  findCrimes(findCrimesButtons)

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function findLocation(locationButton) {
  locationButton.textContent = "Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Current Location");
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(17);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function createCrimeButton(crimeObject) {
  var btn = document.createElement("BUTTON");   // Create a <button> element
  btn.innerHTML = crimeObject.name; 
  btn.setAttribute('value', crimeObject.url);
  document.body.appendChild(btn);
}

function findCrimes(findCrimesButtons) {
  findCrimesButtons.textContent = "Find Crimes";
  findCrimesButtons.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(findCrimesButtons);
  findCrimesButtons.addEventListener("click", () => {
    const url = "https://data.police.uk/api/crime-categories";

    let response = fetch(url)
      .then(res => res.json())
      .then(data => data.forEach(crimeObject => createCrimeButton(crimeObject)));
  })
}