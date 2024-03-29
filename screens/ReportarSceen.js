import React ,{useEffect,useContext} from "react";
import { View, Text, StyleSheet,TextInput ,Platform,Image,ScrollView,FlatList,Alert} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton ,Button ,HelperText ,FAB, Portal,Modal, PaperProvider,IconButton, MD3Colors  } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import MapView, {Callout, Marker,Polygon } from 'react-native-maps';
import * as Location from 'expo-get-location'
import turf,{point,polygon,booleanPointInPolygon} from '@turf/turf';
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportarScreen = () => {


  const navigation  =useNavigation();
  const createTwoButtonAlert = () =>
  Alert.alert('Exito', 'Problema enviado para su analisis', [
    {
      // text: 'Cancel',
      // onPress: () => console.log('Cancel Pressed'),
      // style: 'cancel',
    },
    {text: 'OK', onPress:() => navigation.navigate('HomeScreen')},
  ]);

const[descripcion,setDescripcion] = useState(null);

// Carga datos
const{userInfo} =  useContext(AuthContext);  
const [isLoading,setIsLoading] = useState(false);

useEffect(()=>{

  setIsLoading(true);
  AsyncStorage.getItem('coordenadas').then((value) => {
    if (value) {            
        var obj = JSON.parse(value);    
        seCoordenates(obj);
        convertPolygon(obj);                
        setIsLoading(false);                  
    }else{
      setIsLoading(false);                  
      GetCoordenates();      
    }
  });

  GetColoniasCategorias();  
  GetLocation();
},[]);

async function GetColoniasCategorias(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetCategorias`,{
       
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);  
      setItems3(res.data['coloniasFinal']);
      setItems(res.data['categoriasFinal']);            
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
} 

async function GetProblema(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetProblemas`,{
       'IdCategoria':value
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);  
      setItems2(res.data);
      // console.log(res.data);
               
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
} 

async function GetCoordenates(){
  setIsLoading(true);
  axios.post(`${BASE_URL}/reportes/GetCoordenates`,{
        
  },{headers:{
    'Authorization': `Bearer ${userInfo.token}` 
  }}).then(res =>{                
      setIsLoading(false);   
      seCoordenates(res.data);                
      convertPolygon(res.data);
      AsyncStorage.setItem('coordenadas',JSON.stringify(res.data)); 
  }).catch(e =>{
      console.log(`Error ${e}`);
      setIsLoading(false);
  });
}

function convertPolygon(data){

  var array = [];

  data.forEach(element => {
    array.push([element.latitude,element.longitude]);
  });

  array.push(data[0].latitude,data[0].longitude)

  setPolygonCoordenates(array);
}

const[dentroZona,setDentroZona] = useState(false);
const[coordenates,seCoordenates] = useState([]);
const[polygonCoordenates,setPolygonCoordenates] = useState([]);
const[currentLocation, setCurrentLocation] = useState(null);
const[initialRegion, setInitialRegion] = useState(null);

const[changeLocation,setChangeLocation] = useState(false);

const GetLocation = async () => {

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  if(!changeLocation){
    setCurrentLocation(location.coords);  
  }
  
  setInitialRegion({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

}

// 

const [open1, setOpen1] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([]);

const [open2, setOpen2] = useState(false);
const [value2, setValue2] = useState(null);
const [items2, setItems2] = useState([]);

const [open3, setOpen3] = useState(false);
const [value3, setValue3] = useState(null);
const [items3, setItems3] = useState([]);

// DATE

const [date, setDate] = useState(new Date());
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  Platform.OS == 'android' ? setShow(false) : null;
  setDate(currentDate);
};

const showMode = (currentMode) => {
  if(Platform.OS == 'ios'){
    show ? setShow(false) : setShow(true);
  }else{
    setShow(true);
  }    
};

const showDatepicker = () => {
  showMode('date');
};

// DATE
const [cobertura, setCobertura] = useState(null);
const [prioridad, setPrioridad] = useState(null);


const [image, setImage] = useState(null);
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    // aspect: [4, 3],
    quality: 1,
  });  
  
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

// CAMARA

const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [camera, setCamera] = useState(null);
// const [image, setImage] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);
useEffect(() => {
  (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();    
    setHasCameraPermission(cameraStatus.status === 'granted');
  })();
}, []);

const takePicture = async () => {
  if(camera){
      const data = await camera.takePictureAsync({
        quality:0.5
      })
      setImage(data.uri);
      hideModal();
  }
}
if (hasCameraPermission === false) {
  return <Text>No access to camera</Text>;
}

// CAMARA

// MODAL
const [visible, setVisible] = React.useState(false);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const containerStyle = {backgroundColor: 'white', padding: 150};
// MODAL


  // MODAL MAPA
  const [visibleMapa, setVisibleMapa] = React.useState(false);
  const showModalMapa = () => setVisibleMapa(true);
  const hideModalMapa = () => setVisibleMapa(false); 
  const containerStyleMapa = {backgroundColor: 'white', padding: 15,height:'130%'};

  const [origin,SetOrigin] = useState([]);
  
// MODAL

DropDownPicker.setLanguage("ES");

const [nextPage,setNextPage] = useState(false);

// VAlidacion

const[saveButtonPressed,setSaveButtonPressed] = useState(false);

// const hasErrors = () => {
//   return value3 === null;
// };

// Validacion

  return (    

    
    
    <PaperProvider>
    
    <Spinner visible={isLoading}/>
    {!nextPage ? 
      
    <View style={{backgroundColor:'white',flex:1}}>

      <View style={{flexDirection:'column',alignItems:'center'}}>                                       

          <View style={{alignItems:'center',marginTop:10,marginBottom:0,zIndex:2}}>
            <Text style={{fontSize:20}}>Colonia:</Text>
          </View>

          <DropDownPicker            
            style={{
              width:'90%',
              alignSelf:'center'
            }}
            dropDownContainerStyle={{              
              width:'90%',
              alignSelf:'center'            
            }}
            placeholder="Seleccione la colonia"
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            autoScroll={true}
            searchable={true}
            maxHeight={350}
            zIndex={1999}
          />             
          <HelperText style={{fontSize:15}} type="error" visible={value3 === null && saveButtonPressed}>
            Seleccione la colonia
          </HelperText>   

          <View style={{alignItems:'center',marginTop:0,marginBottom:0,zIndex:-1}}>
            <Text style={{fontSize:20}}>Categoria:</Text>
          </View>

          <DropDownPicker            
            style={{
              width:'90%',
              alignSelf:'center'
            }}
            dropDownContainerStyle={{              
              width:'90%',
              alignSelf:'center'            
            }}
            placeholder="Seleccione Categoria"
            open={open1}
            value={value}
            items={items}
            setOpen={setOpen1}
            setValue={setValue}
            setItems={setItems}
            autoScroll={true}
            zIndex={999}
            onChangeValue={GetProblema}
            

          />

          <HelperText style={{fontSize:15}} type="error" visible={value === null && saveButtonPressed}>
            Seleccione la categoria
          </HelperText> 

          <View style={{alignItems:'center',marginTop:0,marginBottom:10}}>
            <Text style={{fontSize:20}}>Problema:</Text>
          </View>

          <DropDownPicker        
            style={{
              width:'90%',
              alignSelf:'center'
            }}
            dropDownContainerStyle={{              
              width:'90%',
              alignSelf:'center'            
            }}
            
            placeholder="Seleccione Problema"
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            autoScroll={true}
            zIndex={888}
          />     
          <HelperText style={{fontSize:15}} type="error" visible={value2 === null && saveButtonPressed}>
            Seleccione el problema
          </HelperText>      

      </View>

      {/* DATE */}    
      
      <ScrollView style={{zIndex:-20}}>
      
        <View
          style={{alignItems:'center',zIndex:-2,marginTop:10,marginBottom:0,marginStart:20,marginEnd:20}}        
        >
          <Text style={{fontSize:20,marginBottom:5}}>Fecha inicio:</Text>
          <Button 
            onPress={showDatepicker}
            mode="outlined"          
            textColor="blue"   
            style={{            
              height:50,        
              width:'70%',                           
              flexDirection:'row',
              alignContent:'center'

            }}
          ><Text style={{fontSize:18,width:'80%',height:30,alignSelf:'center'}}>{date.toLocaleString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'})}</Text></Button>          

        </View>    
        
        {show && (
          <>
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
          </>
        )}
                                      
        {/* DATE */}

        <View 
          style={{
            alignItems:'center',
            marginTop:10,
            marginBottom:0,      
            zIndex:-2    
          }}
        >
          <Text style={{fontSize:20}}>Cobertura:</Text>

          <View 
            style={{
              flexDirection:'row',
              alignItems:'center',            
              padding:10,            
              borderWidth:1,
              borderColor:'black',
              borderRadius:5,
              paddingHorizontal:14,
              height:60,            

            }}>

            <View style={{flexDirection:'row',alignItems:'center',marginEnd:10}}>
              <Text style={{fontSize:20,color:'blue'}} onPress={() => setCobertura('0')}>Individual</Text>
              <RadioButton
                value="0"          
                status={ cobertura === '0' ? 'checked' : 'unchecked' }
                onPress={() => setCobertura('0')}
              />
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{fontSize:20,color:'blue'}} onPress={() => setCobertura('1')}>Comunitario</Text>
              <RadioButton
                value="1"
                status={ cobertura === '1' ? 'checked' : 'unchecked' }
                onPress={() => setCobertura('1')}
              />
            </View>

            

          </View>  
          <HelperText style={{fontSize:15}} type="error" visible={cobertura === null && saveButtonPressed}>
            Seleccione la cobertura
          </HelperText>

        </View>
        
        <View style={{alignItems:'center',marginBottom:0,marginTop:10}}>
          <Text style={{fontSize:20}}>Prioridad:</Text>

          <View 
            style={{
              flexDirection:'row',
              alignItems:'center',            
              padding:10,            
              borderWidth:1,
              borderColor:'black',
              borderRadius:5,
              paddingHorizontal:14,
              height:60, 
            }}>

            <View style={{flexDirection:'row',alignItems:'center',marginEnd:10}}>
              <Text style={{fontSize:20,color:'blue'}} onPress={() => setPrioridad('1')}>Alta</Text>
              <RadioButton
                value="1"          
                status={ prioridad=== '1' ? 'checked' : 'unchecked' }
                onPress={() => setCobertura('1')}
              />
            </View>

            <View style={{flexDirection:'row',alignItems:'center',marginEnd:10}}>
              <Text style={{fontSize:20,color:'blue'}} onPress={() => setPrioridad('2')}>Media</Text>
              <RadioButton
                value="2"
                status={ prioridad === '2' ? 'checked' : 'unchecked' }
                onPress={() => setCobertura('2')}
              />
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{fontSize:20,color:'blue'}} onPress={() => setPrioridad('3')}>Baja</Text>
              <RadioButton
                value="3"
                status={ prioridad === '3' ? 'checked' : 'unchecked' }
                onPress={() => setCobertura('3')}
              />
            </View>
            
          </View>  

          <HelperText style={{fontSize:15}} type="error" visible={prioridad === null && saveButtonPressed}>
            Seleccione la prioridad
          </HelperText>

        </View>

        <View style={{alignItems:'flex-end',marginTop:10}}>
          <IconButton
            icon="arrow-right"
            iconColor={'blue'}
            size={40}
            onPress={() => setNextPage(true)}
          />
        </View>

      </ScrollView>

      {/*  */}



    </View>

    :
      <View style={{backgroundColor:'white',flex:1}}>
       
        <ScrollView style={{zIndex:-20}}>                                                

          

          <View style={{alignItems:'center',marginBottom:10,marginTop:20}}>
            <Text style={{fontSize:20}}>Foto:</Text>
          </View>
          
          <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' ,marginBottom:10}}>
            <Button icon="image" buttonColor="orange" textColor="white" style={{marginEnd:10}} mode="elevated" onPress={pickImage} >Galeria</Button>
            <Button icon="camera" buttonColor="orange" textColor="white" mode="elevated" onPress={showModal} >Camara</Button>            
          </View>
         
          <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
          </View> 
          
          <View style={{alignItems:'center',marginBottom:0,marginTop:0}}>
            <Text style={{fontSize:20}}>Ubicación:</Text>
          </View>

          <View 
            style={{
              alignSelf:'center',
              flexDirection:'row',

            }}        >
            
            <Button
              style={{
                marginTop:20,
                marginBottom:0,
                width:'50%',
                
              }}
              icon="map"
              mode="elevated"
              buttonColor="green"          
              textColor="white"
              onPress={showModalMapa}
            >Seleccionar ubicación</Button>
          </View>
                    
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            multiline={true}
            numberOfLines={4} 
            onChangeText={text=>setDescripcion(text)}       
          />      
          <HelperText style={{fontSize:15}} type="error" visible={descripcion === null && saveButtonPressed}>
            Seleccione la descripción
          </HelperText>

          <View 
            style={{
              alignSelf:'center',
              flexDirection:'row',

            }}        
          >
            
            <Button
              style={{
                marginTop:5,
                marginBottom:0,
                width:'50%',
                
              }}
              mode="elevated"
              buttonColor="#BF1616"          
              textColor="white"
              onPress={
                ()=>{
                  test();
                  guardarProblema(
                      value3  // Colonia
                      ,value  // Categoria
                      ,value2 // Problema  
                      ,date.toLocaleString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'}) // fecha   
                      ,cobertura
                      ,prioridad
                      ,image
                      ,currentLocation.latitude
                      ,currentLocation.longitude
                      ,descripcion
                    );            
                }
              }

            >Reportar</Button>
          </View>

          <View style={{alignItems:'flex-start',marginTop:0}}>
            <IconButton
              icon="arrow-left"
              iconColor={'blue'}
              size={40}
              onPress={() => setNextPage(false)}
            />
          </View>

        </ScrollView>
      </View>
    }

    {/* CAMARA */}

    <Portal style={{flex:1}}>
      <Modal 
        visible={visible} 
        onDismiss={hideModal} 
        style={{                                 
          maxHeight:'100%',         
        }}                           
        contentContainerStyle={containerStyle}
      >            
        <Camera 
          ref={ref => setCamera(ref)}            
          type={type}                              
          style={StyleSheet.absoluteFillObject}    
                                  
        />
        
        <View style={{flexDirection:'row'}}>
          <IconButton
            style={{
              bottom:-200,
              marginEnd:20,
              marginStart:-10
            }}
            mode="contained"
            icon="record-circle-outline"
            iconColor='black'
            size={30}
            onPress={() => takePicture()}
          />
          <IconButton
            style={{
              bottom:-200
            }}
            mode="contained"
            icon="camera-flip"
            iconColor='gray'
            size={30}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>

        <IconButton
          style={{
            bottom:200,
            start:200,
            marginEnd:20,
            marginStart:-10
          }}
          mode="contained"
          icon="close"
          iconColor='red'
          size={30}
          onPress={hideModal}
        />

      </Modal>
    </Portal>

    {/* CAMARA */}

    {/* MAPA */}

    <Portal>
      <Modal 
        visible={visibleMapa} 
        onDismiss={hideModalMapa} 
        style={{
          marginStart:10,
          marginEnd:10,
          marginTop:200,
          marginBottom:100
        }} 
        contentContainerStyle={containerStyleMapa}
      > 

        <Text style={{alignSelf:'center',fontSize:18,color:'blue'}}>Mantenga presionado el marcador y arrastre dentro de la zona marcada.</Text>

        {currentLocation != null ?
        <MapView 
          
          style={{                
            width:'100%',
            height:'98%'
          }}          

          // minZoomLevel={15}
          showsUserLocation={true}
          showsMyLocationButton={true}  
                      
          initialRegion={{
            latitude : currentLocation != null ? currentLocation.latitude : 0,
            longitude: currentLocation != null ? currentLocation.longitude : 0,
            latitudeDelta:0.09,
            longitudeDelta:0.04
          }}      

        >        

        {currentLocation && (
          <Marker
            draggable
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}                
            onDragEnd={  (direction)=>{
                  setCurrentLocation(direction.nativeEvent.coordinate);
                  setChangeLocation(true);
                  console.log(currentLocation);
                }
              }             
          >

          <Image             
            source={require('../assets/mapas/marker-icon-2x-blue.png')}             
            style={{height: 70, width:44}} 
          /> 

          </Marker>
        )}                  

        {coordenates.length > 0 ? <Polygon
        coordinates={
          coordenates
        }
        strokeWidth={1}        // The width of the outline of the shape
        strokeColor='#3FA72E'  // Color of the outline
        fillColor='rgba(135,231,119,0.5)'  // Shape color
        
      />:<></>}     

        </MapView>        
        :
        <Spinner visible={coordenates != null}/>                   
        }
      </Modal>
    </Portal>

    {/* MAPA */}

    </PaperProvider>
    
  );

  function test(){    
    var pt = point([currentLocation.latitude, currentLocation.longitude]);
    var po = polygon([polygonCoordenates])
    setDentroZona(booleanPointInPolygon(pt, po));    
  }

  async function guardarProblema(
    colonia,
    categoria,
    problema,
    fecha,
    cobertura,
    prioridad,
    imagen,
    latitud,
    longitud,
    descripcion
  ){
    
    setSaveButtonPressed(true);

    if(colonia != null && categoria != null && problema != null && cobertura != null && prioridad != null && imagen != null && latitud != null && longitud != null && descripcion != null && descripcion != ''){
    
  //  IMAGEN

    if (!imagen) alert("Seleccione una imagen");
    const canUpload = await checkFileSize(imagen);

    if (!canUpload) {
      alert("Seleccione una imagen menor a  3MB");
      setIsLoading(false);
      setImage(undefined);
      return;
    }

    if(!dentroZona){
      alert("La ubicación esta fuera de la zona marcada.");
      setIsLoading(false);
      return;
    };

    const uri =
        // Platform.OS === "android"
        //   ? imagen
        //   : 
          imagen.replace("file://", "");

      const filename = imagen.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();    

      setIsLoading(true);

      formData.append("image", {
        uri,
        name: `image.${ext}`,
        type,
      });

      formData.append('colonia' ,colonia);
      formData.append('categoria' ,categoria);
      formData.append('problema' ,problema);
      formData.append('fecha' ,fecha);
      formData.append('cobertura' ,cobertura);
      formData.append('prioridad' ,prioridad);
      formData.append('latitud' ,latitud);
      formData.append('longitud' ,longitud);
      formData.append('descripcion' ,descripcion);


    // IMAGEN


      axios.post(`${BASE_URL}/reportes/GuardarProblema`,
        formData
      ,{headers:{      
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${userInfo.token}`       
      }}).then(res =>{                
          
          console.log(res.data);
          createTwoButtonAlert();        

          setIsLoading(false);    
      }).catch(e =>{
          console.log(`Error ${e}`);      
          setIsLoading(false);
      });

    }else{
      return alert("Hay campos sin llenar.");
    }

  }
  
  
};




const checkFileSize = async (
  fileURI,
  maxSize = 3
) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  if (!fileInfo.size) return false;
  const sizeInMb = fileInfo.size / 1024 / 1024;
  return sizeInMb < maxSize;
};

export default ReportarScreen;


const styles = StyleSheet.create({ 
  input:{
    marginBottom:12,
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    paddingHorizontal:14,
    height:40,
    marginStart:5,
    marginEnd:5,
    marginTop:10,
    height:100,
    textAlignVertical: 'top',
    
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    
  },
  // fixedRatio:{
  //     flex: 1,
  //     aspectRatio: 1      
  // }
  
});

