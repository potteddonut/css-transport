"use client";
import React, { useState, useEffect } from "react";

export default function Causeway() {
    // CAMERA NUMBERS 4703, 4713, 2701, 2702
    const api = "https://api.data.gov.sg/v1/transport/traffic-images"
    const cameraIDs = ["4703", "4713", "2701", "2702"];

    const [lastUpdated, setLastUpdated] = useState(null);
    let causewayCameras = [];

    /**
     * @param {string} api 
     */
    const updateData = (api) => {
        causewayCameras = [];

        fetch(api)
        .then((r) => r.json())
        .then((data) => {
            const lastUpdated = new Date(data.items[0].timestamp);
            setLastUpdated(`${lastUpdated}`);

            // arr of objs
            let cameraData = data.items[0].cameras;

            for (let i=0; i<cameraData.length; i++) {
                if (cameraIDs.includes(cameraData[i].camera_id)) {
                    causewayCameras.push(cameraData[i].image);
                }
            }
        })
    }

    updateData(api);        // initial API call
    useEffect(() => {       // auto-refresh every minute
        const refresh = setInterval(() => {
            updateData(api);
            console.log("Data refreshed");
        }, 60000);
        return () => clearInterval(refresh);
    });

    console.log(causewayCameras);
    // let cam1 = causewayCameras[0];
    // let cam2 = causewayCameras[1];
    // let cam3 = causewayCameras[2];
    // let cam4 = causewayCameras[3];

    return (
        <>
            <div id="header">
                <h3>Feed last updated: </h3>
                <p>{lastUpdated}</p>
            </div>
            {/* <div id="images">
                <img src={cam1} />
            </div> */}
        </>
    );
}