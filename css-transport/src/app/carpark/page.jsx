"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure the Leaflet CSS is imported for proper map styling

const calculateLongitude = (yCoord) => {
  const avgYCoord = 37891.022733513346
  const maxYCoord = 48691.4308
  const minYCoord = 28123.4116
  const scale = 0.18
  const offsetY = 0.0
  const lngDiff = ((yCoord - avgYCoord) / (maxYCoord - minYCoord)) * scale + offsetY
  return 1.3521 + lngDiff; 
};

const calculateLatitude = (xCoord) => {
  const avgXCoord = 28743.502045299196
  const maxXCoord = 45264.5806
  const minXCoord = 11539.0898
  const scale = 0.32
  const offsetX = 0.01
  const latDiff = ((xCoord - avgXCoord) / (maxXCoord - minXCoord)) * scale + offsetX
  return 103.8198 + latDiff; 
};

function App() {
  const [carParks, setCarParks] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch car park availability from the API
    const fetchCarParkData = async () => {
      const response = await axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');
      const carParkData = response.data.items[0].carpark_data;
      setCarParks(carParkData);
    };

    // Load car park locations from the CSV file in the public folder
    const fetchCarParkLocations = () => {
      
    };

    fetchCarParkData();
    fetchCarParkLocations();
  }, []);

  console.log(locations)

  return (
    <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => {
        // Find corresponding car park availability data
        const carPark = carParks.find(cp => cp.carpark_number === location.car_park_no);
        if (!carPark) return null; // Skip if no matching car park data found

        const availableLots = carPark.carpark_info[0].lots_available;
        const totalLots = carPark.carpark_info[0].total_lots;

        // Convert coordinates (Assuming they need conversion to latitude and longitude)
        const lat = calculateLongitude(location.y_coord);
        const lng = calculateLatitude(location.x_coord);
        // This example assumes the coordinates are directly usable as lat and long
        return (
          <Marker key={index} position={[lat, lng]}>
            <Popup>
              {location.address}<br />
              Available: {availableLots}/{totalLots}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default App;