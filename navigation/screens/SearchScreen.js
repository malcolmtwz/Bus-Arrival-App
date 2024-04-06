import * as React from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { fetchAllBuses } from '../../components/FetchBuses';

const SearchScreen = ( { navigation } ) => {
    const [busList, setBusList] = React.useState([]);

    //  {} is where the code we want to run , [] is the dependency array ( what it listens to, nth = run once )
    // React.useEffect( () => {}, [] );
    console.log('navigation in Search Screen',navigation)
    
    // React.useEffect( () => {
        
    //     // Fetch bus data from API
    //     const fetchBusServices = async() => {
    //         try {
    //             // Bus Arrival API endpoint
    //             const URL = ('http://datamall2.mytransport.sg/ltaodataservice/BusServices');
                
    //             // Request to API to get response
    //             const res = await fetch(URL, { headers: {'AccountKey' : 'hV4nXC3dSKOzt5d3BYFl6A=='}});
                
    //             // Wait for response to convert to JSON format
    //             const data = await res.json();

    //             // Extract unique bus numbers and set to state
    //             const uniqueBusNumbers = Array.from(new Set(data.value.map(item => item.ServiceNo)));
    //             const sortedBusNumbers = uniqueBusNumbers.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

    //             setBusList(sortedBusNumbers);

    //             // console.log('Bus Data:', data);
    //         } catch (error) {
    //             console.error('Error fetching bus data', error);
    //         }
    //     }

    //     fetchBusServices();
    // }, []);

    React.useEffect( () => {
        fetchAllBuses()
            .then(allBuses => {
                const busNumbers = allBuses.map(bus => bus.ServiceNo);
                setBusList(busNumbers);
            })
            .catch(error => {
                // console.log("Error fetching buses", error);
            })
    }, []);

    const handleBusPress = (busNumber) => {
        navigation.push('BusDirections', { busNumber});
    }


    return(
        <ScrollView style={styles.container}>
        {busList.map((busNumber, index) => (
          <TouchableOpacity key={index} onPress={() => handleBusPress(busNumber)}>
            <View style={styles.busItem}>
              <Text>{busNumber}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        left: 10,
        size: 40,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    searchInput:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '80%',
    },
    busItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});



