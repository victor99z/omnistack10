import React, { useEffect, useState } from 'react'
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '../../node_modules/@expo/vector-icons'


import api from '../services/api';
import Styles from './Style'

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);

  async function loadDevs() {
    const response = api.get("/search", {
      params: {
        latitude,
        longitude,
        techs: 'Js'
      }
    })
    setDevs(response.data.devs);

  }

  async function handleRegionChanged(region){
    setCurrentRegion(region);
  }

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync(); // permissao para usar a localizacao

      if (granted) {
        const { coords } = await getCurrentPositionAsync({ // pega a localizacao do user
          enableHighAccuracy: true // localizacao via gps.
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04, // zoom no mapa
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition()
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView 
        onRegionChangeComplete={ handleRegionChanged } 
        initialRegion={ currentRegion } 
        style={ Styles.map }
      >
        { devs.map(dev => ( //inicio do map
        <Marker 
          key={ dev._id }
          coordinate={{ 
            longitude: dev.location.coordinates[0],
            latitude: dev.location.coordinates[1]
          }}
        >
          <Image style={ Styles.avatar } source={{ uri: dev.avatar_url }} />
          <Callout onPress={() => {
            // navegacao
            navigation.navigate('Profile', { github_username: dev.github_username })
          }}>
            <View style={ Styles.callout }>
              <Text style={ Styles.devName }>{dev.name}</Text>
              <Text style={ Styles.devBio }>{dev.bio}</Text>
              <Text style={ Styles.devTechs }>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
        ))}
      </MapView>
      <View style={ Styles.searchForm }>
        <TextInput 
          style={ Styles.searchInput }  
          placeholder="Search devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={ false }
        />
        <TouchableOpacity onPress={ loadDevs } style={ Styles.loadButton }>
          <MaterialIcons name="my-location" size={20} color="#FFF"/>
        </TouchableOpacity>
      </View>
    </>
  )
}


export default Main;