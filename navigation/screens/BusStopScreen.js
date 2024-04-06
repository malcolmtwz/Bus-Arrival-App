import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const BusStopScreen = ({ route }) => { 
    const { busStop } = route.params;
    const [busStopList, setBusStopList] = React.useState([]);

    React.useEffect( () => {
        const fetchBusArrival = async() => {
            try{
            const URL = (`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStop.BusStopCode}`);
            const res = await fetch(URL, { headers: {'AccountKey' : 'hV4nXC3dSKOzt5d3BYFl6A=='}});
            const data = await res.json();
            console.log('Data: ', data);
            console.log('Estimated Arrival', data.Services.EstimatedArrival)
            setBusStopList(data.Services || []);

            } catch (error) {
                console.error('Error fetching bus arrival data', error);
            }
        }
        fetchBusArrival();
    }, [busStop.BusStopCode]);

    const calculateTimeLeft = (arrivalTime) => {
        const now = new Date();
        const arrival = new Date(arrivalTime);
        const diffInMilliSeconds = arrival.getTime() - now.getTime();
        const diffInMinutes = Math.ceil(diffInMilliSeconds / (1000 * 60));
        return diffInMinutes;
    };

    React.useEffect( () => {
        console.log('Bus Stop in BusStopScreen:', busStop);
        console.log('Bus Stop code in BusStopScreen:', busStop.BusStopCode);
    }, []);

    return(
        <View style={styles.container}>
            <Text> BusStopCode: {busStop.BusStopCode} </Text>
            <Text>Bus Stop Description: {busStop.Description}</Text>
            <Text> Bus Services: </Text>
            {busStopList.map( (service, index) => (
                <View key={index} style = {styles.serviceContainer}>
                    <Text> Bus No: {service.ServiceNo}</Text>
                    <Text> Estimated Arrival: {calculateTimeLeft(service.NextBus?.EstimatedArrival)} minutes left </Text>
                </View>
            ))}
        </View>
    )

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
});

export default BusStopScreen;