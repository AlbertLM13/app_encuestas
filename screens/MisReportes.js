import * as React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable,PaperProvider,Portal,Modal ,Menu,Divider,Button,Drawer ,ToggleButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useContext,useEffect ,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL_IMAGE } from "../config";
import SegmentedButtons from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from 'expo-image-picker';

const MisReportes = () => {

  const [visibleDetalles, setVisibleDetalles] = useState(false);  
  const showModalDetalles = () => setVisibleDetalles(true);
  const hideModalDetalles = () => setVisibleDetalles(false);
  const containerStyle = {backgroundColor: 'white', padding: 10,marginStart:7,marginEnd:7};

  const {userInfo} =  useContext(AuthContext);  
  const [isLoading,setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [items,setItems] = React.useState([]);
  const [numberOfItemsPerPageList,setNumberItemsPerPageList] = React.useState([10,15,20]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );    

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const [item,setItem] = useState({});

  useEffect(()=>{         
    
    setIsLoading(true);   
    // AsyncStorage.removeItem('ReportesPerfil');
    AsyncStorage.getItem('ReportesPerfil').then((value) => {
      if (value) {            
        var obj = JSON.parse(value);    
        setItems( obj);                    
        setNumberItemsPerPageList([obj.length]);
        setIsLoading(false);                  
      }else{
        setIsLoading(false);                          
        GetReportes();                     
      }
    });          
          
  },[]);

  async function GetReportes(){

    setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/GetReportes`,{
          'IdProblema':null,
          'estatus':null
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
          
        console.log(res.data);
        AsyncStorage.setItem('ReportesPerfil',JSON.stringify(res.data));
        setItems(res.data);
        setNumberItemsPerPageList([items.length]);

      }).catch(e =>{
                 
      });

  }

  const [idReporte,setIdReporte] = useState(null);
  const [status, setStatus] = React.useState('checked');
  // function ConsultarInformacion(key,item){
    
  //   setIdReporte(key);
  //   setItem(item);
  //   showModalDetalles();
  //   // openMenu();
  // }

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


  async function ActualizarFoto(){

    setIsLoading(true);

    const uri =
        // Platform.OS === "android"
        //   ? imagen
        //   : 
          image.replace("file://", "");

      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();    

    formData.append("txt_1", {
      uri,
      name: `image.${ext}`,
      type,
    });

    axios.post(`${BASE_URL}/reportes/ActualizarFoto`,
      formData
    ,{headers:{      
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${userInfo.token}`       
    }}).then(res =>{                
        
        alert('Imagen Actualizada');

        setIsLoading(false);    
    }).catch(e =>{
        console.log(`Error ${e}`);      
        setIsLoading(false);
    });

  }

  async function EliminarReporte(idProblema){

    setIsLoading(true);
      axios.post(`${BASE_URL}/reportes/EliminarReporte`,{
          'IdProblema_Eliminar':idProblema
      },{headers:{
        'Authorization': `Bearer ${userInfo.token}` 
      }}).then(res =>{                
          
        console.log(res.data);        

      }).catch(e =>{
        
    });

  }

  return (    

    <PaperProvider>
   
      <ScrollView> 
      <Spinner visible={isLoading}/>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{maxWidth:'30%'}} >Fecha</DataTable.Title>
            {/* <DataTable.Title >Estatus</DataTable.Title> */}
            {/* <DataTable.Title >Tipo de problema</DataTable.Title> */}
            <DataTable.Title >Tipo de problema</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.IdProblema} 
            // onPress={()=>{ ConsultarInformacion(item.IdProblema,item)}}
            onPress={
              ()=>{
                showModalDetalles();
                setItem(item);
              }
            }
            >
              <DataTable.Cell style={{maxWidth:'10%',backgroundColor:'#C6C6C6'}}>

              {(() => {
              if (item.Estatus == 'Iniciado'){
                  return (                  
                    <Entypo name="controller-play" size={24} color="blue" />
                  )
                }else if(item.Estatus == 'En validación'){
                  return (
                    <MaterialCommunityIcons name="file-question" size={24} color="purple" />
                  )
                }else if(item.Estatus == 'Foto inválida'){
                  return (
                    <MaterialIcons name="no-photography" size={25} color="#C13F3F" />
                  )
                }else if(item.Estatus == 'Validado'){
                  return (
                    <AntDesign name="checksquare" size={24} color="green" />
                  )
                }else if(item.Estatus == 'Gestionado'){
                  return (
                    <MaterialCommunityIcons name="comment-edit" size={24} color="#46AED8" />
                  )
                }else if(item.Estatus == 'Resuelto'){
                  return (
                    <FontAwesome name="flag" size={24} color="#33B400" />
                  )
                }else if(item.Estatus == 'No Resuelto'){
                  return (
                    <FontAwesome name="window-close" size={24} color="red" />
                  )                
                }else if(item.Estatus == 'En revisión'){
                  return (
                    <FontAwesome name="warning" size={24} color="yellow" />
                  )
                }                
                return null;
              })()}
                                                    
                {/* <Entypo name="controller-play" size={24} color="black" /> */}

              </DataTable.Cell>
              <DataTable.Cell style={{maxWidth:'30%',backgroundColor:'#C6C6C6'}}>{item.FechaReporte}</DataTable.Cell>
              {/* <DataTable.Cell >{item.calories}</DataTable.Cell> 
              <DataTable.Cell >{item.fat}</DataTable.Cell>           */}
              <DataTable.Cell style={{backgroundColor:'#C6C6C6'}}>{item.TipoProblema}</DataTable.Cell>   
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length  / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${items.length }`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            // numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Registros por pagina'}
          />
        </DataTable>        

      </ScrollView>                   

      <Portal>
      <Modal 
        visible={visibleDetalles} 
        onDismiss={ ()=>{ hideModalDetalles(); setImage(null);}}
        contentContainerStyle={containerStyle}
      >
        <Text
          style={{
            textAlign:'left',
            fontSize:20,
            color:'purple',
            marginBottom:10
          }}
        >Problema de {item.CategoriaProblema} reportado.</Text>
        <Text
          style={{
            textAlign:'left',
            fontSize:18,            
            marginBottom:10
          }}
        >Fecha del reporte: {item.FechaReporte}</Text>

        <View flexDirection="row" style={{marginBottom:10}}>

        <Text
            style={{
              textAlign:'left',
              fontSize:18,            
              marginEnd:5,
              color:'black'
            }}
          >Estatus:</Text>

          <Text
            style={{
              textAlign:'left',
              fontSize:18,            
              marginEnd:10,
              color:'blue'
            }}
          >{item.Estatus}</Text>               

        </View>
        
        <View alignItems="center" style={{marginBottom:10}}>
          <Image
            source={{ uri: image != null ? image : BASE_URL_IMAGE+item.RutaArchivo}} width={300} height={200} 
          />
        </View>

        <Text
          style={{
            textAlign:'left',
            fontSize:18,
            color:'blue',
            marginBottom:10
          }}
        >{item.TipoProblema}</Text>

        <Text
          style={{
            textAlign:'left',
            fontSize:18,            
          }}
        >{item.Descripcion}</Text>

        <View style={{flexDirection:'row',alignSelf:'center',marginTop:8,marginBottom:8}}>

          <Button 
            style={{marginEnd:5}}
            buttonColor="purple" icon="camera" mode="contained" onPress={pickImage}>
            Cambiar foto
          </Button>
          <Button 
            buttonColor="red" icon="trash-can"  mode="contained" onPress={() => {EliminarReporte(item.IdProblema)}}>
            Eliminar reporte
          </Button>

        </View>

        <View>
          <Button 
            disabled={image != null? false:true}
            style={{marginEnd:5}}
            buttonColor="green" icon="content-save" mode="contained" onPress={ActualizarFoto}>
            Guardar cambios
          </Button>
        </View>
      
      </Modal>
    </Portal>


    </PaperProvider>
  );

};

export default MisReportes;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    width: '100%',
    backgroundColor: 'green',
  },
  mainMenuAnchor: {
    width: 24,
    height: 5,
    backgroundColor: 'red',
  },
  menuWrapper: {
    alignSelf: 'flex-end',
    margin: 8,
  }
});