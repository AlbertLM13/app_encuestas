import 'react-native-gesture-handler';
import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Screens
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/SettingsScreen";
import StackScreen from "./screens/StackScreen";
import Drawer1 from "./screens/DrawerScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DrawerNavigate = createDrawerNavigator();


function MyDrawer(){
    const{userInfo} =  useContext(AuthContext);
    return (        
    <DrawerNavigate.Navigator 
        screenOptions={{
            title:'',
            drawerActiveTintColor:'#bc955c',                        
        }}
        tabBarActiveTintColor='black'        
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

function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName="Home"
            
            screenOptions={{
                tabBarActiveTintColor:'#c9aa7c',
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

export default function Navigation(){
    return(
        // <NavigationContainer independent='true' >
            <MyDrawer />
        // </NavigationContainer>
    );
}