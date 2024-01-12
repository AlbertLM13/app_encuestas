import React, { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "../config";
import { Button } from "react-native-paper";

const MiCuenta = () => {

  const{userInfo} =  useContext(AuthContext);  

  const [isLoading,setIsLoading] = useState(false);
  const [correo,setCorreo] = useState(null);
  const [telefono,setTelefono] = useState(null);
  const [index,setIndex] = useState(0);
  const [misDatosCuenta,setMisDatosCuenta] = useState([]);


  useEffect(()=>{         
    
    setIsLoading(true);   
    
    AsyncStorage.getItem('DatosCuenta').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);    
        setMisDatosCuenta(obj);                          
        
        console.log(obj['email'].indexOf("@"));

        setCorreo(obj['email']);
        setIndex(obj['email'].indexOf("@"));
        setTelefono(obj['celular']);

        setIsLoading(false);                  
      }else{
        setIsLoading(false);                          
        GetMisDatos();                     
      }
    });          
          
  },[]);

  async function GetMisDatos(){
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/GetDatosCuenta`,{
        //  'IdCategoria':value
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setMisDatosCuenta(res.data);        
        AsyncStorage.setItem('DatosCuenta',JSON.stringify(res.data));                 

        console.log(res.data['email']);

        setCorreo(res.data['email']);
        setIndex(correo.indexOf("@"));
        setTelefono(res.data['celular']);

    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
  } 

  function replaceBetween(start,end,text){

    if(correo != null){      

      return ''.substring(0, start) + text + correo.substring(end);
    }else{
      return '';
    }

  }

  return (
    <View style={{flex:1}}>       
        <Spinner visible={isLoading}/>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Correo:
        </Text>

        <Text
        style={{
          textAlign:'center',
          color:'blue'
        }}
        >
          {replaceBetween(0 ,index - 5,'********')}
        </Text>

        

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Telefono:
        </Text>

        <Text
        style={{
          textAlign:'center',
          color:'blue'
        }}
        >
          {telefono.replace(/(.{0}).{7}/,"*******")}
        </Text>

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Contraseña:
        </Text>

        <Text
        style={{
          textAlign:'center',
          color:'blue'
        }}
        >
          *********
        </Text>

    </View>
  );
};

export default MiCuenta;
