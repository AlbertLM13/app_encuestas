import 'react-native-gesture-handler';
import React,{useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
    createDrawerNavigator, 
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Drawer1 from "../screens/DrawerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StackScreen from "../screens/StackScreen";
import HomeScreen from "../screens/home";



const HomeStackMain = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DrawerNavigate = createDrawerNavigator();


function Main(){
           
    return (                 
        
        <HomeStackMain.Navigator 
            initialRouteName='Login'
        >
            <HomeStackMain.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    headerShown:false,
                    
                }}
            />
        
            <HomeStackMain.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{
                    headerShown:false
                }}
            />                                                                                                                
        </HomeStackMain.Navigator>                            
        
    );
}

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
    <DrawerNavigate.Navigator 
        screenOptions={{
            title:'',
            drawerActiveTintColor:'orange',                                  
        }}       
        tabBarActiveTintColor='black'        
        
        drawerContent={props => <CustomDrawerContent {...props}/>}

    >   
        <DrawerNavigate.Screen 
            name="TabHome" component={MyTabs} 
            options={{
                title:'Inicio',
                
            }}        
        />
        <DrawerNavigate.Screen 
            name="Drawer" component={Drawer1} 
            options={{
                title:'drawer1'
            }}        
        />               

    </DrawerNavigate.Navigator>
    );
}

function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName="Home"
            
            screenOptions={{
                tabBarActiveTintColor:'purple',
                headerShown:false
                
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack}
                options={{
                    tabBarLabel:'Inicio',
                    tabBarIcon:({color,size}) =>(
                        <MaterialCommunityIcons name="home" size={30} color={color} />
                    ),
                    // tabBarBadge:10,
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                    tabBarLabel:'Settings',
                    tabBarIcon:({color,size}) =>(
                        <Ionicons name="settings" size={30} color={color}  />
                    )
                }}
            />            
        </Tab.Navigator>
    );
}

function MyStack(){
    return (
        <HomeStack.Navigator
            initialRouteName="HomeScreen"            
        >
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}        
                options={{
                    headerShown:false
                }}        
            />
             <HomeStack.Screen
                name="Stack"
                component={StackScreen}
                
                options={{
                    headerBackTitle:"Regresar",
                    title:'Titulo'    
                }}
                
            />
        </HomeStack.Navigator>
    );
}

export default function NavigationApp(){

    const {userInfo} =  useContext(AuthContext); 

    return(
        <NavigationContainer  >        
            { userInfo.token ? <MyDrawer/> : <Main /> }
        </NavigationContainer>
    );
}



