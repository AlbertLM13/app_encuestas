import React, { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "../config";
import { Button ,PaperProvider} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';

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
    // <View style={{flex:1}}>       
    <PaperProvider>
      <ScrollView>
        <Spinner visible={isLoading}/>
        <View style={{
          flex:1
        }}>    
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
            color:'blue',
            marginBottom:'5%'
          }}
          >
            {replaceBetween(0 ,index - 5,'********')}
          </Text>

          <Button 
              onPress={()=>{GetColonias(cp)}}
              buttonColor="orange" 
              style={{
                width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="email" 
              mode="contained">Cambiar correo</Button>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Celular:
          </Text>

          <Text
          style={{
            textAlign:'center',
            color:'blue',
            marginBottom:'5%'
          }}
          >
            {telefono.replace(/(.{0}).{7}/,"*******")}
          </Text>

          <Button 
              onPress={()=>{GetColonias(cp)}}
              buttonColor="orange" 
              style={{
                width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="phone" 
              mode="contained">Cambiar celular</Button>

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
            color:'blue',
            marginBottom:'5%'
          }}
          >
            *********
          </Text>

          <Button 
              onPress={()=>{GetColonias(cp)}}
              buttonColor="orange" 
              style={{
                // width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="key" 
              mode="contained">Cambiar contraseña</Button>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Cancelar Cuenta
          </Text>
          <Text style={{
            fontSize:11,
            textAlign:'center',            
            marginBottom:'5%'
          }}>
          Si cancelas tu cuenta, esta sera eliminada y no podras crear o ver los reportes
          </Text>

          <Button 
              onPress={()=>{GetColonias(cp)}}
              buttonColor="red" 
              style={{
                // width:'60%',              
                alignSelf:'center'
              }} 
              icon="" 
              mode="contained"><Entypo name="warning" size={20} color="white" />   Cancelar cuenta   <Entypo name="warning" size={20} color="white" /></Button>

        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default MiCuenta;
