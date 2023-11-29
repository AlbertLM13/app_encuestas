import React,{ useEffect,useContext, useState, useRef } from "react";
import { View, FlatList,Text ,StyleSheet, TouchableOpacity,Alert,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button ,Banner ,FAB, Portal,Modal, PaperProvider  } from 'react-native-paper';
import CardReporte from "../components/TarjetaReporte";
import axios from "axios";
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";
import MapView, {Callout, Marker,Polygon } from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import {Dialog} from '@react-native-material/core';

const HomeScreen = () => {

  const[reportes,setReportes] = useState([]);
  const{userInfo} =  useContext(AuthContext);  
  const[isLoading,setIsLoading] = useState(false);  
  const[selectedId, setSelectedId] = useState([23.74174,-99.14599]);  
  
  const navigation  =useNavigation();

  // MODAL
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [Detalle,setDetalle] = useState({}); 
  const containerStyle = {backgroundColor: 'white', padding: 20};
// MODAL

  const[isFetching,setIsFetching] = useState(false);

  function onRefresh(){
    setIsFetching(true);
    GetReportes();
  }

  useEffect(()=>{    
 
    AsyncStorage.getItem('reportes').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);    
        setReportes(obj);           
        setIsLoading(false);                 
      }else{
        GetReportes();
      }
    });

    
  },[]);

  async function GetReportes(){            
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/CargarRerportes`,{
               
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setReportes(res.data); 
        AsyncStorage.setItem('reportes',JSON.stringify(res.data));    
        setIsFetching(false);       
    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
        setIsFetching(false);       
    });
  } 

  return (    
    
    <PaperProvider>
      <View style={{flex:1}}>
      
        <SafeAreaView  style={{backgroundColor:"#C699D8"}}>       
          <View style={{justifyContent:'center',flexDirection:'row'}}>
            <Image 
                source={require('../assets/Logo.png')}
                style={{width:100,height:50}}
            />   
          </View>
        </SafeAreaView>

        <Spinner visible={isLoading} />
                        
        <View style={{backgroundColor: '#edeeee',flex:1}}>         
          <FlatList
            style={{flex:1}}                        
            data={reportes}            
            keyExtractor={item => item.IdProblema}
            renderItem={({item})=>(
              <CardReporte 
                {...item} 
                showModal={showModal}    
                setSelectedId={setSelectedId}             
              />            
            )}
            onRefresh={onRefresh}
            refreshing={isFetching}
          />                    
                      
          
        </View>
        
        <FAB
          icon="flag"
          color="red"
          label="Reportar"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => navigation.navigate('Reportar')}
        />       
      </View>
      

      <Portal>
        <Modal 
          visible={visible} 
          onDismiss={hideModal} 
          style={{
            marginStart:10,
            marginEnd:10,
            marginTop:200,
            marginBottom:100
          }} 
          contentContainerStyle={containerStyle}
        >     
            <MapView 
              
              style={{                
                width:'100%',
                height:'100%'
              }}          

              minZoomLevel={15}

              initialRegion={{
                latitude : selectedId[0],
                longitude: selectedId[1],
                latitudeDelta:0.09,
                longitudeDelta:0.04
              }}      

            >        
              
              <Marker 
                coordinate={{
                  latitude : selectedId[0],
                  longitude: selectedId[1]
                }}                                 
              >

                <Image             
                  source={require('../assets/mapas/marker-icon-2x-blue.png')}             
                  style={{height: 40, width:25 }} 
                /> 

              </Marker>

            </MapView>                           

        </Modal>
      </Portal>

       
    </PaperProvider>
  );
};



export default HomeScreen;
