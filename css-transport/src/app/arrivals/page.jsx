"use client"
import React, { useState, useEffect } from 'react';
import './BusArrivalDisplay.css';

const BusService = ({ service }) => {
    const formatMinutes = (isoString) => {
        if (!isoString) return 'N/A';

        const arrivalTime = new Date(isoString);
        const currentTime = new Date();
        const differenceInMilliseconds = arrivalTime - currentTime;
        const differenceInMinutes = Math.round(differenceInMilliseconds / 60000);

        return differenceInMinutes > 0 ? `${differenceInMinutes} min` : 'Arriving';
    };

    return (
        <div className="serviceContainer">
            <h3 className="serviceHeader">Service No: {service.ServiceNo}</h3>
            <ul className="list">
                <li className="listItem">Next Bus 1: {formatMinutes(service.NextBus.EstimatedArrival)}</li>
                <li className="listItem">Next Bus 2: {formatMinutes(service.NextBus2.EstimatedArrival)}</li>
                <li className="listItem">Next Bus 3: {formatMinutes(service.NextBus3.EstimatedArrival)}</li>
            </ul>
        </div>
    );
};

const BusArrivalDisplay = () => {
    const [arrivalData, setArrivalData] = useState({ Services: [] });

    const fetchBusArrivalData = async () => {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=12101';
            const apiUrl = `${proxyUrl}${targetUrl}`;
            const response = await fetch(apiUrl, {
                headers: {
                    'AccountKey': '0zTkUqYdSx6ExJRsRA3CXg==',
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setArrivalData(data);
        } catch (error) {
            console.error('Error fetching bus arrival data:', error);
        }
    };

    useEffect(() => {
        fetchBusArrivalData();
    }, []);

    return (
        <div className="container">
            <div className="content">
                {arrivalData.BusStopCode && <h1 className="busStopHeader">Bus Stop Code: {arrivalData.BusStopCode}</h1>}
                {arrivalData.Services.map((service, index) => (
                    <BusService key={index} service={service} />
                ))}
            </div>
            <div className="buttons">
                <button onClick={fetchBusArrivalData} className="refreshButton">Refresh Arrival Times</button>
            </div>
        </div>
    );
};

export default BusArrivalDisplay;
