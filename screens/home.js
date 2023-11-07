import React from "react";
import { View, Text ,StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

  const navigation = useNavigation() ;

  return (
    <View style={{backgroundColor: '#edeeee',flex:1}}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Home Screen
      </Text>
      <TouchableOpacity

        onPress={()=>navigation.navigate("Stack")}

        style={{
          backgroundColor:"#bc955c",
          padding:10,
          marginTop:"20%",
          width:"50%",
          alignSelf:"center",
          borderRadius:10,
        }}
      >
        <Text
          style={{
            fontSize:15,
            textAlign:"center",
            color:"white",
          }}  
        >
          Go to Stack Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
