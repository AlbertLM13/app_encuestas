import 'react-native-gesture-handler';
import React,{useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Navigation from '../Navigation';

const HomeStack = createNativeStackNavigator();

const NavigationApp = ()=>{
    const{userInfo} =  useContext(AuthContext);

    return (        
        <NavigationContainer independent='true'>
            <HomeStack.Navigator >
                {userInfo.token != null ? (
                    <HomeStack.Screen name="Home" component={Navigation}
                        options={{
                            headerShown:false
                        }}
                    />   
                ):(
                <>
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
                </>
                )}                                                                      
                               
            </HomeStack.Navigator>            
        </NavigationContainer>        
    );
}


export default NavigationApp;