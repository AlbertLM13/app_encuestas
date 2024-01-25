import * as React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable,PaperProvider } from "react-native-paper";
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

const MisReportes = () => {

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

  useEffect(()=>{         
    
    setIsLoading(true);   
    
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

  function ConsultarInformacion(key){
    console.log(key);
  }

  
  return (

    <PaperProvider>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{maxWidth:'30%'}} >Fecha</DataTable.Title>
            {/* <DataTable.Title >Estatus</DataTable.Title> */}
            {/* <DataTable.Title >Tipo de problema</DataTable.Title> */}
            <DataTable.Title >Tipo de problema</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.IdProblema} onPress={()=>{ ConsultarInformacion(item.IdProblema)}}>
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
    </PaperProvider>
  );

};

export default MisReportes;

