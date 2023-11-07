import React, { useContext, useState } from "react";
import { View,Text,TextInput, Button, TouchableOpacity,StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";


const LoginScreen =({navigation}) =>{

    const[email,setEmail] = useState(null);
    const[password,setPassword] = useState(null);
    const val = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text>{val}</Text>
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

                style={{
                    backgroundColor:"orange",
                    padding:10,
                    // marginTop:"20%",
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

                <View style={{flexDirection:'row',marginTop:20}}>
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
        color:'blue'
    }
});