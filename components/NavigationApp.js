import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/SettingsScreen";
import StackScreen from "../screens/StackScreen";
import Drawer1 from "../screens/DrawerScreen";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DrawerNavigate = createDrawerNavigator();

const NavigationApp = ()=>{
    return (
        <SafeAreaView style={{flex:1}}>
            <NavigationContainer>
                <HomeStack.Navigator>

                    <HomeStack.Screen 
                        name="Login" 
                        component={LoginScreen}
                        options={{
                            headerShown:false
                        }}
                    />
                
                    <HomeStack.Screen 
                        name="Register" 
                        component={RegisterScreen}
                        options={{
                            headerShown:false
                        }}
                    />
                
                    <HomeStack.Screen name="Home" component={HomeScreen}/>                
                </HomeStack.Navigator>            
            </NavigationContainer>
        </SafeAreaView>
    );
}


export default NavigationApp;