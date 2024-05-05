import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const handleDisplayNearbyLocations = () => {
    //TODO: Implement logic to display nearby locations using the following Geolocation API
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);
      },
      error => {
        console.error(error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to the Dirt</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>Campgrounds Near You</Text>
      <Button
        title="Show me locations Nearby"
        onPress={handleDisplayNearbyLocations}
      />
      <View
        style={{
          height: 300,
          width: '100%',
          borderColor: 'black',
          borderWidth: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Display Nearby Locations Here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  divider: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
  },
  card: {
    height: 300,
    width: 250,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default HomeScreen;
