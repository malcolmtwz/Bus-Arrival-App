import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BusDirectionScreen = ( {route} )  => { 

    const { busNumber } = route.params;
    const navigation = useNavigation();
    console.log('navigation in Bus Direction Screen',navigation)

    const directions = ['Direction 1', 'Direction 2'];

    const handleDirectionPress = (direction) => {
        console.log("Navigation Object:", navigation);
        navigation.navigate('BusStop', { busNumber, direction });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.header}> Select Direction for Bus: { busNumber }</Text>
            <FlatList
                data = {directions}
                renderItem = {( {item} ) => (
                    <TouchableOpacity onPress = { () => handleDirectionPress(item)}>
                        <Text style = {styles.direction}> {item} </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
    direction: {
        fontSize: 18,
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default BusDirectionScreen;
