import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const[userInfo,setUserInfo] = useState({});
    const[isLoading,setIsLoading] = useState(false);

    const register = (name,email,password) =>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/Register`,{
            name,email,password
        }).then(res=>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e=>{
            console.log(`Register error ${e}`);
            setIsLoading(false);
        });
    };

    const login = (email,password) =>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/auth/login`,{
            email,
            password,
        }).then(res =>{
            let userInfo = res.data;            
            setUserInfo(userInfo);    
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));                    
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e =>{
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    };

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                register,
                login
            }} 
        >
            {children}
        </AuthContext.Provider>
    );
}