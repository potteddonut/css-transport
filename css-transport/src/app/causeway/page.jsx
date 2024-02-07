"use client";
import React, { useState, useEffect } from "react";
import './styles.css';

export default function Causeway() {
    // CAMERA NUMBERS 4703, 4713, 2701, 2702
    const api = "https://api.data.gov.sg/v1/transport/traffic-images"
    const cameraIDs = ["4703", "4713", "2701", "2702"];

    const [lastUpdated, setLastUpdated] = useState(null);
    const [cameraList, setCameraList] = useState([]);
    let causewayCameras = [];

    /**
     * @param {string} api 
     */
    const fetchData = async (api) => {
        console.log("fetching data");
        await fetch(api)
            .then((r) => r.json())
            .then((data) => {
                let timestamp = new Date(data.items[0].timestamp);
                setLastUpdated(`${timestamp}`);

                // arr of objs
                let cameraData = data.items[0].cameras;
                setCameraList([]); // reset state to prevent appending on re-fetch

                for (let i=0; i<cameraData.length; i++) {
                    if (cameraIDs.includes(cameraData[i].camera_id)) {
                        // causewayCameras.push(cameraData[i].image);
                        setCameraList(causewayCameras => [...causewayCameras, cameraData[i].image]);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData(api);
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>  
            <div id="header">
                <h3>Feed last updated: </h3>
                <p>{lastUpdated}</p>
            </div>
            <div id="images">
                {   
                    cameraList.map((url, key) => {
                        return(<img src={url} key={key} alt="causeway photo"/>);
                    })
                }
            </div>
        </>
    );
}