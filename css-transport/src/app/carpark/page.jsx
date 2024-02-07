"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure the Leaflet CSS is imported for proper map styling

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
      Papa.parse('/carpark.csv', { // Adjusted to the correct path in the public folder
        download: true,
        header: true,
        complete: (result) => {
          setLocations(result.data);
        }
      });
    };

    fetchCarParkData();
    fetchCarParkLocations();
  }, []);

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
        // This example assumes the coordinates are directly usable as lat and long
        return (
          <Marker key={index} position={[location.y_coord, location.x_coord]}>
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