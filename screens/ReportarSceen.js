import React ,{useEffect} from "react";
import { View, Text, StyleSheet,TextInput ,Platform,Image,ScrollView,TouchableOpacity} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton ,Button ,Banner ,FAB, Portal,Modal, PaperProvider,IconButton, MD3Colors  } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";


const ReportarScreen = () => {

const [open1, setOpen1] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'}
]);

const [open2, setOpen2] = useState(false);
const [value2, setValue2] = useState(null);
const [items2, setItems2] = useState([
  {label: 'Apple2', value: 'apple'},
  {label: 'Banana2', value: 'banana'}
]);

const [open3, setOpen3] = useState(false);
const [value3, setValue3] = useState(null);
const [items3, setItems3] = useState([
  {label: 'Apple2', value: 'apple'},
  {label: 'Banana2', value: 'banana'}
]);

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
const [cobertura, setCobertura] = useState(false);
const [prioridad, setPrioridad] = useState(false);


const [image, setImage] = useState(null);
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    // aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

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
      const data = await camera.takePictureAsync(null)
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


  return (    

    
    <PaperProvider>
      <View style={{backgroundColor:'white',flex:1}}>
        <ScrollView>
          <View style={{flexDirection:'column'}}>                
                

            <View style={{marginTop:10,marginStart:5,marginEnd:5,marginBottom:10}}>

              <View style={{alignItems:'center',marginBottom:10}}>
                <Text style={{fontSize:20}}>Categoria:</Text>
              </View>

              <DropDownPicker            

                placeholder="Seleccione Categoria"
                open={open1}
                value={value}
                items={items}
                setOpen={setOpen1}
                setValue={setValue}
                setItems={setItems}
              />
            </View>

            <View style={{marginStart:5,marginEnd:5,zIndex:-1}}>

              <View style={{alignItems:'center',marginBottom:10}}>
                <Text style={{fontSize:20}}>Problema:</Text>
              </View>

              <DropDownPicker        

                placeholder="Seleccione Problema"
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
              />
            </View>

          </View>
          
          {/* DATE */}    
          
          <View
            style={{alignItems:'center',zIndex:-2,marginTop:10,marginBottom:10,marginStart:5,marginEnd:5}}        
          >
            <Text style={{fontSize:20}}>Fecha inicio:</Text>
            <Button 
              onPress={showDatepicker}
              mode="outlined"
              width="100%"
              textColor="blue"   
              style={{minWidth:'100%'}}
            >{date.toLocaleString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'})}</Button>          

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
                style={{flex: 1}}
              />          
            </>
          )}
                                        
          {/* DATE */}

          <View style={{marginStart:5,marginEnd:5,marginBottom:10,zIndex:-2}}>

            <View style={{alignItems:'center',marginBottom:10}}>
              <Text style={{fontSize:20}}>Colonia:</Text>
            </View>

            <DropDownPicker        

              placeholder="Seleccione Colonia"
              open={open3}
              value={value3}
              items={items3}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setItems3}
            />
          </View>

          <View style={{alignItems:'center',marginBottom:10,zIndex:-4}}>
            <Text style={{fontSize:20}}>Cobertura:</Text>

            <View style={{flexDirection:'row',alignItems:'center'}}>

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

          </View>


          <View style={{alignItems:'center',marginBottom:10,marginTop:10,zIndex:-4}}>
            <Text style={{fontSize:20}}>Prioridad:</Text>

            <View style={{flexDirection:'row',alignItems:'center'}}>

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

          </View>

          <View style={{alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize:20}}>Foto:</Text>
          </View>
          

          <View style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'row' ,marginBottom:10}}>
            <Button buttonColor="orange" textColor="white" style={{marginEnd:10}} mode="elevated" onPress={pickImage} >Galeria</Button>
            <Button buttonColor="orange" textColor="white" mode="elevated" onPress={showModal} >Camara</Button>
            
          </View>

         
          <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}}>
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
          </View> 
                    
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            multiline={true}
            numberOfLines={4}        
          />      

          <View 
            style={{
              alignItems:'center',          
            }}
          >
            <Button
              style={{
                marginTop:20,
                marginBottom:20,
                width:'50%'
              }}
              mode="elevated"
              buttonColor="#BF1616"          
              textColor="white"
            >Reportar</Button>
          </View>
        </ScrollView>
      </View>

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

    </PaperProvider>
  );
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
    zIndex:-10
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

