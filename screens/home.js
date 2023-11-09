import React,{ useEffect,useContext } from "react";
import { View, Text ,StyleSheet, TouchableOpacity,Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
import {BackHandler} from "react-native"
import { AuthContext } from "../context/AuthContext";


// import {Dialog} from '@react-native-material/core';



const HomeScreen = () => {

  const{userInfo,logout} =  useContext(AuthContext);
  const navigation = useNavigation() ;

  useEffect(() => {
    const callback = ()=> {
      Alert.alert(
        'Cerrar sesion',
        '¿Desa cerrar sesion?',
        [
          { text: "Cancelar", style: 'cancel', onPress: () => {} },
          {
            text: 'Salir',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            
            onPress: () => {
              logout();              
            }//navigation.dispatch(e.data.action),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      callback
    );

    return () => backHandler.remove();
}, []);


  return (

    // <SafeAreaView style={{flex:1}}>
      <View style={{backgroundColor: '#edeeee',flex:1}}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          Home Screen
        </Text>
        <TouchableOpacity

          onPress={()=>navigation.navigate("Stack")}

          style={{
            backgroundColor:"#bc955c",
            padding:10,
            marginTop:"20%",
            width:"50%",
            alignSelf:"center",
            borderRadius:10,
          }}
        >
          <Text
            style={{
              fontSize:15,
              textAlign:"center",
              color:"white",
            }}  
          >
            Go to Stack Screen
          </Text>
        </TouchableOpacity>
      </View>
    // </SafeAreaView>
  );
};

export default HomeScreen;
