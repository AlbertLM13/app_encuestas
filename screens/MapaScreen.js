import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Mapa = () => {
  return (
    <SafeAreaView style={{backgroundColor:'green'}}>
    <View style={{flex:1}}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginTop: "20%",
        }}
      >
        Mapa
      </Text>
    </View>
    </SafeAreaView>
  );
};

export default Mapa;
