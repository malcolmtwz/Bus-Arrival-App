import * as React from 'react';

export async function fetchAllBuses() {

    let allBuses = [];
    let skip = 0;
    let notEmpty = true;

    while (notEmpty){
        const URL = `http://datamall2.mytransport.sg/ltaodataservice/BusServices?$skip=${skip}`;
        const res = await fetch(URL, { headers: {'AccountKey' : 'hV4nXC3dSKOzt5d3BYFl6A=='}});
        const data = await res.json();

        if (data.value.length === 0){
            notEmpty = false;
        } else{
            const uniqueBuses = data.value.filter(bus => !allBuses.some(existingBus => existingBus.ServiceNo === bus.ServiceNo));
            allBuses = allBuses.concat(data.value);
            skip += 500;
        }
    }
    console.log("Buses", allBuses)
    console.log("All Buses fetched")
    allBuses.sort((a, b) => a.ServiceNo.localeCompare(b.ServiceNo, undefined, {numeric: true}));
    return allBuses;
}
