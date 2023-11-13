import React,{ useEffect,useContext, useState } from "react";
import { View, FlatList,Text ,StyleSheet, TouchableOpacity,Alert,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button ,Banner ,FAB, Portal, PaperProvider  } from 'react-native-paper';
import CardReporte from "../components/TarjetaReporte";
import axios from "axios";
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";


// import {Dialog} from '@react-native-material/core';

const HomeScreen = () => {

  const[reportes,setReportes] = useState([]);
  const{userInfo} =  useContext(AuthContext);  
  const[isLoading,setIsLoading] = useState(false);  

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;


  useEffect(()=>{
    GetReportes();
  },[]);

  async function GetReportes(){
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/CargarRerportes`,{
         
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setReportes(res.data);                                      
    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
  }


  return (
    
    <View style={{flex:1}}>
    
      <SafeAreaView  style={{backgroundColor:"white"}}>       
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
          keyExtractor={reportes => reportes.IdProblema}
          renderItem={({item})=>(
            <CardReporte {...item}/>            
          )}
        >                    
        </FlatList>               
        
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
        onPress={() => console.log('Pressed')}
      />       
    </View>
          
  );
};



export default HomeScreen;
