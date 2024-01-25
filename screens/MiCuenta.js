import React, { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "../config";
import { Button ,PaperProvider,Portal,Modal,HelperText,TextInput} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';



const MiCuenta = () => {

  const{userInfo} =  useContext(AuthContext);  

  const [isLoading,setIsLoading] = useState(false);
  const [correo,setCorreo] = useState(null);
  const [telefono,setTelefono] = useState('');
  const [index,setIndex] = useState(0);
  const [misDatosCuenta,setMisDatosCuenta] = useState([]);

  const containerStyle = {backgroundColor: 'white', padding: 10,marginStart:7,marginEnd:7};

  useEffect(()=>{         
    
    setIsLoading(true);   
    
    AsyncStorage.getItem('DatosCuenta').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);    
        setMisDatosCuenta(obj);                                          

        setCorreo(obj['email']);
        setIndex(obj['email'].indexOf("@"));
        setTelefono(obj['celular']);

        setIsLoading(false);                  
      }else{
        setIsLoading(false);                          
        GetMisDatos();                     
      }
    });          
          
  },[]);

  async function GetMisDatos(){
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/GetDatosCuenta`,{
        //  'IdCategoria':value
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setMisDatosCuenta(res.data);        
        AsyncStorage.setItem('DatosCuenta',JSON.stringify(res.data));                 

        console.log(res.data['email']);

        setCorreo(res.data['email']);
        setIndex(correo.indexOf("@"));
        setTelefono(res.data['celular']);

    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
  } 

  function replaceBetween(start,end,text){

    if(correo != null){            
      return ''.substring(0, start) + text + correo.substring(end);
    }else{      
      return '';
    }

  }

  const [visibleCorreo, setVisibleCorreo] = useState(false);  
  const showModalCorreo = () => setVisibleCorreo(true);
  const hideModalCorreo = () => setVisibleCorreo(false);

  const [Cambiarcorreo,setCambiarCorreo] = useState(null);
  const [NuevoCorreo,setNuevoCorreo] = useState(null);
  const [ConfirmarCorreo,setConfirmarCorreo] = useState(null);
  
  async function GuardarNuevoCorreo() {

    if(NuevoCorreo === ConfirmarCorreo){

      setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/ActualizarCorreo`,{
          'email_actual':Cambiarcorreo,
          'email_nuevo':NuevoCorreo
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
          setIsLoading(false);  
          hideModalCorreo();
          setCambiarCorreo(null);
          setNuevoCorreo(null);
          setConfirmarCorreo(null);

          GetMisDatos();

      }).catch(e =>{
          console.log(`Error ${e}`);
          setIsLoading(false);
          hideModalCorreo();
          setCambiarCorreo(null);
          setNuevoCorreo(null);
          setConfirmarCorreo(null);
      });
    }

  }

  const [visibleCelular, setVisibleCelular] = useState(false);  
  const showModalCelular = () => setVisibleCelular(true);
  const hideModalCelular = () => setVisibleCelular(false);

  const [CambiarCelular,setCambiarCelular] = useState(null);
  const [NuevoCelular,setCambiarNuevoCelular] = useState(null);
  const [ConfirmarCelular,setConfirmarCelular] = useState(null);

  async function GuardarNuevoCelular() {

    if(NuevoCelular === ConfirmarCelular){

      setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/ActualizarCelular`,{
          'celular_actual':CambiarCelular,
          'celular_nuevo':NuevoCelular
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
          setIsLoading(false);  
          hideModalCelular();
          setCambiarCelular(null);
          setCambiarNuevoCelular(null);
          setConfirmarCelular(null);

          GetMisDatos();

      }).catch(e =>{
          
          setIsLoading(false);
          hideModalCelular();
          setCambiarCelular(null);
          setCambiarNuevoCelular(null);
          setConfirmarCelular(null);
      });
    }

  }

  const [visibleContrasena, setVisibleContrasena] = useState(false);  
  const showModalContrasena = () => setVisibleContrasena(true);
  const hideModalContrasena = () => setVisibleContrasena(false);

  const [CambiarContrasena,setCambiarContrasena] = useState(null);
  const [NuevoContrasena,setCambiarNuevoContra] = useState(null);
  const [ConfirmarContrasena,setConfirmarContrasena] = useState(null);

  async function GuardarNuevaContrasena(){

    if(NuevoContrasena === ConfirmarContrasena){

      setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/ActualizarContrasena`,{
          'password_actual':CambiarContrasena,
          'password_nuevo':NuevoContrasena
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
          setIsLoading(false);  
          hideModalContrasena();
          setCambiarContrasena(null);
          setCambiarNuevoContra(null);
          setConfirmarContrasena(null);

          GetMisDatos();

      }).catch(e =>{
          
          setIsLoading(false);
          hideModalContrasena();
          setCambiarContrasena(null);
          setCambiarNuevoContra(null);
          setConfirmarContrasena(null);
      });
    }

  }

  const [visibleCancelarCuenta, setVisibleCancelarCuenta] = useState(false);  
  const showModalCancelarCuenta = () => setVisibleCancelarCuenta(true);
  const hideModalCancelarCuenta = () => setVisibleCancelarCuenta(false);


  async function CancelarCuenta(){

    setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/CancelarCuenta`,{
          'password_actual_cancelar':CambiarContrasena,          
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
        setIsLoading(false);  
        hideModalCancelarCuenta();

      }).catch(e =>{          
        setIsLoading(false);
        hideModalCancelarCuenta();
       
      });

  }

  return (
    // <View style={{flex:1}}>       
    <PaperProvider>
      <ScrollView>
        <Spinner visible={isLoading}/>
        <View style={{
          flex:1
        }}>    
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Correo:
          </Text>

          <Text
          style={{
            textAlign:'center',
            color:'blue',
            marginBottom:'5%'
          }}
          >
            {replaceBetween(0 ,index - 5,'********')}
          </Text>

          <Button 
              onPress={showModalCorreo}
              buttonColor="orange" 
              style={{
                width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="email" 
              mode="contained">Cambiar correo</Button>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Celular:
          </Text>

          <Text
          style={{
            textAlign:'center',
            color:'blue',
            marginBottom:'5%'
          }}
          >
            {telefono.replace(/(.{0}).{7}/,"*******")}
          </Text>

          <Button 
              onPress={showModalCelular}
              buttonColor="orange" 
              style={{
                width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="phone" 
              mode="contained">Cambiar celular</Button>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Contraseña:
          </Text>

          <Text
          style={{
            textAlign:'center',
            color:'blue',
            marginBottom:'5%'
          }}
          >
            *********
          </Text>

          <Button 
              onPress={showModalContrasena}
              buttonColor="orange" 
              style={{
                // width:'40%',
                // height:'7%',
                alignSelf:'center'
              }} 
              icon="key" 
              mode="contained">Cambiar contraseña</Button>

          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            Cancelar Cuenta
          </Text>
          <Text style={{
            fontSize:11,
            textAlign:'center',            
            marginBottom:'5%'
          }}>
          Si cancelas tu cuenta, esta sera eliminada y no podras crear o ver los reportes
          </Text>

          <Button 
              onPress={showModalCancelarCuenta}
              buttonColor="red" 
              style={{
                // width:'60%',              
                alignSelf:'center'
              }} 
              icon="" 
              mode="contained"><Entypo name="warning" size={20} color="white" />   Cancelar cuenta   <Entypo name="warning" size={20} color="white" /></Button>

        </View>
      </ScrollView>

      
      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleCorreo} 
          onDismiss={ ()=>{
              hideModalCorreo();
              setCambiarCorreo(null);
              setNuevoCorreo(null);
              setConfirmarCorreo(null);
             }                                 
          }
          contentContainerStyle={containerStyle}
        >                    
         
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Correo actual
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarCorreo(text)}  
          value={Cambiarcorreo}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Nuevo Correo
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setNuevoCorreo(text)}  
          value={NuevoCorreo}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Confirmar Correo
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setConfirmarCorreo(text)}  
          value={ConfirmarCorreo}     
        />
        <HelperText style={{fontSize:15,marginBottom:5}} type="error" visible={NuevoCorreo !== ConfirmarCorreo}>
            El correo no coincide
        </HelperText>  

        <Button 
          onPress={GuardarNuevoCorreo}
          buttonColor="green" 
          style={{
            width:'40%',
            // height:'7%',
            alignSelf:'center'
          }} 
          icon="" 
          mode="contained">Guardar</Button>

        </Modal>
      </Portal>


      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleCelular} 
          onDismiss={ ()=>{
              hideModalCelular();
              setCambiarCelular(null);
              setCambiarNuevoCelular(null);
              setConfirmarCelular(null);
             }                                 
          }
          contentContainerStyle={containerStyle}
        >                    
         
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Celular actual
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarCelular(text)}  
          value={CambiarCelular}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Nuevo Celular
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarNuevoCelular(text)}  
          value={NuevoCelular}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Confirmar Celular
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setConfirmarCelular(text)}  
          value={ConfirmarCelular}     
        />
        <HelperText style={{fontSize:15,marginBottom:5}} type="error" visible={NuevoCelular !== ConfirmarCelular}>
            El número no coincide
        </HelperText>  

        <Button 
          onPress={GuardarNuevoCelular}
          buttonColor="green" 
          style={{
            width:'40%',
            // height:'7%',
            alignSelf:'center'
          }} 
          icon="" 
          mode="contained">Guardar</Button>

        </Modal>
      </Portal>

      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleContrasena} 
          onDismiss={ ()=>{
              hideModalContrasena();
              setCambiarContrasena(null);
              setCambiarNuevoContra(null);
              setConfirmarContrasena(null);
             }                                 
          }
          contentContainerStyle={containerStyle}
        >                    
         
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Contraseña actual
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarContrasena(text)}  
          value={CambiarContrasena}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Nueva contraseña
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarNuevoContra(text)}  
          value={NuevoContrasena}     
        />

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Confirmar contraseña
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setConfirmarContrasena(text)}  
          value={ConfirmarContrasena}     
        />
        <HelperText style={{fontSize:15,marginBottom:5}} type="error" visible={CambiarContrasena !== ConfirmarContrasena}>
            La contraseña no coincide
        </HelperText>  

        <Button 
          onPress={GuardarNuevaContrasena}
          buttonColor="green" 
          style={{
            width:'40%',
            // height:'7%',
            alignSelf:'center'
          }} 
          icon="" 
          mode="contained">Guardar</Button>

        </Modal>
      </Portal>

      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleCancelarCuenta} 
          onDismiss={hideModalCancelarCuenta}
          contentContainerStyle={containerStyle}
        >                    
         
        <HelperText style={{fontSize:15,color:'red',marginTop:20,marginBottom:20,alignSelf:'center'}} type="info" visible={true}>
        Si cancelas tu cuenta, esta sera eliminada y no podras crear o ver los reportes
        </HelperText>  
         
        <HelperText style={{fontSize:15,color:'black'}} type="info" visible={true}>
          Contraseña
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCambiarContrasena(text)}  
          value={CambiarContrasena}     
        />

        <Button 
          onPress={CancelarCuenta}
          buttonColor="red" 
          style={{
            width:'40%',
            marginBottom:20,
            alignSelf:'center'
          }} 
          icon="" 
          mode="contained">Confirmar</Button>

        </Modal>
      </Portal>


    </PaperProvider>
  );
};

export default MiCuenta;


const styles = StyleSheet.create({ 
  input:{
    marginBottom:12,
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    paddingHorizontal:14,    
    height:40,
    marginStart:10,
    marginEnd:10,
    // marginTop:10,        
  },

  input2:{
    // marginBottom:12,
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    paddingHorizontal:14,    
    height:40,
    marginStart:10,
    marginEnd:10,
    width:'50%'
    // marginTop:10,        
  },
  
});