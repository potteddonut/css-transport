"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faChair, faBusSimple } from '@fortawesome/free-solid-svg-icons';
import './BusArrivalDisplay.css';


const BusService = ({ service }) => {
    const formatMinutes = (isoString) => {
        if (!isoString) return 'N/A';
        const arrivalTime = new Date(isoString);
        const currentTime = new Date();
        const differenceInMilliseconds = arrivalTime - currentTime;
        const differenceInMinutes = Math.round(differenceInMilliseconds / 60000);
        return differenceInMinutes > 0 ? `${differenceInMinutes} ` : 'Arriving';
    };

    const getBusTypeIcon = (type) => {
        switch (type) {
            case 'SD':
                return <FontAwesomeIcon icon={faBusSimple} title="Single Deck" />;
            case 'DD':
                return (
                    <div className="bus-icon-double">
                        <FontAwesomeIcon icon={faBusSimple} title="Double Deck" />
                        <FontAwesomeIcon icon={faBusSimple} title="Double Deck" className="bus-icon-top" />
                    </div>
                );
            case 'BD':
                return (
                    <div className="bus-icon-bendy">
                        <FontAwesomeIcon icon={faBusSimple} title="Bendy" />
                        <FontAwesomeIcon icon={faBusSimple} title="Bendy" className="bus-icon-back" />
                    </div>
                );
            default:
                return null;
        }
    };

    const getBusLoadIcon = (load) => {
        const iconStyles = {
            'SEA': 'load-seats-available',
            'SDA': 'load-standing-available',
            'LSD': 'load-limited-standing',
        };
        const iconClass = iconStyles[load] || 'load-unknown';
        const titleText = {
            'SEA': 'Seats Available',
            'SDA': 'Standing Available',
            'LSD': 'Limited Standing',
        }[load] || 'Load Unknown';
    
        return <FontAwesomeIcon icon={faChair} className={`attribute load ${iconClass}`} title={titleText} />;
    };

    const renderBusAttributes = (bus) => {
        const wheelchairIcon = bus.Feature === 'WAB' ? <FontAwesomeIcon icon={faWheelchair} title="Wheelchair Accessible" /> : null;
        const busTypeIcon = getBusTypeIcon(bus.Type);
        const busLoadIcon = getBusLoadIcon(bus.Load);

        return (
            <div className="busAttributes">
                {wheelchairIcon}
                {busTypeIcon}
                {busLoadIcon}
            </div>
        );
    };

    return (
        <div className="serviceContainer">
            <h3 className="serviceHeader">Service No: {service.ServiceNo}</h3>
            <ul className="list">
                <li className="listItem">
                    {formatMinutes(service.NextBus.EstimatedArrival)}
                    {renderBusAttributes(service.NextBus)}
                </li>
                <li className="listItem">
                    {formatMinutes(service.NextBus2.EstimatedArrival)}
                    {renderBusAttributes(service.NextBus2)}
                </li>
                <li className="listItem">
                    {formatMinutes(service.NextBus3.EstimatedArrival)}
                    {renderBusAttributes(service.NextBus3)}
                </li>
            </ul>
        </div>
    );
};

const BusArrivalDisplay = () => {
    const [arrivalData, setArrivalData] = useState({ Services: [], BusStopCode: '', BusStopName: 'Ngee Ann Poly, Clementi Rd' });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBusArrivalData = async () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=12101';
        const apiUrl = `${proxyUrl}${targetUrl}`;
        try {
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
            const busStopName = data.BusStopName || 'Ngee Ann Poly, Clementi Rd';
            setArrivalData({ ...data, BusStopName: busStopName });
        } catch (error) {
            console.error('Error fetching bus arrival data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredServices = arrivalData.Services.filter((service) => {
        return service.ServiceNo.includes(searchTerm);
    });

    useEffect(() => {
        fetchBusArrivalData();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1 className="busStopHeader">{arrivalData.BusStopName}</h1>
                <h2 className="busStopCode">Bus Stop Code: {arrivalData.BusStopCode}</h2>
                <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search bus number..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="searchInput"
        />
      </div>
            </div>
            <div className="content">
                {filteredServices.map((service, index) => (
                    <BusService key={index} service={service} />
                ))}
            </div>
            <div className="buttons">
                <button onClick={fetchBusArrivalData} className="refreshButton">Refresh</button>
            </div>
        </div>
    );
};

export default BusArrivalDisplay;