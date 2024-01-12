import React from "react";
import { View, Text, StyleSheet,Image ,Platform} from "react-native";
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import MiCuenta from "./MiCuenta";
import StackScreen from "./StackScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import MisReportes from "./MisReportes";


import MisDatos from "./MisDatos";


const DrawerNavigate = createDrawerNavigator();

function CustomDrawerContent(props) {

  const {logout} =  useContext(AuthContext); 

  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Cerrar Sesión" 
        inactiveTintColor={'red'}
        onPress={() => logout() }     
        drawerPosition={'bottom'}       
      />        
    </DrawerContentScrollView>
  );
}

function MyDrawer(){        

    return (  
      <>
      <SafeAreaView  style={{backgroundColor:"orange"}}>       
        <View style={{justifyContent:'center',flexDirection:'row',height: Platform.OS == 'ios'? '3%' :'auto'}}>
          <Image 
              source={require('../assets/Logo.png')}
              style={{width:100,height:50}}
          />   
        </View>        
      </SafeAreaView>
      
      <DrawerNavigate.Navigator                           
        height={200}
        screenOptions={{          
          drawerPosition:'left',
          drawerActiveTintColor:'orange',              
          drawerInactiveTintColor:'black',          
          drawerType:'front',          
          // headerTitle:'sd'
        }}         
        
        drawerContent={ props => <CustomDrawerContent  {...props} />  }
        
      >   

        <DrawerNavigate.Screen 
            name="MisReportes" component={MisReportes} 
            options={{
                title:'Mis Reportes'
            }}        
        /> 

        <DrawerNavigate.Screen 
            name="MisDatos" component={MisDatos} 
            options={{
                title:'Mis datos',
                
            }}        
        />

        <DrawerNavigate.Screen 
            name="MiCuenta" component={MiCuenta} 
            options={{
                title:'Mi Cuenta'
            }}        
        />                           

      </DrawerNavigate.Navigator>
      </>
    
    );
}

// const Perfil = () => {
//   return (
//     <View>
//       <Text
//         style={{
//           fontSize: 30,
//           textAlign: "center",
//           marginTop: "20%",
//         }}
//       >
//         Perfil
//       </Text>
//     </View>
//   );
// };

export default MyDrawer;
