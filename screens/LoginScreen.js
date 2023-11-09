import React, { useContext, useState } from "react";
import { View,Text,TextInput, Button, TouchableOpacity,StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";



const LoginScreen =({navigation}) =>{    
            

    // const {userInfo} =  useContext(AuthContext);
    const[email,setEmail] = useState(null); 
    const[password,setPassword] = useState(null);
    const{isLoading,login,userInfo,createObjectUser} =  useContext(AuthContext);

    return (
        
        <SafeAreaView style={{flex:1}}>

            <View style={styles.container}>
                <Spinner visible={isLoading} />
                <View style={styles.wrapper}>
                
                    <TextInput 
                        style={styles.input} 
                        value={email}
                        placeholder="Ingrese Correo"   
                        onChangeText={text=>setEmail(text)}
                    />

                    <TextInput 
                        style={styles.input} 
                        value={password}
                        placeholder="Ingrese contraseña" 
                        onChangeText={text=>setPassword(text)}
                        secureTextEntry                
                    />
                
                <TouchableOpacity                                

                    onPress={() => {
                                               
                        login(email,password);                    
                        
                    }}

                    style={{
                        backgroundColor:"orange",
                        padding:10,                        
                        width:"50%",
                        alignSelf:"center",
                        borderRadius:10,
                    }}
                    >
                    <Text
                        style={{
                        fontSize:18,
                        textAlign:"center",
                        color:"white",
                        }}  
                    >
                        Ingresar
                    </Text>
                </TouchableOpacity>

                    <View style={{flexDirection:'row',marginTop:20,justifyContent:'center'}}>
                        <Text>¿No estas registrado? </Text>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('Register')}
                        >
                            <Text 
                                style={styles.link}
                            > 
                            Registrate aqui
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default LoginScreen;



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    wrapper:{
        width:'80%',
    },
    input:{
        marginBottom:12,
        borderWidth:1,
        borderColor:'#bbb',
        borderRadius:5,
        paddingHorizontal:14,
        height:40
    },
    link:{
        color:'blue',                
    }
});