import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

// Screens
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/SettingsScreen";
import StackScreen from "./screens/StackScreen";
import Drawer1 from "./screens/DrawerScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DrawerNavigate = createDrawerNavigator();

function MyDrawer(){
    return (
    <DrawerNavigate.Navigator>   
        <DrawerNavigate.Screen name="TabHome" component={MyTabs} />
        <DrawerNavigate.Screen name="Drawer" component={Drawer1} />             
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
            />
             <HomeStack.Screen
                name="Stack"
                component={StackScreen}
                options={{
                    headerBackTitle:"Regresar",
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
                tabBarActiveTintColor:'purple'
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack}
                options={{
                    tabBarLabel:'Feed',
                    tabBarIcon:({color,size}) =>(
                        <MaterialCommunityIcons name="home" size={30} color={color} />
                    ),
                    tabBarBadge:10,
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
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
    );
}