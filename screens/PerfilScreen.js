import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import StackScreen from "./StackScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@react-navigation/stack";


const DrawerNavigate = createDrawerNavigator();

function CustomDrawerContent(props) {

  const {logout} =  useContext(AuthContext); 

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Cerrar Sesión" onPress={() => logout() } />
    </DrawerContentScrollView>
  );
}

function MyDrawer(){        

    return (  
      <>
      <SafeAreaView  style={{backgroundColor:"orange"}}>       
          <View style={{justifyContent:'center',flexDirection:'row'}}>
            <Image 
                source={require('../assets/Logo.png')}
                style={{width:100,height:50}}
            />   
          </View>
          
        </SafeAreaView>

      <DrawerNavigate.Navigator           

        screenOptions={{
          title:'',
          drawerPosition:'left',
          drawerActiveTintColor:'orange',              
        }}       
        tabBarActiveTintColor='black'        
        
        drawerContent={ props => <CustomDrawerContent  {...props}/>}

      >   
          <DrawerNavigate.Screen 
              name="StackScreen" component={StackScreen} 
              options={{
                  title:'StackScreen',
                  
              }}        
          />
          <DrawerNavigate.Screen 
              name="StackScreen1" component={StackScreen} 
              options={{
                  title:'StackScreen1'
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
