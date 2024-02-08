//Ilham - Realtime traffic map

"use client"

import React, { useState, useEffect } from 'react';

const TrafficLightsStatus = () => {
  const [trafficLights, setTrafficLights] = useState([]);
  const API_URL = 'http://datamall2.mytransport.sg/ltaodataservice/FaultyTrafficLights';

  useEffect(() => {
    const fetchTrafficLights = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'AccountKey': 'RVCGPbcyRg6yXOyENrIqow=='
          }
        });
        const data = await response.json();
        setTrafficLights(data.value);
      } catch (error) {
        console.error('Failed to fetch traffic lights data:', error);
      }
    };

    fetchTrafficLights();

    // Interval to fetch the data every 2 minutes
    const intervalId = setInterval(fetchTrafficLights, 120000); // 120000 ms = 2 minutes

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Faulty Traffic Lights Status in Real-Time</h1>
      <ul>
        {trafficLights.map((light, index) => (
          <li key={index}>
            {light.NodeID} - {light.Message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficLightsStatus; 
