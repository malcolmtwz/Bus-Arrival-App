
export const handleMarkerPress = (navigation, busStop) => {
    navigation.navigate('BusStopStack', { busStop});
};

export const handleMarkerDoublePress = (busStop) => {
    console.log('Double clicked on bus stop:', busStop);
};

export const handleMarkerClick = (navigation, busStop) => {
    const now = new Date().getTime();
    const delay = 300;
    lastPressTime = this.lastPressTime || 0;
    const timeSinceLastPress = now - lastPressTime;
    if (timeSinceLastPress <= delay) {
        handleMarkerDoublePress(busStop);
    } else {
        handleMarkerPress(navigation,busStop);
    }
    this.lastPressTime = now;
};