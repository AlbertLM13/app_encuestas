import React,{ useEffect,useContext, useState } from "react";
// import { View ,FlatList, Text, StyleSheet,Image } from "react-native";
import { View, FlatList,Text ,StyleSheet, TouchableOpacity,Alert,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {Callout, Marker,Polyline } from 'react-native-maps'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { Button } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";

export default function App() {
  const [origen,setOrigen] = React.useState({
    latitude:23.743710,
    longitud:-99.143365
});

const[markers,setMarkers] = useState([]);
const{userInfo} =  useContext(AuthContext);  
const[isLoading,setIsLoading] = useState(false);  
const markersObject = [
  null,
  require('../assets/mapas/marker-icon-2x-red.png'),
  require('../assets/mapas/marker-icon-2x-orange.png'),
  null,
  require('../assets/mapas/marker-icon-2x-yellow.png'),
  require('../assets/mapas/marker-icon-2x-gold.png'),
  require('../assets/mapas/marker-icon-2x-green.png'),
];

useEffect(()=>{
  GetMarkers();
},[]);

async function GetMarkers(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetMarkers`,{
        
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);  
      setMarkers(res.data);                                           
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
}

return (
    
    <View style={styles.container}>

      <SafeAreaView  style={{backgroundColor:"#97C18D"}}>       
        <View style={{justifyContent:'center',flexDirection:'row'}}>
          <Image 
              source={require('../assets/Logo.png')}
              style={{width:100,height:50}}
          />   
        </View>
      </SafeAreaView>
      <Spinner/>
      <View>

      </View>

      <MapView 
        style={styles.map}
        initialRegion={{
          latitude : origen.latitude,
          longitude: origen.longitud,
          latitudeDelta:0.09,
          longitudeDelta:0.04
        }}            
        // showsUserLocation={true}
        // showsMyLocationButton={true}   
      >
          
        {markers.map(marker => (
          <Marker 
            coordinate={{
              longitude: parseFloat(marker.Longitud),
              latitude: parseFloat(marker.Latitud)
            }}
            title={marker.TipoProblema}
            description={marker.Descripcion}
            key={marker.IdProblema}            
          >
            
          <Image             
            source={markersObject[parseInt(marker.IdEstatus)]}             
            style={{height: 40, width:25 }} 
          />                   

          <Callout>
            <View >
              <Text>text</Text>
              <Button  onPress={() => console.log('Clicked')} ></Button>
            </View>
          </Callout>


          </Marker>
        ))}       
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});