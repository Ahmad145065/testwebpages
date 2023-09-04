// Create a Leaflet map and set the initial view to the first item in the data
const map = L.map('mapid').setView([4.2105,101.9758], 7);

// Add an OpenStreetMap tile layer to the map
const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Add an array to hold the markers
const markers = [];

// Function to add a marker to the map and the markers array
function addMarker(latitude, longitude, time, deviceId, behavior, score) {
  // Check if latitude and longitude are valid numbers
  if (isNaN(latitude) || isNaN(longitude)) {
    return; // Skip adding marker if invalid values are encountered
  }
  //map.setView([latitude, longitude], 12);
  const marker = L.marker([latitude, longitude]).addTo(map);
  const popupContent = `
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Device ID:</strong> ${deviceId}</p>
    <p><strong>Behavior:</strong> ${behavior}</p>
    <p><strong>Score:</strong> ${score}</p>
  `;
  marker.bindPopup(popupContent);
  markers.push(marker);
}

// Function to clear all markers from the map and the markers array
function clearMarkers() {
  markers.forEach(marker => marker.remove());
  markers.length = 0;
}

// Function to fetch data and update markers
function fetchDataAndUpdateMarkers() {
  // Fetch the JSON data from the external file or API endpoint
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      // Call clearMarkers() to remove all existing markers
      clearMarkers();
	  // Create an array to hold the LatLng objects for each marker
      const latLngs = [];
      // Loop through each driving history item and add a marker for it
      data['driving-history'].forEach(item => {
  	const lat = item.latitude;
  	const lng = item.longitude;
  	const time = item.time;
  	const deviceId = item.device_id;
  	const behavior = item.behavior;
  	const score = item.score;
  	addMarker(lat, lng, time, deviceId, behavior, score);
	 // Create a LatLng object for the current marker and add it to the array
        const latLng = L.latLng(lat, lng);
        latLngs.push(latLng);
});
	// Create a LatLngBounds object from the array of LatLng objects
      const bounds = L.latLngBounds(latLngs);
	// Set the map view to the bounds of all the markers
      map.fitBounds(bounds);
    });
}

// Call fetchDataAndUpdateMarkers() initially to populate the map with markers
fetchDataAndUpdateMarkers();

// Set interval to repeatedly call fetchDataAndUpdateMarkers() every 30 seconds
const refreshInterval = setInterval(fetchDataAndUpdateMarkers, 30000);

// Function to stop auto-refresh
function stopRefresh() {
  clearInterval(refreshInterval);
}