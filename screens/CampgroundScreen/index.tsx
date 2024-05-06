import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import {campgroundIDURL} from '../../constants';

const CampgroundScreen = ({route}) => {
  const {campgroundId} = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const fetchCampgroundDetails = async () => {
      try {
        const response = await axios.get(`${campgroundIDURL}/${campgroundId}`);
        if (response) {
          setName(response.data.attributes.name);
          setDescription(response.data.attributes.description);
          setLocation(response.data.attributes.location);
          setPhoto(response.data.attributes.photo);
        }
      } catch (error) {
        console.error('Error fetching campground details:', error);
      }
    };

    fetchCampgroundDetails();
  }, [campgroundId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.location}>{location}</Text>
      <Image source={{uri: photo}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
    color: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default CampgroundScreen;
