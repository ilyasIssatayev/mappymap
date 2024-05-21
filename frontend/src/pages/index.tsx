import { useState, useEffect } from 'react';

function LandingPage() {

    const query = `[out:json];
    area[name="Enschede"]->.searchArea;
    (
      //node["building"](area.searchArea);
      way["building"](area.searchArea);
      //relation["building"](area.searchArea);
    );
    out body;
    >;
    out skel qt;`;

// Encode the query
const encodedQuery = encodeURIComponent(query);

    useEffect(() => {
        const fetchData = async () => {
            console.log("ping")
          try {
            const apiUrl = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            console.log(jsonData)

          } catch (error) {
            console.log('error',error)

          } finally {

          }
        };
    
        fetchData();
      }, []);



    return (
        <div>mappymap</div>
    );
}

export default LandingPage