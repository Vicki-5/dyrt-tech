import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import CampgroundScreen from '../CampgroundScreen';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {campgroundURL} from '../../constants';

const Stack = createNativeStackNavigator<HomeParamList>();

export const getCampgroundList = async (
  lat: number,
  lon: number,
): Promise<Campground[]> => {
  const [response] = await Promise.all([
    axios.get(
      campgroundURL + `?lat=${lat}&lon=${lon}`,
    ),
  ]);
  return response.data.map((item: AutocompleteCampground) => ({
    id: item.id.toString(), // Convert id to string as Campground's id is string type
    type: item.type, // Assuming type is the same for both AutocompleteCampground and Campground
    links: {self: ''}, // Assuming links are not relevant
    attributes: {
      coordinates: {
        type: 'Point',
        coordinates: [item.coordinates.lon, item.coordinates.lat],
      },
      latitude: item.coordinates.lat,
      longitude: item.coordinates.lon,
      name: item.name,
      'photo-url': item.photoUrl,
      region: item.region,
      'region-name': item.region_name,
      slug: item.slug,
      'photos-count': item.photos_count,
      'videos-count': item.videos_count,
      'reviews-count': item.reviews_count,
    },
    relationships: {},
  }));
};

const HomeScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<HomeParamList>>();

  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

  const handlePressCampground = (item: Campground) => {
    navigate('CampgroundDetails', {campgroundId: item.id});
  };

  const handleDisplayNearbyLocations = () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);
        getCampgroundList(
          position.coords.latitude,
          position.coords.longitude,
        ).then(data => setCampgrounds(data));
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

        <FlatList
          data={campgrounds}
          renderItem={({item}) => (
            <Text onPress={() => handlePressCampground(item)}>
              {item.attributes.name}
            </Text>
          )}
        />
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
