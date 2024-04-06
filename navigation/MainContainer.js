import * as React from 'react';

//Navigation Bar
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'

//Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import BusDirectionScreen from './screens/BusDirectionScreen';
import BusStopScreen from './screens/BusStopScreen';

//Screen Names
const homeName = 'Home';
const searchName = 'Search';
const favName = 'Favourites';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

var blue = '#3962ff'
var white = '#fff'

// const BusStopStack = () => (
//     <Stack.Navigator screenOptions={{headerMode: false}}>
//         <Stack.Screen name='BusStopScreen' component={BusStopScreen} />
//     </Stack.Navigator>
// );

const SearchStack = () => (
    <Stack.Navigator screenOptions={{headerMode: false}}>
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='BusDirections' component={BusDirectionScreen} />
        {/* <Stack.Screen name='BusStopStack2' component={BusStopStack} /> */}
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator screenOptions={{headerMode: false}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='BusStopStack' component={BusStopScreen} />
    </Stack.Navigator>
);


export default function MainContainer(){
    return(
        <NavigationContainer>

            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { 
                        height: 100,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20, 
                        position: 'absolute', // Position the tab bar absolutely
                        bottom: -10, // Adjust the distance from the bottom
                        left: 0,
                        right: 0,
                    },
                    tabBarLabelStyle: { fontSize: 18, marginBottom: 25 },
                }}
            >
                <Tab.Screen
                    name = "Favourites"
                    component = {FavouritesScreen}
                    options = {{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name = "heart" color={color} size={35}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name = "Home"
                    component = {HomeStack}
                    options = {{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name = "map-marker" color={color} size={35}/>
                        ),
                    }} 
                />
                <Tab.Screen
                    name = "Search"
                    component = {SearchStack}
                    options = {{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name = "magnify" color={color} size={35}/>
                        ),
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};