import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput} from 'react-native'
import MapView, { Marker, Callout} from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import api from '../services/api';


function Main({ navigation }){
    const [currentRegion, setCurrentRegion] = useState(null);

    async function loadDevs(){
        const response = api.get("/search",{
            params: {
                latitude,
                longitude,
                techs
            }
        })
    }

    // TODO: terminar barra de nav. no maps
    // TODO: fazer load dos usuarios proximos
    // TODO: fazer layout do textinput para pesquisa por techs.

    useEffect( () => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync(); // permissao para usar a localizacao

            if(granted){
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

    if(!currentRegion){
        return null;
    }

    return (
        <MapView initialRegion={ currentRegion } style={ Styles.map }>
            <Marker coordinate={ { latitude: -26.3518996, longitude: -48.8191374 } }>
                <Image style={ Styles.avatar } source={ {uri: 'https://avatars2.githubusercontent.com/u/2254731?v=4'} } />
                <Callout onPress={ () => {
                    // navegacao
                    navigation.navigate('Profile', { github_username : 'diego3g' })
                } }>
                    <View style={ Styles.callout }>
                        <Text  style={ Styles.devName }>Victor Bernardes</Text>
                        <Text style={ Styles.devBio }>FULL FODASE isso ae asdasdadad a.</Text>
                        <Text style={ Styles.devTechs }>Java, Js, ReactJs, React Native</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const Styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#fff"
    },
    callout:{
        width: 260,
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio:{
        color: '#666',
        marginTop: 5
    },
    devTechs:{
        marginTop: 0
    }
})

export default Main;