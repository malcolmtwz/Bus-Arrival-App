import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function FavouritesScreen({navigation}) { 

    return(
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Home')}> Favourites Screen</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});