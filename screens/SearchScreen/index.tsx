import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CampgroundScreen from '../CampgroundScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

const Stack = createNativeStackNavigator<SearchParamList>();

export const getAutocomplete = async (
  query: string,
): Promise<AutocompleteCampground[]> => {
  const response = await axios.get(
    `https://staging.thedyrt.com/api/v6/autocomplete/campgrounds?q=${encodeURIComponent(
      query,
    )}`,
  );
  return response.data;
};

const SearchScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
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
            <Text style={styles.itemName} onPress={handlePressCampground(item)}>
              {item.name}
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
