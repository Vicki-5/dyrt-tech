import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CampgroundScreen from '../CampgroundScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

const Stack = createNativeStackNavigator<SearchParamList>();

export const getAutocomplete = async (query: string): Promise<Campground[]> => {
  const response = await axios.get(
    `https://staging.thedyrt.com/api/v6/autocomplete/campgrounds?q=${encodeURIComponent(
      query,
    )}`,
  );
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

const SearchScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CampgroundDetails"
        component={CampgroundScreen}
        options={{headerTitle: 'Campground Details'}}
      />
    </Stack.Navigator>
  );
};

const SearchScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<SearchParamList>>();

  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

  const handleSearch = (text: string) => {
    getAutocomplete(text).then(data => setCampgrounds(data));
  };

  const handlePressCampground = (item: Campground) => {
    navigate('CampgroundDetails', {campgroundId: item.id});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a campground"
        onChangeText={handleSearch}
      />
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          flex: 1,
          margin: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{margin: 12}}>
          <Text>Display Search Results Here</Text>
        </Text>

        <FlatList
          data={campgrounds}
          renderItem={({item}) => (
            <Text
              style={styles.itemName}
              onPress={() => handlePressCampground(item)}>
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
    paddingTop: 50,
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemLocation: {
    fontSize: 16,
  },
});

export default SearchScreenStack;
