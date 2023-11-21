import React, { createContext, useState ,useContext} from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FontAwesome ,AntDesign } from '@expo/vector-icons'; 
import { Chip } from 'react-native-paper';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL_IMAGE } from '../config';



const CardReporte = ({
  IdProblema,
  RutaArchivo,
  IdUsuarioCreo,
  FechaCreacion,
  Prioridad,
  Cobertura,
  IdEstatusActual,
  Descripcion,
  TipoProblema,
  CategoriaProblema,
  Estatus,
  IdCategoria,
  FechaReporte,
  Latitud,
  Longitud,
  cantidad,
  mismoProblema,
  showModal,
  setSelectedId

}) => {
    
  const{userInfo} =  useContext(AuthContext);    
  const  iconTitle = ["null","highway", "lightbulb","highway"];  
  const  iconColor = ["#B3E5FF","#B3E5FF", "#FFDD99","#C5B8A2","#E3E3E3","#C6F198","#E3E3E3"];  
  const iconColor2 = ["#B3E5FF","#7669E3", "#CB8B0D","#6E5F48","#666666","#769852","#9E9E9E"];  
  return (
  
  <Card 
  mode='elevated'  
  style={{
    marginStart:10,
    marginEnd:10,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'white',
  }}>    

    <Card.Title        
      title={CategoriaProblema}
      subtitle="Hace 1 año"             
      left={
        props => <Avatar.Icon {...props}         
        icon = {iconTitle[IdCategoria]}         
        color={iconColor2[IdCategoria]}
        theme={{colors:{primary:iconColor[IdCategoria]}}}          
        />
      }               
    />
    <Card.Content style={{marginBottom:5}}>

      <View style={{flexDirection:'row',marginBottom:2}}>

        {IdUsuarioCreo == userInfo.userId ? 
          <Chip style={{marginEnd:5}} onPress={() => console.log('Pressed')}>
            <FontAwesome  name="user" size={15} color="#6258B6" />  Reportado por ti
          </Chip>
        : <></>
        }

        {Cobertura == '1'?
          <Chip style={{marginEnd:5}} onPress={() => console.log('Pressed')}>
          <FontAwesome  name="users" size={15} color="#6258B6" />  Problema comunitario
          </Chip>
          : <></>
        }
                 
      </View>

      <Text variant="titleLarge">{TipoProblema}</Text>
      <Text variant="bodyMedium">{Descripcion}</Text>
    </Card.Content>
    <Card.Cover style={{marginStart:5,marginEnd:5}} source={{ uri: BASE_URL_IMAGE+RutaArchivo}} />
    <Card.Actions>
      <Button 
        icon='map-marker'
        onPress={()=>
          {
            showModal();
            setSelectedId([parseFloat(Latitud),parseFloat(Longitud)])       
          }
        }
      >Ver en mapa</Button>
      <Button 
        buttonColor='purple'        
      >
        <AntDesign name="like1" size={18} color="white" /> {mismoProblema > 1 ? mismoProblema : 0} Mismo problema</Button>
    </Card.Actions>
  </Card>
  )
      
};

export default CardReporte;