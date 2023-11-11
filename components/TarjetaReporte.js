import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FontAwesome ,AntDesign } from '@expo/vector-icons'; 
import { Chip } from 'react-native-paper';
import { View } from 'react-native';


const CardReporte = ({
  id,
  titulo,
  tiempo,
  tituloLargo,
  texto,
  imagen,
  compartido

}) => (
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
      title="Problema de pavimentacion reportado" 
      subtitle="Hace 1 año"       
      left={
        props => <Avatar.Icon {...props}         
        icon="highway" 
        color='white'        
        theme={{colors:{primary:'purple'}}}          
        />
      }               
    />
    <Card.Content style={{marginBottom:5}}>

      <View style={{flexDirection:'row',marginBottom:2}}>

        <Chip style={{marginEnd:5}} onPress={() => console.log('Pressed')}>
        <FontAwesome  name="user" size={15} color="#6258B6" />  Reportado por ti
        </Chip>

        <Chip style={{marginEnd:5}} onPress={() => console.log('Pressed')}>
          <FontAwesome  name="users" size={15} color="#6258B6" />  Problema comunitario
        </Chip>

      </View>

      <Text variant="titleLarge">Falta de pavimentacion</Text>
      <Text variant="bodyMedium">Esta calle lleva mucho tiempo sin pavimentar</Text>
    </Card.Content>
    <Card.Cover style={{marginStart:5,marginEnd:5}} source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button icon='map-marker'>Ver en mapa</Button>
      <Button buttonColor='purple'><AntDesign name="like1" size={18} color="white" /> 0 Mismo problema</Button>
    </Card.Actions>
  </Card>
);

export default CardReporte;