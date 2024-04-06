import * as React from 'react';

export async function fetchAllBusStops() {
    

    // Initial call
    let allBusStops = [];
    let skip = 0;
    let notEmpty = true;
    // let res = await fetch(URL, { headers: {'AccountKey' : 'hV4nXC3dSKOzt5d3BYFl6A=='}});
    // let data = await res.json();
    // allBusStops = allBusStops.concat(data.value);
    // Bus Stops API endpoint
    // const URL = (`http://datamall2.mytransport.sg/ltaodataservice/BusStops?Latitude=${currentLocation.latitude}&Longitude=${currentLocation.longitude}&Radius=1000`);
    // const URL = `http://datamall2.mytransport.sg/ltaodataservice/BusStops?Latitude=${currentLocation.latitude}&Longitude=${currentLocation.longitude}&Radius=1000`;
    // const URL = (`http://datamall2.mytransport.sg/ltaodataservice/BusStops`);

    // Subsequent calls
    while (notEmpty) {
        // skip += 500;
        // console.log("skip value:", skip)
        const URL = `http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`;

        // Request to API to get response
        const res = await fetch(URL, { headers: {'AccountKey' : 'hV4nXC3dSKOzt5d3BYFl6A=='}});

        // Wait for response to convert to JSON format
        const data = await res.json();

        // for (const busStop of data.value) {
        //     // console.log(busStop)
        //     // let busStopCode = '47731';
        //     // let busStopCode = '46229';
        //     // let busStopCode = '96311';
        //     // if (busStop.BusStopCode === busStopCode) {
        //     //     // Found the desired bus stop
        //     //     console.log("Bus Stop found:", busStop)
        //     // }
        // }

        if (data.value.length === 0){
            notEmpty = false;
        } else{
            allBusStops = allBusStops.concat(data.value);
            skip += 500;
        }
        
    }
    console.log("All Bus Stops fetched")
    return allBusStops;
}
