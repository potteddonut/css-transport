"use client";
import React, { useState, useEffect } from "react";

export default function Causeway() {
    const [data, setData] = useState([]);

    // fetch url https://api.data.gov.sg/v1/transport/traffic-images
    // FIXME broken
    useEffect(() => {
        fetch("https://api.data.gov.sg/v1/transport/traffic-images")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setData(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
        </>
    )
}