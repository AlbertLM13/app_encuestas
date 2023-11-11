import React,{ useEffect,useContext, useState } from "react";
import { View, Text ,StyleSheet, TouchableOpacity,Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-paper';
import CardReporte from "../components/TarjetaReporte";
import axios from "axios";
import { BASE_URL } from "../config";


// import {Dialog} from '@react-native-material/core';

const HomeScreen = () => {

  const [reportes,setReportes] = useState([]);
  const{userInfo,logout} =  useContext(AuthContext);
  const navigation = useNavigation() ;
  const IdUsuario = userInfo.IdUsuario;
  const[isLoading,setIsLoading] = useState(false);  

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
        console.log(res.data);
    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
  }

  

  return (
    
    <SafeAreaView style={{flex:1,backgroundColor:'#DEB3DF'}}>

      <View  style={{backgroundColor:'#edeeee', flexDirection: 'row',justifyContent:'center'}}>

        <Button 
          style={{
            marginTop:5, 
            marginBottom:5,   
            marginEnd:5        
          }}
          textColor="green"
          buttonColor="#B3D1AC"
          icon="clipboard-check" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Solucionados
        </Button>

        <Button 
          style={{
            marginTop:5,  
            marginBottom:5,
            marginEnd:5     
          }}
          textColor="red"
          buttonColor="#FFB3B3"
          icon="clipboard-list" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Pendientes
        </Button>                 

        <Button 
          style={{
            marginTop:5,  
            marginBottom:5,
            marginEnd:5     
          }}
          textColor="#E3E3E3"
          buttonColor="#9E9E9E"
          icon="trash-can" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Basura
        </Button>      


      </View>

      <View  style={{backgroundColor:'#edeeee', flexDirection: 'row',justifyContent:'center'}}>

        <Button 
          style={{
            marginTop:5, 
            marginBottom:5,   
            marginEnd:5        
          }}
          textColor="#6E5F48"
          buttonColor="#C5B8A2"
          icon="highway" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Pavimentación
        </Button>

        <Button 
          style={{
            marginTop:5,  
            marginBottom:5,
            marginEnd:5     
          }}
          textColor="#CB8B0D"
          buttonColor="#FFDD99"
          icon="lightbulb" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Alumbrado
        </Button>

        <Button 
          style={{
            marginTop:5,  
            marginBottom:5,
            maxWidth:500          
          }}
          textColor="blue"
          buttonColor="#B3E5FF"
          icon="water" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Agua
        </Button>    


      </View>

      <View  style={{backgroundColor:'#edeeee', flexDirection: 'row',justifyContent:'center'}}>

        <Button 
          style={{
            marginTop:5, 
            marginBottom:5,   
            marginEnd:5        
          }}
          textColor="#769852"
          buttonColor="#C6F198"
          icon="pine-tree" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Parques
        </Button>

        <Button 
          style={{
            marginTop:5,  
            marginBottom:5,
            maxWidth:500          
          }}
          textColor="#E3E3E3"
          buttonColor="#666666"
          icon="bus" 
          mode="elevated" 
          onPress={() => console.log('Pressed')}
          >
            Transporte
        </Button>   

              

      </View>

      <View style={{backgroundColor: '#edeeee',flex:1}}>         

        <CardReporte />
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
