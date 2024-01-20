"use client";
import React, { useState, useEffect } from "react";

export default function Causeway() {
    // CAMERA NUMBERS 4703, 4713, 2701, 2702
    const api = "https://api.data.gov.sg/v1/transport/traffic-images"
    const cameraIDs = ["4703", "4713", "2701", "2702"];

    const [lastUpdated, setLastUpdated] = useState(null);
    let causewayCameras = [];

    const ImageComponent = ({data}) => {
        data.map((item) => {
            <img
                className="image"
                src={item}
                alt={item}
            />
        })
    }

    const fetchImage = () => {
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

    fetchImage();
    console.log(causewayCameras);

    return (
        <>
            {fetchImage()}
            <h3>Feed last updated: </h3>
            <p>{lastUpdated}</p>
        </>
    );
}