import React ,{ useEffect ,useContext, useRef, createRef}from "react";
import { View, StyleSheet,Image ,Text, Platform} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { RadioButton ,Button ,HelperText ,FAB, Portal,Modal, PaperProvider,IconButton, MD3Colors, Icon,Avatar   } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { BASE_URL_IMAGE } from "../config";
import { BASE_URL_IMAGE_PERFIL } from "../config";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";


const MisDatos = () => {

  const{userInfo} =  useContext(AuthContext);  
  const [isLoading,setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const containerStyle = {backgroundColor: 'white', padding: 10};
  const containerStyleSelect = {backgroundColor: 'white', padding: 10,height:100,marginStart:5,marginEnd:5};
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [visibleEstado, setVisibleEstado] = useState(false);  
  const showModalEstado = () => setVisibleEstado(true);
  const hideModalEstado = () => setVisibleEstado(false);

  const [visibleColonia, setVisibleColonia] = useState(false);  
  const showModalColonia = () => setVisibleColonia(true);
  const hideModalColonia = () => setVisibleColonia(false);

  const[curp,setCurp] = useState(null);
  const[nombre,setNombre] = useState(null);
  const[apellidoP,setApellidoP] = useState(null);
  const[apellidoM,setApellidoM] = useState(null);
  const[cp,setCp] = useState(null);
  const[calleP,setCalleP] = useState(null);
  const[entreC1,setEntreC1] = useState(null);
  const[entreC2,setEntreC2] = useState(null);

  DropDownPicker.setLanguage("ES");

  const [openEstado, setOpenEstado] = useState(false);
  const [estado, setEstado] = useState(null);
  const [nombreEstado, setNombreEstado] = useState(null);
  const [estados, setEstados] = useState([]);

  const [openColonia, setOpenColonia] = useState(false);
  const [colonia, setColonia] = useState(null);
  const [nombreColonia, setNombreColonia] = useState(null);
  const [colonias, setColonias] = useState([]);
  
  const[isImageExit,setIsImageExit] = useState(false);

  const[misDatos,setMisDatos] = useState([]);

  useEffect(()=>{         

    setIsLoading(true);
    AsyncStorage.getItem('MisDatos').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);    
        setMisDatos(obj);                  
        GetEstados();
        setValues(obj);
        setIsLoading(false);                  
      }else{
        setIsLoading(false);                          
        GetMisDatos();              
        GetEstados();
      }
    });    
    
    componentWillMount();
          
  },[]);

  async function GetMisDatos(){
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/GetMisDatos`,{
        //  'IdCategoria':value
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setMisDatos(res.data);        
        AsyncStorage.setItem('MisDatos',JSON.stringify(res.data));         
        GetEstados();
        setValues(res.data);
    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
  } 

  async function GetEstados(){

    setIsLoading(true);
    AsyncStorage.getItem('Estados').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);            
        setEstados(obj);
        setIsLoading(false);                  
      }else{
        
        setIsLoading(true);
        axios.post(`${BASE_URL}/reportes/GetEstados`,{
            //  'IdCategoria':value
        },{headers:{
          'Authorization': `Bearer ${userInfo.token}` 
        }}).then(res =>{                
            setIsLoading(false);  
            setEstados(res.data);                
            AsyncStorage.setItem('Estados',JSON.stringify(res.data));             
        }).catch(e =>{
            console.log(`Error ${e}`);
            setIsLoading(false);
        });
        
      }
    });   
    
  } 

  async function GetColonias(codigoPostal){
                                
    setIsLoading(true);
    axios.post(`${BASE_URL}/reportes/GetColonias`,{
        'codigo_postal':codigoPostal
    },{headers:{
      'Authorization': `Bearer ${userInfo.token}` 
    }}).then(res =>{                
        setIsLoading(false);  
        setColonias(res.data);                    
        AsyncStorage.setItem('Estados',JSON.stringify(res.data));             
    }).catch(e =>{
        console.log(`Error ${e}`);
        setIsLoading(false);
    });
                    
  } 

  function setValues(data){
    
    setCurp(data[0]['CURP']);
    setNombre(data[0]['Nombre']);
    setApellidoP(data[0]['Paterno']);
    setApellidoM(data[0]['Materno']);
    let momentObj = moment(data[0]['FechaNacimiento'], 'DD-MM-YYYY')
    setDate(new Date(momentObj));    
    setEstado(data[0]['EstadoNacimiento']);
    setNombreEstado(data[0]['NombreEstado']);
    setCp(data[0]['Codigo_Postal']);
    setNombreColonia(data[0]['NombreColonia']); 
    setCalleP(data[0]['Calle']);
    setEntreC1(data[0]['EntreCalle']);
    setEntreC2(data[0]['YCalle']);
    
    if(cp != null){
      GetColonias(cp);
    }
    

    // console.log(estado);
    // setNombreEstado(estados[data[0]['EstadoNacimiento']]);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    Platform.OS == 'android' ? setShow(false) : null;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {    
    setShow(true);      
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function componentWillMount(){
    
    Image.getSize(BASE_URL_IMAGE_PERFIL+userInfo.userId+'/perfil.jpg', (width, height) => {
        if(width>0){
          setIsImageExit(true);
        }
        else{
          setIsImageExit(false);
        }
    }, () => {
      setIsImageExit(false);
    });
  }
  
  return (
    <PaperProvider>
      <ScrollView>
        <Spinner visible={isLoading}/>

        <View style={{
          flexDirection:'column',
          alignContent:'center',
          alignItems:'center',
          alignSelf:'center',
          marginTop:5
        }}>          

          <Avatar.Image 
            size={150}                
            source={  isImageExit ? { uri: BASE_URL_IMAGE_PERFIL+userInfo.userId+'/perfil.jpg'} : require('../assets/user.png') }             
            style={{              
              borderColor:'blue'              
            }}
            
          />
          
          <IconButton
            style={{
              marginTop:-40,
              marginRight:-90
            }}
            icon="pencil"
            iconColor={'orange'}
            backgroundColor={'#DFDFDF'}
            size={30}
            onPress={() => console.log('Pressed')}
          />

        </View>
        
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Curp
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCurp(text)}  
          value={curp}     
        />    
          

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Nombre(s)
        </HelperText>  
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setNombre(text)}  
          value={nombre}     
        />    
            
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Apellido paterno
        </HelperText>
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setApellidoP(text)}  
          value={apellidoP}     
        />    
        
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Apellido materno
        </HelperText>
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setApellidoM(text)}  
          value={apellidoM}     
        />    
        
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Fecha de nacimiento
        </HelperText>
        <Button           
          onPress={  Platform.OS == 'ios' ? showModal: showDatepicker}
          mode="outlined"          
          textColor="orange"   
          style={{            
            height:40,            
            flexDirection:'row',
            alignContent:'center',
            marginStart:10,
            marginEnd:10,
            borderWidth:1,
            borderColor:'black',
            borderRadius:5,
          }}
        ><Text style={{fontSize:18,width:'80%',height:30,alignSelf:'center'}}>{date.toLocaleString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'})}</Text></Button>          
        
        {show && (
          <>
            <DateTimePicker
              testID="dateTimePickerAndroid"
              value={date}
              mode={'date'}
              is24Hour={false}
              onChange={onChange}
              display="spinner"
              maximumDate={new Date()}            
              locale="es-ES"
              positiveButton={{label: 'OK', textColor: 'black'}} 
              negativeButton={{label: 'Cancel', textColor: 'gray'}}              
            />          
          </>
        )}  

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Estado
        </HelperText>
        <Button           
          onPress={showModalEstado}
          mode="outlined"          
          textColor="orange"   
          style={{            
            height:40,            
            flexDirection:'row',
            alignContent:'center',
            marginStart:10,
            marginEnd:10,
            borderWidth:1,
            borderColor:'black',
            borderRadius:5,
          }}
        ><Text style={{fontSize:18,width:'80%',height:30,alignSelf:'center'}}>{nombreEstado}</Text></Button>          
              
        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          CP
        </HelperText>
         

        <View style={{flexDirection:'row',alignItems:'center',alignContent:'center'}}>

          <TextInput
            style={styles.input2}                           
            onChangeText={text=>setCp(text) }           
            value={cp}                        
            keyboardType="numeric"         
          /> 
          
          <Button 
            onPress={()=>{GetColonias(cp)}}
            buttonColor="orange" 
            style={{
              width:'40%',
              alignSelf:'center'
            }} 
            icon="card-search" 
            mode="contained">Buscar datos</Button>

        </View>

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Colonia
        </HelperText>
        <Button           
          onPress={showModalColonia}
          mode="outlined"          
          textColor="orange"   
          style={{            
            height:40,            
            flexDirection:'row',
            alignContent:'center',
            marginStart:10,
            marginEnd:10,
            borderWidth:1,
            borderColor:'black',
            borderRadius:5,
          }}
        ><Text style={{fontSize:18,width:'80%',height:30,alignSelf:'center'}}>{nombreColonia}</Text></Button>

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Calle principal
        </HelperText>
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setCalleP(text)}  
          value={calleP}     
        />  

        <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Entre calle 1
        </HelperText>
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setEntreC1(text)}  
          value={entreC1}     
        />  

      <HelperText style={{fontSize:15,color:'blue'}} type="info" visible={true}>
          Entre calle 2
        </HelperText>
        <TextInput
          style={styles.input}                           
          onChangeText={text=>setEntreC2(text)}  
          value={entreC2}     
        />  

      </ScrollView>

      

      <Portal style={{flex:1}}>
        <Modal 
          visible={visible} 
          onDismiss={hideModal}                                 
          contentContainerStyle={containerStyle}
        >                    
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={false}
            onChange={onChange}
            display="spinner"
            maximumDate={new Date()}            
            locale="es-ES"
            positiveButton={{label: 'OK', textColor: 'black'}} 
            negativeButton={{label: 'Cancel', textColor: 'gray'}}
            // style={{flex: 1}}
          />          
          
        </Modal>
      </Portal>

      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleEstado} 
          onDismiss={hideModalEstado}                                 
          contentContainerStyle={containerStyleSelect}
        >                    
          <DropDownPicker            
            style={{
              width:'100%',
              alignSelf:'center'
            }}
            dropDownContainerStyle={{              
              width:'100%',
              alignSelf:'center'            
            }}
            placeholder="Seleccione el estado"
            open={openEstado}
            value={estado}
            items={estados}            
            setOpen={setOpenEstado}
            setValue={setEstado}
            setItems={setEstados}                
            autoScroll={true}
            label={nombreEstado}

            onSelectItem={(item)=>{              
              setNombreEstado(item['label']);
            }}
                        
            
          />          
          
        </Modal>
      </Portal>

      <Portal style={{flex:1}}>
        <Modal 
          visible={visibleColonia} 
          onDismiss={hideModalColonia}                                 
          contentContainerStyle={containerStyleSelect}
        >                    
          <DropDownPicker            
            style={{
              width:'100%',
              alignSelf:'center'
            }}
            dropDownContainerStyle={{              
              width:'100%',
              alignSelf:'center'            
            }}
            placeholder="Seleccione la colonia"
            open={openColonia}
            value={colonia}
            items={colonias}            
            setOpen={setOpenColonia}
            setValue={setColonia}
            setItems={setColonias}                
            autoScroll={true}
            label={nombreColonia}

            onSelectItem={(item)=>{              
              setNombreColonia(item['label']);
            }}
                        
            
          />          
          
        </Modal>
      </Portal>

    </PaperProvider>
  );
};

export default MisDatos;

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
