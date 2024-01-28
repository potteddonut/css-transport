import React from 'react';
import arrivalData from './Arrival.json';
import './BusArrivalDisplay.css';

const BusService = ({ service }) => {
    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleTimeString();
    };

    return (
        <div className="serviceContainer">
            <h3 className="serviceHeader">Service No: {service.ServiceNo}</h3>
            <p>Operator: {service.Operator}</p>
            <ul className="list">
                <li className="listItem">Next Bus: {formatDate(service.NextBus.EstimatedArrival)}</li>
                <li className="listItem">Next Bus 2: {formatDate(service.NextBus2.EstimatedArrival)}</li>
                <li className="listItem">Next Bus 3: {formatDate(service.NextBus3.EstimatedArrival)}</li>
            </ul>
        </div>
    );
};

const BusArrivalDisplay = () => {
    return (
        <div className="container">
            <h1 className="busStopHeader">Bus Stop Code: {arrivalData.BusStopCode}</h1>
            {arrivalData.Services.map((service, index) => (
                <BusService key={index} service={service} />
            ))}
        </div>
    );
};

export default BusArrivalDisplay;
