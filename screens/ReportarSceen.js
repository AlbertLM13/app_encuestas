import React from "react";
import { View, Text, StyleSheet,TextInput ,Platform} from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Button,Checkbox ,RadioButton } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";

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

const [cobertura, setCobertura] = useState(false);
const [prioridad, setPrioridad] = useState(false);


// DATE

  return (
    <View style={{backgroundColor:'white',flex:1}}>

      <View style={{flexDirection:'column'}}>                
            
        <View style={{marginTop:10,marginStart:5,marginEnd:5,marginBottom:10}}>
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

      <View style={{alignItems:'center',marginBottom:10}}>
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


      <View style={{alignItems:'center',marginBottom:10,marginTop:10}}>
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
            width:'50%'
          }}
          mode="elevated"
          buttonColor="#BF1616"          
          textColor="white"
        >Reportar</Button>
      </View>

    </View>
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
  }
});