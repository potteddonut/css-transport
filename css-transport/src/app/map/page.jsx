//Ilham - Realtime traffic map

//2 min update frequency

"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import xmlParser from 'xml-js';

function AlarmInfo() {
  const [alarmInfo, setAlarmInfo] = useState(null);

  useEffect(() => {
    axios.get('http://datamall.mytransport.sg/LTAoDataService.svc/AlarmInfoSet')
      .then(response => {
        const xmlData = response.data;
        const jsonData = xmlParser.xml2json(xmlData, { compact: true, spaces: 4 });
        const parsedData = JSON.parse(jsonData);
        setAlarmInfo(parsedData);
      })
      .catch(error => {
        console.error('Error fetching alarm info:', error);
      });
  }, []);

  return (
    <div>
      <h1>Faulty Traffic Light</h1>
      {alarmInfo && alarmInfo.feed && alarmInfo.feed.entry && (
        <div>
          <h2>{alarmInfo.feed.title._text}</h2>
          <p>{alarmInfo.feed.entry.title._text}</p>
          <p>{alarmInfo.feed.entry.summary._text}</p>
          <p>Start Date: {alarmInfo.feed.entry.updated._text}</p>
          <p>End Date: {alarmInfo.feed.entry.content.m_properties.EndDate._text}</p>
          <p>Type: {alarmInfo.feed.entry.content.m_properties.Type._text}</p>
          <p>Message: {alarmInfo.feed.entry.content.m_properties.Message._text}</p>
          <p>Create Date: {alarmInfo.feed.entry.content.m_properties.CreateDate._text}</p>
          <p>Summary: {alarmInfo.feed.entry.content.m_properties.Sumary._text}</p>
        </div>
      )}
    </div>
  );
}

export default AlarmInfo;