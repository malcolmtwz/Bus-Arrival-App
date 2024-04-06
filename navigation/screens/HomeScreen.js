import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from "expo-location";
import * as Permission from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';

//Components
import { fetchAllBusStops } from '../../components/busStops';
import { handleMarkerClick } from '../../components/MapFunctions';

//Fonts
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const HomeScreen = ({navigation}) => { 

    const [currentLocation, setCurrentLocation] = React.useState(null)
    const [initialRegion, setInitialRegion] = React.useState(null);
    const [busStops, setBusStops] = React.useState([]);
    const sampleBusStops = [
        { BusStopCode: "01012", Description: "Hotel Grand Pacific", Latitude: 1.29684825487647, Longitude: 103.85253591654006 },
        { BusStopCode: "01013", Description: "St. Joseph's Church", Latitude: 1.296851, Longitude: 103.853016 }
      ];

    React.useEffect( () => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if ( status !== "granted") {
                console.log("Permission to access locaton was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
            });   
        };
        getLocation();
    }, [] );

    React.useEffect( () => {
        fetchAllBusStops()
            .then(allBusStops => {
                setBusStops(allBusStops);
            })
            .catch(error => {
                console.error("Error fetching bus stps:", error);
            })
    }, [] );

    // React.useEffect(() => {
        // console.log('Bus Stops:', busStops);
    // }, [busStops]);

    const CurrentMarker = ( {coordinate, title }) => (
        <Marker coordinate={coordinate} title={title}>
            <FontAwesome6 name="location-crosshairs" size={30} color="red" />
        </Marker>
    );



    return(
            <View style={styles.container}>
                {initialRegion && (
                    <MapView style={styles.map} initialRegion={initialRegion}>
                        {busStops.map((busStop) => (
                            <Marker
                                key={busStop.BusStopCode}
                                coordinate={{
                                latitude: parseFloat(busStop.Latitude),
                                longitude: parseFloat(busStop.Longitude),
                                }}
                                title={busStop.Description}
                                onPress={() => {
                                    // console.log('Sending bus stop to BusStopScreen:', busStop);
                                    // navigation.navigate('BusStopStack', { busStop });
                                    handleMarkerClick(navigation,busStop)
                                }}
                            />
                        ))}
                        {currentLocation && (
                            <CurrentMarker
                                coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                                }}
                                title='Current Location'
                            />
                        )}
                    </MapView>
                )}
        </View>
    );

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map:{
        flex:1,
        width: "100%",
        height: "100%",
    }
});

export default HomeScreen;