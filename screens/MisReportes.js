import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MisReportes = () => {
  return (
    <View style={{flex:1}}>       

        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            marginTop: "20%",
          }}
        >
          Mis reportes
        </Text>

    </View>
  );
};

export default MisReportes;
