import React,{ useEffect,useContext, useState } from "react";
// import { View ,FlatList, Text, StyleSheet,Image } from "react-native";
import { View, FlatList,Text ,StyleSheet, TouchableOpacity,Alert,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {Callout, Marker,Polygon } from 'react-native-maps'
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { BASE_URL_IMAGE } from "../config";
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [origen,setOrigen] = React.useState({
    latitude:23.74174,
    longitud:-99.14599
});

const[markers,setMarkers] = useState([]);
const[coordenates,seCoordenates] = useState([]);
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

// MODAL
const [visible, setVisible] = React.useState(false);

const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const [Detalle,setDetalle] = useState({});
const containerStyle = {backgroundColor: 'white', padding: 20};
// MODAL

useEffect(()=>{

  setIsLoading(true);
  AsyncStorage.getItem('marcadores').then((value) => {
    if (value) {            
        var obj = JSON.parse(value);    
        setMarkers(obj);                
        setIsLoading(false);                  
    }else{
      setIsLoading(false);                  
      GetMarkers();      
    }
  });

  setIsLoading(true);
  AsyncStorage.getItem('coordenadas').then((value) => {
    if (value) {            
        var obj = JSON.parse(value);    
        seCoordenates(obj);                
        setIsLoading(false);                  
    }else{
      setIsLoading(false);                  
      GetCoordenates();      
    }
  });

  

},[]);

async function GetMarkers(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetMarkers`,{
        
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);  
      setMarkers(res.data);  
      AsyncStorage.setItem('marcadores',JSON.stringify(res.data));                                            
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
}

async function GetCoordenates(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetCoordenates`,{
        
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);   
      seCoordenates(res.data);        
      AsyncStorage.setItem('coordenadas',JSON.stringify(res.data));                                                    
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
}

return (
  <PaperProvider>
    <View style={styles.container}>

      <SafeAreaView  style={{backgroundColor:"#97C18D"}}>       
        <View style={{justifyContent:'center',flexDirection:'row'}}>
          <Image 
              source={require('../assets/Logo.png')}
              style={{width:100,height:50}}
          />   
        </View>
      </SafeAreaView>
      <Spinner visible={isLoading}/>
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
        showsUserLocation={true}
        showsMyLocationButton={true}   
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
            // onPress={() =>console.log('Clicked')}        
          >
            
          <Image             
            source={markersObject[parseInt(marker.IdEstatus)]}             
            style={{height: 40, width:25 }} 
          />                   

          <Callout          
            width={250}
            onPress={
              ()=>{
                showModal();
                setDetalle(marker);
              }
            }
          >
            <View style={{alignItems:'center'}}>

              <Text style={{fontSize:20,marginBottom:8}}>
                {marker.TipoProblema}
              </Text>
              <Text style={{fontSize:15,marginBottom:8}}>
                {marker.Descripcion}
              </Text>
              <Text style={{fontSize:15,marginBottom:8,textAlign:'center',color:'blue'}}>
                Detalles
              </Text>
              
            </View>
            
          </Callout>


          </Marker>
        ))}

        {coordenates.length > 0 ? <Polygon
          coordinates={
            coordenates
          }
          strokeWidth={1}        // The width of the outline of the shape
          strokeColor='#3FA72E'  // Color of the outline
          fillColor='rgba(135,231,119,0.5)'  // Shape color
          
        />:<></>}
        
      </MapView>
    </View>
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} style={{marginStart:10,marginEnd:10}} contentContainerStyle={containerStyle}>
        <Text
          style={{
            textAlign:'left',
            fontSize:25,
            color:'purple',
            marginBottom:10
          }}
        >{Detalle.CategoriaProblema}</Text>
        <Text
          style={{
            textAlign:'left',
            fontSize:18,            
            marginBottom:10
          }}
        >Fecha: {Detalle.FechaReporte}</Text>

        <View flexDirection="row" style={{marginBottom:10}}>

          <Text
            style={{
              textAlign:'left',
              fontSize:15,            
              marginEnd:10,
              color:'blue'
            }}
          >{Detalle.Estatus}</Text>

          <Text
            style={{
              textAlign:'left',
              fontSize:15,            
              marginEnd:10
            }}
          >Prioridad: {Detalle.Prioridad}</Text>

          <Text
            style={{
              textAlign:'left',
              fontSize:15,            
              marginEnd:10
            }}
          >Cobertura: {parseInt(Detalle.Cobertura)== 0 ? 'Individual' : 'Comunitaria'}</Text>

        </View>
        
        <View alignItems="center" style={{marginBottom:10}}>
          <Image
            source={{ uri: BASE_URL_IMAGE+Detalle.RutaArchivo}} width={300} height={200} 
          />
        </View>

        <Text
          style={{
            textAlign:'left',
            fontSize:18,
            color:'blue',
            marginBottom:10
          }}
        >{Detalle.TipoProblema}</Text>

        <Text
          style={{
            textAlign:'left',
            fontSize:18,            
          }}
        >{Detalle.Descripcion}</Text>

      </Modal>
    </Portal>
    </PaperProvider>
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